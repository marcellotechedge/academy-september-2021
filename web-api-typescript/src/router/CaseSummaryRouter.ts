import express from 'express';
import { getConnection } from 'typeorm';
import { CaseDistribution } from '../models/CaseDistribution';

let router = express.Router();

router.get("/", async (req: any, res: any) => {
    let result = [];

    let query = getConnection().getRepository(CaseDistribution).createQueryBuilder()
        .select('Id,YearWeek,sum(CasesWeekly) as CasesWeekly,sum(DeathsWeekly) as DeathsWeekly,CountriesAndTerritories,GeoId,CountryTerritoryCode,PopData2019,ContinentExp,NotificationRate,TsInsert,TsUpdate');

    if (req.query.from != undefined && req.query.to != undefined)
        query = query.where('YearWeek>:from AND YearWeek<:to', { from: req.query.from.toString(), to: req.query.to.toString() });

    else if (req.query.from != undefined)
        query = query.where('YearWeek>:from', { from: req.query.from.toString() });

    else if (req.query.to != undefined)
        query = query.where('YearWeek<:to', { to: req.query.to.toString() });

    if (req.query.country != undefined) query = query.andWhere('CountriesAndTerritories=:country', { country: req.query.country.toString() });

    try {
        result = await query.groupBy('CountriesAndTerritories').getRawMany();
    }
    catch (e) { console.log(e); res.statusCode = 500; res.end(); return null }

    res.send(result);
});

export default router;