import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import _ from "lodash";
import {TabPanel, TabView} from "primereact/tabview";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Chart } from 'primereact/chart';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import SelectCountry from '../../components/SelectCountry/SelectCountry';
import { useAppSelector } from '../../store/storeConfiguration';
import { getDatasetCasesWeeklyBarChart, getDatasetDeathsWeeklyBarChart } from './datasetsGenerator';

export type ChartData = {
    labels: string[],
    datasets: any[]
};

export const DashboardContainer: React.FC = () => {
    const location = useLocation<{ selectedCountry?: string }>();
    const history = useHistory();
    const { data: covidData, summary: covidSummary } = useAppSelector(state => state.covid);
    const countryState = useAppSelector(state => state.country);
    const [ selectFirstCountry, setSelectFirstCountry ] = useState<string>();
    const [ selectSecondCountry, setSelectSecondCountry ] = useState<string>();
    const [ selectThirdCountry, setSelectThirdCountry ] = useState<string>();
    const [ disableSelect, setDisableSelect ] = useState<boolean>(false);
    const [casesWeeklyBarChartDataset, setCasesWeeklyBarChartDataset] = useState<ChartData>({ labels: [], datasets: [] });
    const [deathsWeeklyBarChartDataset, setDeathsWeeklyBarChartDataset] = useState<ChartData>({ labels: [], datasets: [] });

    const generateChartsDataset = (countryCode: string, datasetIndex: number) => {
        const chartColor = [ "#81030f", "#1e6003", "#e56118"];

        const newCasesWeeklyBarChartDataset: ChartData = _.cloneDeep(casesWeeklyBarChartDataset);
        const newDeathsWeeklyBarChartDataset: ChartData = _.cloneDeep(deathsWeeklyBarChartDataset);

        const { labels: casesLabels, data: casesData } = getDatasetCasesWeeklyBarChart(covidData, countryCode);
        const { labels: deathsLabels, data: deatshData } = getDatasetDeathsWeeklyBarChart(covidData, countryCode);

        if ( _.isEmpty(newCasesWeeklyBarChartDataset.labels) )
            newCasesWeeklyBarChartDataset.labels = casesLabels;

        if ( _.isEmpty(newDeathsWeeklyBarChartDataset.labels) )
            newDeathsWeeklyBarChartDataset.labels = deathsLabels;
        
        newCasesWeeklyBarChartDataset.datasets[datasetIndex] = {
            label: countryCode,
            data: casesData,
            backgroundColor: chartColor[datasetIndex]
        };

        newDeathsWeeklyBarChartDataset.datasets[datasetIndex] = {
            label: countryCode,
            data: deatshData,
            backgroundColor: chartColor[datasetIndex]
        }

        setCasesWeeklyBarChartDataset(newCasesWeeklyBarChartDataset);
        setDeathsWeeklyBarChartDataset(newDeathsWeeklyBarChartDataset);
    }

    useEffect(() => {
        if (_.isEmpty(covidData) || _.isEmpty(covidSummary)) {
            history.push("/");
        }
    }, [covidData, covidSummary])

    useEffect(() => {
        if ( location.state && location.state.selectedCountry && covidData ) {
            console.log('covidData:', covidData);
            const countryCode = location.state.selectedCountry;
            setSelectFirstCountry(countryCode)
            setDisableSelect(true);

            generateChartsDataset(countryCode, 0);
        }
    }, [location, covidData]);

    useEffect(() => {
        if ( typeof selectFirstCountry !== "undefined" )
            generateChartsDataset(selectFirstCountry, 0);
    }, [selectFirstCountry])

    useEffect(() => {
        if ( typeof selectSecondCountry !== "undefined" )
            generateChartsDataset(selectSecondCountry, 1);
    }, [selectSecondCountry])

    useEffect(() => {
        if ( typeof selectThirdCountry !== "undefined" )
            generateChartsDataset(selectThirdCountry, 2);
    }, [selectThirdCountry])

    return (
        <div>
            <AppHeader />

            <div className="covid-app-form">
                <div className="covid-app-field">
                    <label>Selected Country</label>
                    <div>
                        <SelectCountry 
                            countries={countryState.countries}
                            value={selectFirstCountry} 
                            onChange={setSelectFirstCountry} 
                            style={{ minWidth: 222 }}
                            disabled={true}
                        />
                    </div>
                </div>
            </div>

            <TabView>
                {/*<TabPanel key={0} header="Summary Country Table">
                    <DataTable
                        value={covidSummary}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[ 10, 15, 20 ]}
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    >
                        <Column field="country" header="Country Name" />
                        <Column field="countryCode" header="Country Code" />
                        <Column field="continent" header="Continent" />
                        <Column field="totalCase" header="Total Case" />
                        <Column field="totalDeaths" header="Total Deaths" />
                    </DataTable>
                </TabPanel>
                */}
                <TabPanel key={1} header="Cases Weekly per Country">
                    <Chart type="bar" data={casesWeeklyBarChartDataset} />
                </TabPanel>
                <TabPanel key={2} header="Deaths Weekly per Country">
                    <Chart type="bar" data={deathsWeeklyBarChartDataset} />
                </TabPanel>
            </TabView>
        </div>
    )
}

export default DashboardContainer;