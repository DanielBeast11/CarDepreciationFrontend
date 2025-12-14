import {AppDispatch, RootState} from "store/store.ts";

export interface AsyncThunkConfig {
    state: RootState;
    dispatch: AppDispatch;
}

export type T_DepreciationsFilters = {
    date_formation_start: string
    date_formation_end: string
    status: number
}

export type T_CartDataResponse = {
    cars_count: number,
    draft_depreciation: number
}

export type T_CarUpdateValue = {
    car_id: number,
    mileage: number
}

export enum E_DepreciationStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}
