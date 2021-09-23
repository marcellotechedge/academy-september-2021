import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { endLayoutLoading, startLayoutLoading } from "./layoutActions";

export const performLogout = createAction('auth/performLogout');

export const performLogin = createAsyncThunk<
    { token: string }, 
    { username: string, password: string }
>(
    'auth/performLogin',
    async ({ username, password }, thunkApi) => {
        thunkApi.dispatch(startLayoutLoading());
    
        try {
        const response: { data: { token: string } } = await new Promise((resolve, reject) => {
            console.log('Perform login..');

            setTimeout(() => {
                if ( username === "admin" && password === "password" ) {
                    console.log('Login successful')
                    resolve({ data: { token: "VG9vU2VjdXJl" } });
                }
                else {
                    console.log('Login failed')
                    reject({ response: { status: 400 }})
                }
            }, 3000);
        })
        
        thunkApi.dispatch(endLayoutLoading());
        return response.data;
        } catch(error) {
        thunkApi.dispatch(endLayoutLoading());
        throw error;
        }
    }
)