import {AppDispatch, RootState} from "store/store.ts";
import {Car} from "src/api/Api.ts";

export interface AsyncThunkConfig {
    state: RootState;
    dispatch: AppDispatch;
}

export type T_DepreciationsFilters = {
    date_formation_start: string
    date_formation_end: string
    status: number
    owner: string
}

export type T_CartDataResponse = {
    cars_count: number,
    draft_depreciation: number
}

export type T_CarMMUpdate = {
    car_id: number,
    mileage: number
}

export type T_CarUpdate = {
    car_id: number,
    data: Partial<Car>
}

export type T_CarUpdateImage = {
    car_id: number,
    data: FormData
}

export type T_CarCreate = {
    name: string;
    description: string;
    vin: number;
    image?: File | null;
}

export enum E_DepreciationStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}
