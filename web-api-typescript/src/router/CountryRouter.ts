import express from 'express';
import * as countryController from '../controller/CountryController';

let router = express.Router();

router.get("/", async (req: any, res: any) => {
    console.log(`[get countries] start`);

    let result: any = await countryController.getCountries();

    console.log(`[get countries] end`);

    res.send(result);
    return;
});

export default router;