import express from 'express';
import * as caseController from '../controller/CaseController';
import { CaseDistribution } from '../models/CaseDistribution';

let router = express.Router();

router.get("/", async (req: any, res: any) => {
    console.log(`[get case] query param ${req.query}`);

    let { from, to, country } = req.query;

    let results: CaseDistribution[] = await caseController.getCase(from, to, country);

    console.log(`[get case] end`);

    res.send(results);
    return;
});


router.get("/:id", async (req: any, res: any) => {
    console.log(`[get case by id] id ${req.params}`);

    const { id } = req.params;

    let result: CaseDistribution = await caseController.getCaseById(id);

    console.log(`[get case by id] end`);

    res.send(result);
    return;
});


router.post("/", async (req: any, res: any) => {
    console.log(`[post case] start`);

    let result: CaseDistribution = await caseController.insertCaseById(req.body);

    console.log(`[post case] end`);

    res.send(result);
    return;
});

router.put("/", async (req: any, res: any) => {
    console.log(`[put case] start`);

    let result: CaseDistribution = await caseController.updateCaseById(req.body);

    console.log(`[put case] end`);

    res.send(result);
});

router.delete("/:id", async (req: any, res: any) => {
    console.log(`[delete case by id] id ${req.params}`);

    const { id } = req.params;

    let result: any = await caseController.deleteCaseById(id);

    console.log(`[delete case by id] end`);

    res.send(result);
    return;
});

export default router;