import { createReducer } from '@reduxjs/toolkit'
import { performLogin, performLogout } from '../actions/authActions'
import { APIStatus } from '../axiosConfiguration'

export type AuthState = {
    status: APIStatus,
    error: boolean,
    auth: {
        token: string
    } | null
}

const initialState: AuthState = {
    status: APIStatus.IDLE,
    error: false,
    auth: null,
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(performLogout, (state) => {
          state.status = APIStatus.IDLE;
          state.auth = null;
        })
        .addCase(performLogin.pending, (state) => {
          state.status = APIStatus.PENDING;
        })
        .addCase(performLogin.rejected, (state) => {
          state.status = APIStatus.IDLE;
          state.error = true;
          state.auth = null;
        })
        .addCase(performLogin.fulfilled, (state, action) => {
          state.status = APIStatus.READY;
          state.error = false;
          state.auth = action.payload;
        })
});