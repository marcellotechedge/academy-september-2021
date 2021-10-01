import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axiosConfiguration';
import { APIStatus } from "../axiosConfiguration";
import { CovidState } from "../reducers/covidReducer";
import { endLayoutLoading, startLayoutLoading } from "./layoutActions";

export const setCovidStatus = createAction<APIStatus>('covid/setStatus');

export const fetchCovidData = createAsyncThunk<
    { data: CovidState["data"], summary: CovidState["summary"] }, 
    { dateFrom?: string, dateTo?: string, country?: string }
>(
  'covid/fetchCovidData',
  async ({ dateFrom, dateTo, country}, thunkApi) => {
    thunkApi.dispatch(startLayoutLoading());
  
    try {
        let params = new URLSearchParams();
        if ( dateFrom )
          params.append('from', dateFrom);

        if ( dateTo )
          params.append('to', dateTo);

        if ( country )
            params.append('country', country);

        const responseData = await axios.get<CovidState["data"]>(`/case?${params.toString()}`)
        const responseSummary = await axios.get<CovidState["summary"]>(`/case-summary?${params.toString()}`)

        thunkApi.dispatch(endLayoutLoading());
        return { 
          data: responseData.data, 
          summary: responseSummary.data 
        };
    } catch(error) {
      thunkApi.dispatch(endLayoutLoading());
      throw error;
    }
  }
)