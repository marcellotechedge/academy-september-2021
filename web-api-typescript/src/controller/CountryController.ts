import { getConnection } from 'typeorm';
import { CaseDistribution } from '../models/CaseDistribution';

/**
 * 
 * @returns 
 */
export async function getCountries(): Promise<string[]> {

    let results: Array<string> = []

    let raw = await getConnection().getRepository(CaseDistribution)
        .createQueryBuilder('countries')
        .select('countriesAndTerritories')
        .distinct(true)
        .orderBy("countries.countriesAndTerritories", "ASC")
        .getRawMany();

    for (let singleRes of raw) {

        singleRes.countriesAndTerritories?.trim() && results.push(singleRes.countriesAndTerritories);
    }

    return results

}