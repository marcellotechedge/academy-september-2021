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
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const CaseDistribution_1 = require("../models/CaseDistribution");
const caseController = __importStar(require("../controller/CaseController"));
let router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Query in /case", req.query);
    let { from, to, country } = req.query;
    let results = yield caseController.getCase(from, to, country);
    res.send(results);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let results = yield typeorm_1.getConnection().manager.findOne(CaseDistribution_1.CaseDistribution, id);
    res.send(results);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Body from /base", req.body);
    let newcase = new CaseDistribution_1.CaseDistribution();
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
    let results = yield typeorm_1.getConnection().manager.save(newcase);
    console.log("result", results);
    res.send(results);
}));
router.put("/", (req, res) => {
    res.send("xxx");
});
router.delete("/", (req, res) => {
    res.send("xxx");
});
exports.default = router;
//# sourceMappingURL=CaseRouter.js.map