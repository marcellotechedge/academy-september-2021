import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axiosConfiguration';
import { Country } from "../reducers/countryReducer";
import { endLayoutLoading, startLayoutLoading } from "./layoutActions";

export const fetchCountriesList = createAsyncThunk<
    Country[],
    void
>(
    'country/fetchCountriesList',
    async (_, thunkApi) => {
        thunkApi.dispatch(startLayoutLoading());
    
        try {
            const response = await axios.get<Country[]>(`/countries`)
        
            thunkApi.dispatch(endLayoutLoading());
            return response.data;
        } catch(error) {
            thunkApi.dispatch(endLayoutLoading());
            throw error;
        }
    }
)