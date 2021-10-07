import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menubar } from "primereact/menubar";
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import { APIStatus } from '../../store/axiosConfiguration';
import { useAppDispatch, useAppSelector } from '../../store/storeConfiguration';
import { performLogout } from '../../store/actions/authActions';
import _ from "lodash";

export const AppHeader: React.FC = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const isUserLogged = useAppSelector(state => state.auth.status === APIStatus.READY);
    const { data: covidData, summary: covidSummary } = useAppSelector(state => state.covid);

    const menuItems: MenuItem[] = [
        {
            label: "Search",
            icon: "pi pi-search",
            disabled: false,
            command: () => {
              history.push('/')
            }
        },
        {
            label: "Dashboard",
            icon: "pi pi-chart-bar",
            disabled: _.isEmpty(covidData) || _.isEmpty(covidSummary),
            command: () => history.push('/dashboard')
        },
        {
            label: "Back Office",
            icon: "pi pi-fw pi-pencil",
            disabled: false,
            command: () => history.push('/back-office')
        }
      ];

    return (
        <Menubar 
            model={menuItems} 
            end={isUserLogged ? <Button label="Logout" onClick={() => dispatch(performLogout())} icon="pi pi-power-off"/> : undefined}
        />
    )
}