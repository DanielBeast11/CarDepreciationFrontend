import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncThunkConfig} from "modules/types"
import {api} from "modules/api.ts";
import {Car, Cars} from "src/api/Api.ts";

type T_CarsSlice = {
    car_name: string
    car: Car | null;
    cars: Cars[]
}

const initialState:T_CarsSlice = {
    car_name: "",
    car: null,
    cars: []
}

export const fetchCars = createAsyncThunk<Cars[], void, AsyncThunkConfig>(
    "fetch_cars",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.cars.carsList({
            car_name: state.cars.car_name
        })

        return response.data
    }
)

export const fetchCar = createAsyncThunk<Car, string, AsyncThunkConfig>(
    "fetch_car",
    async function(id) {
        const response = await api.cars.carsRead(id)
        return response.data
    }
)


export const addCarToDepreciation = createAsyncThunk<void, number, AsyncThunkConfig>(
    "cars/add_car_to_depreciation",
    async function(car_id) {
        await api.cars.carsAddToDepreciationCreate(car_id.toString())
    }
)

const carsSlice = createSlice({
    name: 'cars',
    initialState: initialState,
    reducers: {
        updateCarName: (state, action: PayloadAction<string>) => {
            state.car_name = action.payload
        },
        removeSelectedCar: (state) => {
            state.car = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCars.fulfilled, (state, action: PayloadAction<Cars[]>) => {
            state.cars = action.payload
        });
        builder.addCase(fetchCar.fulfilled, (state, action: PayloadAction<Car>) => {
            state.car = action.payload
        });
    }
})

export const { updateCarName, removeSelectedCar} = carsSlice.actions;

export default carsSlice.reducer
