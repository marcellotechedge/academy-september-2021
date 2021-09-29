import { createReducer } from '@reduxjs/toolkit'
import { fetchCovidData, setCovidStatus } from '../actions/covidActions'
import { APIStatus } from '../axiosConfiguration';

export type CovidData = {
    countryCode: string,
    yearWeek: number,
    casesWeekly: number,
    deathsWeekly: number,
    average: number
}

export type SummaryData = {
    country: string,
    countryCode: string,
    continent: string,
    totalCase: string,
    totalDeaths: string
}

export type CovidState = {
    status: APIStatus,
    error: boolean,
    data: CovidData[],
    summary: SummaryData[]
}

const initialState: CovidState = {
    status: APIStatus.IDLE,
    error: false,
    data: [],
    summary: []
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(setCovidStatus, (state, action) => {
            state.status = action.payload;
        })
        .addCase(fetchCovidData.pending, (state) => {
            state.status = APIStatus.PENDING;
        })
        .addCase(fetchCovidData.rejected, (state) => {
            state.status = APIStatus.IDLE;
            state.data = [];
            state.summary = [];
            state.error = true;
        })
        .addCase(fetchCovidData.fulfilled, (state, action) => {
            state.status = APIStatus.READY;
            state.data = action.payload.data;
            state.summary = action.payload.summary;
            state.error = false;
        })
});
