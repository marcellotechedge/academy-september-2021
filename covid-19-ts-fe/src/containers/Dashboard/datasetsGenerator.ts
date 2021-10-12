import { CovidData } from '../../store/reducers/covidReducer';

export type DatasetFields = {
    labels: string[],
    data: number[]
}

export const getDatasetCasesWeeklyBarChart = (covidData: CovidData[], countryCode: string): DatasetFields => {
    const aggregateData: Record<string, number> = {};

    covidData.filter(record => record.countriesAndTerritories === countryCode).forEach(record => {
        const date = new Date(record.yearWeek);
        const recordLabel = 
            date.getFullYear().toString().padStart(2, '0') + '-' + 
            (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
            date.getDate().toString().padStart(2, '0')

        if ( aggregateData.hasOwnProperty(record.yearWeek) ) {
            aggregateData[recordLabel] += record.casesWeekly;
        }
        else {
            aggregateData[recordLabel] = record.casesWeekly;
        }
    });

    return {
        labels: Object.keys(aggregateData),
        data: Object.keys(aggregateData).map(recordKey => aggregateData[recordKey])
    };
};

export const getDatasetDeathsWeeklyBarChart = (covidData: CovidData[], countryCode: string): DatasetFields => {
    const aggregateData: Record<string, number> = {};
    
    covidData.filter(record => record.countriesAndTerritories === countryCode).forEach(record => {
        const date = new Date(record.yearWeek);
        const recordLabel = 
            date.getFullYear().toString().padStart(2, '0') + '-' + 
            (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
            date.getDate().toString().padStart(2, '0')

        if ( aggregateData.hasOwnProperty(record.yearWeek) ) {
            aggregateData[recordLabel] += record.deathsWeekly;
        }
        else {
            aggregateData[recordLabel] = record.deathsWeekly;
        }
    });

    return {
        labels: Object.keys(aggregateData),
        data: Object.keys(aggregateData).map(recordKey => aggregateData[recordKey])
    };
};