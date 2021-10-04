import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import HomeContainer from '../containers/Home/HomeContainer';
import DashboardContainer from '../containers/Dashboard/DashboardContainer';
import BackOfficeContainer from '../containers/BackOffice/BackOfficeContainer';
import BackOfficeHomeContainer from '../containers/BackOffice/BackOfficeHomeContainer';
import NotFoundContainer from '../containers/NotFound/NotFoundContainer';

export const AppRouting: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <HomeContainer />
                </Route>
                <Route path="/dashboard" exact>
                    <DashboardContainer />
                </Route>
                <Route path="/back-office" exact>
                    <BackOfficeContainer />
                </Route>
                <PrivateRoute path="/back-office/home" exact>
                    <BackOfficeHomeContainer />
                </PrivateRoute>
                <Route path="*">
                    <NotFoundContainer />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouting;