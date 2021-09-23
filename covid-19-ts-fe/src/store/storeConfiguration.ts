import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import layoutReducer from './reducers/layoutReducer'
import countryReducer from './reducers/countryReducer'
import covidReducer from './reducers/covidReducer';
import authReducer from './reducers/authReducer';
import backofficeReducer from './reducers/backofficeReducer';

export const store = configureStore({
  reducer: {
      layout: layoutReducer,
      country: countryReducer,
      covid: covidReducer,
      auth: authReducer,
      backoffice: backofficeReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector