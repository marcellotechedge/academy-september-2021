import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import dayjs from 'dayjs';
import { ToastContent } from '../../components/ToastContent/ToastContent';
import SelectCountry from '../../components/SelectCountry/SelectCountry';
import { APIStatus } from '../../store/axiosConfiguration';
import { useAppDispatch, useAppSelector } from '../../store/storeConfiguration';
import { fetchCovidData, setCovidStatus } from '../../store/actions/covidActions';
import { AppHeader } from '../../components/AppHeader/AppHeader';

export const HomeContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const covidState = useAppSelector(state => state.covid);
    const [ selectedCountry, setSelectedCountry ] = useState();
    const [ dateFrom, setDateFrom ] = useState<Date>();
    const [ dateTo, setDateTo ] = useState<Date>();
    const toast = useRef<Toast>(null);
    
    const handleSearch = () => {
        if ( toast.current === null ) 
            return;

        if (typeof dateFrom === "undefined" || typeof dateTo === "undefined" || dateFrom > dateTo) {
            toast.current.show({
                severity: 'error',
                contentClassName: "home-toast",
                content: (
                    <ToastContent title="Invalid Search" message="From date should be minor or equal to to date." />
                ),
                life: 3000
            });

            return;
        }

        dispatch(fetchCovidData({
            dateFrom: dayjs(dateFrom).format("DD/MM/YYYY"), 
            dateTo: dayjs(dateTo).format("DD/MM/YYYY"),
            country: selectedCountry
        }))
    }

    useEffect(() => {
        if ( toast.current === null ) 
            return;

        if ( covidState.error ) {
            toast.current.show({
                severity: 'error',
                contentClassName: "home-toast",
                content: (
                    <ToastContent title="Search failed" message="Cannot fetch data." />
                ),
                life: 3000
            });
        }
    }, [ covidState.error ])

    useEffect(() => {
        if ( covidState.status === APIStatus.READY ) {
            dispatch(setCovidStatus(APIStatus.IDLE));
            history.push('/dashboard');
        }
    }, [ covidState.status ]);

    return (
        <div>
            <AppHeader />
            <Toast ref={toast} />
            <div className="covid-app-form">
                <div className="covid-app-field">
                    <label>Country</label>
                    <div>
                        <SelectCountry 
                            value={selectedCountry} 
                            onChange={setSelectedCountry} 
                            style={{ minWidth: 222 }}
                        />
                    </div>
                </div>

                <div className="covid-app-field">
                    <label>From Date</label>
                    <div>
                        <Calendar 
                            dateFormat="dd/mm/yy"
                            value={dateFrom} 
                            yearRange="2010:2030"
                            onChange={(e) => setDateFrom(e.value as Date)}
                            monthNavigator
                            yearNavigator
                            showIcon
                        />
                    </div>
                </div>

                <div className="covid-app-field">
                    <label>To Date</label>
                    <div>
                        <Calendar 
                            dateFormat="dd/mm/yy"
                            value={dateTo} 
                            yearRange="2010:2030"
                            onChange={(e) => setDateTo(e.value as Date)}
                            monthNavigator
                            yearNavigator
                            showIcon
                        />
                    </div>
                </div>

                <div className="covid-app-field">
                    <div>
                        <Button
                        label="Search"
                        onClick={handleSearch}
                        disabled={!dateFrom || !dateTo}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HomeContainer;