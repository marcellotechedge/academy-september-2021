import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { APIStatus } from '../axiosConfiguration';
import { CaseDistribution } from "../reducers/covidReducer";
import { endLayoutLoading, startLayoutLoading } from "./layoutActions";

export const setBackofficeStatus = createAction<APIStatus>('backoffice/setStatus');

export const postNewCases = createAsyncThunk<
    CaseDistribution, 
    { continent: string, country: string, weeklyCases: number, weeklyDeaths: number, notificationRate: number }
>(
    'backoffice/postNewCases',
    async (args, thunkApi) => {
        thunkApi.dispatch(startLayoutLoading());

        try {
            const response = await axios.post<CaseDistribution>(`/case`, args);
            thunkApi.dispatch(endLayoutLoading());
            return response.data;
        } catch (error) {
            thunkApi.dispatch(endLayoutLoading());
            throw error;
        }
    }
)
