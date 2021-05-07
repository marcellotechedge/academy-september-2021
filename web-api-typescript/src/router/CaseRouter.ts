import express from 'express';
import { getConnection } from 'typeorm';
import { CaseDistribution } from '../models/CaseDistribution';

let router = express.Router();

router.get("/", async (req: any, res: any) => {
    console.log("Query in /case", req.query);
    let results = await getConnection().manager.find(CaseDistribution);
    res.send(results);
});


router.get("/:id", async (req: any, res: any) => {
    let id : string = req.params.id;
    let results = await getConnection().manager.findOne(CaseDistribution, id);
    res.send(results);
});


router.post("/", async (req: any, res: any) => {
    console.log("Body from /base", req.body);
    let newcase = new CaseDistribution();
    newcase.yearWeek = req.body.yearWeek;
    newcase.casesWeekly = req.body.casesWeekly;
    newcase.continentExp = req.body.continentExp;
    newcase.countriesAndTerritories = req.body.countriesAndTerritories;
    newcase.geoId = req.body.geoId;
    newcase.countryTerritoryCode = req.body.countryTerritoryCode;
    newcase.popData2019 = req.body.popData2019;
    newcase.continentExp = req.body.continentExp;
    newcase.notificationRate = req.body.notificationRate;
    newcase.tsInsert = req.body.tsInsert;
    newcase.tsUpdate = req.body.tsUpdate;
    let results = await getConnection().manager.save(newcase);
    console.log("result", results);
    res.send(results);
});

router.put("/", (req: any, res: any) => {
    res.send("xxx");
});

router.delete("/", (req: any, res: any) => {
    res.send("xxx");
});

export default router;