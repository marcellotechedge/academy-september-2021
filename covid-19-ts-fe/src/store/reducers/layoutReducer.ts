import { createReducer } from '@reduxjs/toolkit'
import { endLayoutLoading, setLayoutLoadingCounter, startLayoutLoading } from '../actions/layoutActions';

export type LayoutState = {
    loadingCounter: number
};

const initialState: LayoutState = {
    loadingCounter: 0
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(setLayoutLoadingCounter, (state, action) => {
            state.loadingCounter = action.payload;
        })
        .addCase(startLayoutLoading, (state) => {
            state.loadingCounter++;
        })
        .addCase(endLayoutLoading, (state, action) => {
            state.loadingCounter--;
        })
});