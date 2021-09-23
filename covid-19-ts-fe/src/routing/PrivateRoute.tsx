import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { APIStatus } from '../store/axiosConfiguration';
import { useAppSelector } from '../store/storeConfiguration';

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
    const authState = useAppSelector(state => state.auth);

    return (
        <Route {...props}>
            {authState.status !== APIStatus.READY ?
                <Redirect to="/back-office" />
                :
                <>{children}</>
            }
        </Route>
    )
}