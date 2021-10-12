import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axiosConfiguration';
import { endLayoutLoading, startLayoutLoading } from "./layoutActions";

export const fetchCountriesList = createAsyncThunk<
    string[],
    void
>(
    'country/fetchCountriesList',
    async (_, thunkApi) => {
        thunkApi.dispatch(startLayoutLoading());
    
        try {
            const response = await axios.get<string[]>(`/country`)
        
            thunkApi.dispatch(endLayoutLoading());
            return response.data;
        } catch(error) {
            thunkApi.dispatch(endLayoutLoading());
            throw error;
        }
    }
)