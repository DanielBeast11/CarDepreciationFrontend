import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DEFAULT_DATE_FORMATION_END, DEFAULT_DATE_FORMATION_START} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig, T_CartDataResponse, T_CarUpdateValue} from "modules/types"
import {Depreciation, Depreciations, CarItem} from "src/api/Api.ts";
import {T_DepreciationsFilters} from "modules/types.ts";

type T_DepreciationsSlice = {
    draft_depreciation_id: number,
    cars_count: number ,
    depreciation: Depreciation | null,
    depreciations: Depreciations[],
    filters: T_DepreciationsFilters
}

const initialState:T_DepreciationsSlice = {
    draft_depreciation_id: 0,
    cars_count: 0,
    depreciation: null,
    depreciations: [],
    filters: {
        status: 0,
        date_formation_start: DEFAULT_DATE_FORMATION_START,
        date_formation_end: DEFAULT_DATE_FORMATION_END
    }
}

export const fetchCartData = createAsyncThunk<T_CartDataResponse, void, AsyncThunkConfig>(
    "depreciations/cart",
    async function() {
        const response = await api.depreciations.depreciationsCartList()
        return response.data
    }
)

export const fetchDepreciation = createAsyncThunk<Depreciation, string, AsyncThunkConfig>(
    "depreciations/depreciation",
    async function(depreciation_id) {
        const response = await api.depreciations.depreciationsRead(depreciation_id)
        return response.data
    }
)

export const fetchDepreciations = createAsyncThunk<Depreciations[], void, AsyncThunkConfig>(
    "depreciations/depreciations",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.depreciations.depreciationsList({
            status: state.depreciations.filters.status,
            date_formation_start: state.depreciations.filters.date_formation_start,
            date_formation_end: state.depreciations.filters.date_formation_end
        })

        return response.data
    }
)

export const removeCarFromDraftDepreciation = createAsyncThunk<CarItem[] | null, number, AsyncThunkConfig>(
    "depreciations/remove_car",
    async function(car_id, thunkAPI) {
        const state = thunkAPI.getState()
        if (state.depreciations.depreciation) {
            const response = await api.depreciations.depreciationsDeleteCarDelete(state.depreciations.depreciation.id.toString(), car_id.toString())
            return response.data
        }

        return null
    }
)

export const deleteDraftDepreciation = createAsyncThunk<void, void, AsyncThunkConfig>(
    "depreciations/delete_draft_depreciation",
    async function(_, {getState}) {
        const state = getState()
        if (state.depreciations.depreciation) {
            await api.depreciations.depreciationsDeleteDelete(state.depreciations.depreciation.id.toString())
        }
    }
)

export const sendDraftDepreciation = createAsyncThunk<void, void, AsyncThunkConfig>(
    "depreciations/send_draft_depreciation",
    async function(_, {getState}) {
        const state = getState()
        if (state.depreciations.depreciation) {
            await api.depreciations.depreciationsUpdateStatusUserUpdate(state.depreciations.depreciation.id.toString())
        }
    }
)

export const updateDepreciation = createAsyncThunk<void, Partial<Depreciation>, AsyncThunkConfig>(
    "depreciations/update_depreciation",
    async function(data, {getState}) {
        const state = getState()
        if (state.depreciations.depreciation) {
            await api.depreciations.depreciationsUpdateUpdate(state.depreciations.depreciation.id.toString(), data as Depreciation)
        }
    }
)

export const updateCarValue = createAsyncThunk<void, T_CarUpdateValue, AsyncThunkConfig>(
    "depreciations/update_mm_value",
    async function({car_id, mileage},thunkAPI) {
        const state = thunkAPI.getState()
        if (state.depreciations.depreciation) {
            await api.depreciations.depreciationsUpdateCarUpdate(state.depreciations.depreciation.id.toString(), car_id.toString(), {mileage})
        }
    }
)

const depreciationsSlice = createSlice({
    name: 'depreciations',
    initialState: initialState,
    reducers: {
        removeDepreciation: (state) => {
            state.depreciation = null
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartData.fulfilled, (state, action: PayloadAction<T_CartDataResponse>) => {
            state.draft_depreciation_id = action.payload.draft_depreciation
            state.cars_count = action.payload.cars_count
        });
        builder.addCase(fetchDepreciation.fulfilled, (state, action: PayloadAction<Depreciation>) => {
            state.depreciation = action.payload
        });
        builder.addCase(fetchDepreciations.fulfilled, (state, action: PayloadAction<Depreciation[]>) => {
            state.depreciations = action.payload
        });
        builder.addCase(removeCarFromDraftDepreciation.rejected, (state) => {
            state.depreciation = null
        });
        builder.addCase(removeCarFromDraftDepreciation.fulfilled, (state, action: PayloadAction<CarItem[] | null>) => {
            if (state.depreciation && action.payload) {
                state.depreciation.cars = action.payload
            }
        });
        builder.addCase(sendDraftDepreciation.fulfilled, (state:T_DepreciationsSlice) => {
            state.depreciation = null
        });
    }
})

export const { removeDepreciation, updateFilters } = depreciationsSlice.actions;

export default depreciationsSlice.reducer
