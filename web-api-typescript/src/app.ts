import express = require('express');
import CaseRouter from './router/CaseRouter';
import CaseSummaryRouter from './router/CaseSummaryRouter';
import CountryRouter from './router/CountryRouter';
import "reflect-metadata";
import { ConnectionOptions, createConnection, getConnectionManager } from "typeorm";
import { CaseDistribution } from './models/CaseDistribution';
import { APPLICATION_PORT, DATABASE, DB_PORT, DB_USERNAME, HOST, PASSWORD } from './utils/Config';

var cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());

app.use("/case", CaseRouter);
app.use("/case-summary", CaseSummaryRouter);
app.use("/country", CountryRouter);

const dbOptions : ConnectionOptions = {
    type: "mysql",
    host: HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: PASSWORD,
    database: DATABASE,
    ssl: true,
    entities: [
        CaseDistribution
    ],
    synchronize: false,
    logging: false
};

app.listen(APPLICATION_PORT, async () => {

    const connectionManager = getConnectionManager();
    const connection = connectionManager.create(dbOptions);
    await connection.connect(); 

    console.log("Running on port", APPLICATION_PORT);
});