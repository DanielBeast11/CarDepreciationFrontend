import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncThunkConfig, T_CarCreate, T_CarUpdate, T_CarUpdateImage} from "modules/types"
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

export const deleteCar = createAsyncThunk<Cars[], string, AsyncThunkConfig>(
    "delete_car",
    async function(car_id) {
        const response = await api.cars.carsDeleteDelete(car_id)
        return response.data
    }
)

export const updateCar = createAsyncThunk<void, T_CarUpdate, AsyncThunkConfig>(
    "update_car",
    async function({car_id, data}) {
        await api.cars.carsUpdateUpdate(car_id.toString(), data as Car)
    }
)

export const updateCarImage = createAsyncThunk<void, T_CarUpdateImage, AsyncThunkConfig>(
    "update_car_image",
    async function({car_id, data}) {
        await api.cars.carsUpdateImageCreate(car_id.toString(), data as {image?: File})
    }
)

export const createCar = createAsyncThunk<void, T_CarCreate, AsyncThunkConfig>(
    "update_car",
    async function(data) {
        await api.cars.carsCreateCreate(data)
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
        builder.addCase(deleteCar.fulfilled, (state:T_CarsSlice, action: PayloadAction<Cars[]>) => {
            state.cars = action.payload
        });
    }
})

export const { updateCarName, removeSelectedCar} = carsSlice.actions;

export default carsSlice.reducer
