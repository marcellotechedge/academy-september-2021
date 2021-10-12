import { createReducer } from '@reduxjs/toolkit'
import { fetchCountriesList } from '../actions/countryActions';

export type CountryState = {
    error: boolean,
    loaded: boolean,
    countries: string[]
}

const initialState: CountryState = {
  error: false,
  loaded: false,
  countries: [],
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(fetchCountriesList.rejected, (state) => {
            state.countries = [];
            state.loaded = false;
            state.error = true;
        })
        .addCase(fetchCountriesList.fulfilled, (state, action) => {
            state.countries = action.payload;
            state.loaded = true;
            state.error = false;
        })
})