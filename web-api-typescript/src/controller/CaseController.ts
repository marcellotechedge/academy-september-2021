import { Between, DeleteResult, FindConditions, getConnection, LessThan, MoreThan } from 'typeorm';
import { CaseDistribution } from '../models/CaseDistribution';

/**
 * 
 * @param from 
 * @param to 
 * @param country 
 * @returns 
 */
export async function getCase(from: string, to: string, country: string): Promise<CaseDistribution[]> {

    let filterToFind: FindConditions<CaseDistribution> = {} as FindConditions<CaseDistribution>;

    if (country?.trim()) {
        filterToFind.countriesAndTerritories = country.trim();
    };

    if (from?.trim() && to?.trim()) {
        filterToFind.yearWeek = Between(from, to)
    } else if (from?.trim()) {
        filterToFind.yearWeek = MoreThan(from);
    } else if (to?.trim()) {
        filterToFind.yearWeek = LessThan(to);
    };

    console.log(filterToFind);

    let results: CaseDistribution[] = await getConnection().getRepository(CaseDistribution).find(filterToFind);

    return results;

}

/**
 * 
 * @param id 
 * @returns 
 */
export async function getCaseById(id: string): Promise<CaseDistribution> {

    let result: CaseDistribution = await getConnection().manager.findOne(CaseDistribution, id);

    return result;

}

/**
 * 
 * @param body 
 * @returns 
 */
export async function insertCaseById(body: any): Promise<CaseDistribution> {

    let newcase = new CaseDistribution();
    newcase.yearWeek = body.yearWeek;
    newcase.casesWeekly = body.casesWeekly;
    newcase.continentExp = body.continentExp;
    newcase.countriesAndTerritories = body.countriesAndTerritories;
    newcase.geoId = body.geoId;
    newcase.countryTerritoryCode = body.countryTerritoryCode;
    newcase.popData2019 = body.popData2019;
    newcase.continentExp = body.continentExp;
    newcase.notificationRate = body.notificationRate;
    newcase.tsInsert = body.tsInsert;
    newcase.tsUpdate = body.tsUpdate;

    let result: CaseDistribution = await getConnection().manager.save(newcase);

    return result;
}

/**
 * 
 * @param body 
 * @returns 
 */
export async function updateCaseById(body: any): Promise<CaseDistribution> {

    let result: CaseDistribution = {} as CaseDistribution;

    try {

        let id = body.id

        let caseToUpdate = await getConnection().manager.findOne(CaseDistribution, id);

        caseToUpdate.yearWeek = !body.yearWeek ? caseToUpdate.yearWeek : body.yearWeek;
        caseToUpdate.casesWeekly = !body.casesWeekly ? caseToUpdate.casesWeekly : body.casesWeekly;
        caseToUpdate.continentExp = !body.continentExp ? caseToUpdate.continentExp : body.continentExp;
        caseToUpdate.deathsWeekly = !body.deathsWeekly ? caseToUpdate.deathsWeekly : body.deathsWeekly;
        caseToUpdate.countriesAndTerritories = !body.countriesAndTerritories ? caseToUpdate.countriesAndTerritories : body.countriesAndTerritories;
        caseToUpdate.geoId = !body.geoId ? caseToUpdate.geoId : body.geoId;
        caseToUpdate.countryTerritoryCode = !body.countryTerritoryCode ? caseToUpdate.countryTerritoryCode : body.countryTerritoryCode;
        caseToUpdate.popData2019 = !body.popData2019 ? caseToUpdate.popData2019 : body.popData2019;
        caseToUpdate.notificationRate = !body.notificationRate ? caseToUpdate.notificationRate : body.notificationRate;
        caseToUpdate.tsInsert = !body.tsInsert ? caseToUpdate.tsInsert : body.tsInsert;

        caseToUpdate.tsUpdate = new Date();

        result = await getConnection().manager.save(caseToUpdate);

    } catch (ex) {
        console.log("[updateCaseById] error to update", ex)
    }

    return result;
}


/**
 * 
 * @param id 
 * @returns 
 */
export async function deleteCaseById(id: string): Promise<DeleteResult> {

    let result: DeleteResult = await getConnection().getRepository(CaseDistribution).delete(id);

    return result;

}
