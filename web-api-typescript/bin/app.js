"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const CaseRouter_1 = __importDefault(require("./router/CaseRouter"));
const CaseSummaryRouter_1 = __importDefault(require("./router/CaseSummaryRouter"));
const CountryRouter_1 = __importDefault(require("./router/CountryRouter"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const CaseDistribution_1 = require("./models/CaseDistribution");
const config = __importStar(require("./utils/Config"));
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use("/case", CaseRouter_1.default);
app.use("/case-summary", CaseSummaryRouter_1.default);
app.use("/country", CountryRouter_1.default);
const dbOptions = {
    type: "mysql",
    host: config.HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE,
    ssl: true,
    entities: [
        CaseDistribution_1.CaseDistribution
    ],
    synchronize: false,
    logging: false
};
app.listen(config.APPLICATION_PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    const connectionManager = typeorm_1.getConnectionManager();
    const connection = connectionManager.create(dbOptions);
    yield connection.connect();
    console.log("Running on port", config.APPLICATION_PORT);
}));
//# sourceMappingURL=app.js.map