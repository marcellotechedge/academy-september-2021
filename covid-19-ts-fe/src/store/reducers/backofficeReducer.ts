import { createReducer } from '@reduxjs/toolkit'
import { postNewCases, setBackofficeStatus } from '../actions/backofficeActions'
import { APIStatus } from '../axiosConfiguration'

export type BackOfficeState = {
    status: APIStatus,
    error: boolean
}

const initialState: BackOfficeState = {
    status: APIStatus.IDLE,
    error: false
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(postNewCases.pending, (state) => {
            state.status = APIStatus.PENDING;
        })
        .addCase(postNewCases.rejected, (state) => {
            state.status = APIStatus.IDLE;
            state.error = true;
        })
        .addCase(postNewCases.fulfilled, (state, action) => {
            state.status = APIStatus.READY;
            state.error = false;
        })
        .addCase(setBackofficeStatus, (state, action) => {
            state.status = action.payload;
        })
});