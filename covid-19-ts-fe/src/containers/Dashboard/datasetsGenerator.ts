import { CovidData } from '../../store/reducers/covidReducer';

export type DatasetFields = {
    labels: string[],
    data: number[]
}

export const getDatasetCasesWeeklyBarChart = (covidData: CovidData[], countryCode: string): DatasetFields => {
    const aggregateData: Record<string, number> = {};
    
    covidData.filter(record => record.countryCode === countryCode).forEach(record => {
        if ( aggregateData.hasOwnProperty(record.yearWeek) ) {
            aggregateData[record.yearWeek] += record.casesWeekly;
        }
        else {
            aggregateData[record.yearWeek] = record.casesWeekly;
        }
    });

    return {
        labels: Object.keys(aggregateData),
        data: Object.keys(aggregateData).map(recordKey => aggregateData[recordKey])
    };
};

export const getDatasetDeathsWeeklyBarChart = (covidData: CovidData[], countryCode: string): DatasetFields => {
    const aggregateData: Record<string, number> = {};
    
    covidData.filter(record => record.countryCode === countryCode).forEach(record => {
        if ( aggregateData.hasOwnProperty(record.yearWeek) ) {
            aggregateData[record.yearWeek] += record.deathsWeekly;
        }
        else {
            aggregateData[record.yearWeek] = record.deathsWeekly;
        }
    });

    return {
        labels: Object.keys(aggregateData),
        data: Object.keys(aggregateData).map(recordKey => aggregateData[recordKey])
    };
};

export const getDatasetAverageLineChart = (covidData: CovidData[], countryCode: string): DatasetFields => {
    const aggregateData: Record<string, number> = {};
    
    covidData.filter(record => record.countryCode === countryCode).forEach(record => {
        if ( aggregateData.hasOwnProperty(record.yearWeek) ) {
            aggregateData[record.yearWeek] = aggregateData[record.yearWeek] + record.average / 2;
        }
        else {
            aggregateData[record.yearWeek] = record.average;
        }
    });

    return {
        labels: Object.keys(aggregateData),
        data: Object.keys(aggregateData).map(recordKey => aggregateData[recordKey])
    };
};
