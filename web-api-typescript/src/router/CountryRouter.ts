import express from 'express';

let router = express.Router();

router.get("/", (req: any, res: any) => {
    res.send("xxx");
});

export default router;