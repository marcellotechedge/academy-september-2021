import express = require('express');
import "reflect-metadata";
import { ConnectionOptions, getConnectionManager } from "typeorm";
import { CaseDistribution } from './models/CaseDistribution';
import CaseRouter from './router/CaseRouter';
import CaseSummaryRouter from './router/CaseSummaryRouter';
import CountryRouter from './router/CountryRouter';
import * as config from './utils/Config';

var cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());

app.use("/case", CaseRouter);
app.use("/case-summary", CaseSummaryRouter);
app.use("/country", CountryRouter);

const dbOptions: ConnectionOptions = {
    type: "mysql",
    host: config.HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE,
    ssl: true,
    entities: [
        CaseDistribution
    ],
    synchronize: false,
    logging: false
};

app.listen(config.APPLICATION_PORT, async () => {

    const connectionManager = getConnectionManager();
    const connection = connectionManager.create(dbOptions);
    await connection.connect();

    console.log("Running on port", config.APPLICATION_PORT);
});