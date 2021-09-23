"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCase = void 0;
const typeorm_1 = require("typeorm");
const CaseDistribution_1 = require("../models/CaseDistribution");
/**
 *
 * @param from
 * @param to
 * @param country
 * @returns
 */
function getCase(from, to, country) {
    return __awaiter(this, void 0, void 0, function* () {
        let filterToFind = {};
        if (country === null || country === void 0 ? void 0 : country.trim()) {
            filterToFind.countriesAndTerritories = country.trim();
        }
        ;
        if ((from === null || from === void 0 ? void 0 : from.trim()) && (to === null || to === void 0 ? void 0 : to.trim())) {
            filterToFind.yearWeek = typeorm_1.Between(from, to);
        }
        else if (from === null || from === void 0 ? void 0 : from.trim()) {
            filterToFind.yearWeek = typeorm_1.MoreThan(from);
        }
        else {
            filterToFind.yearWeek = typeorm_1.LessThan(to);
        }
        console.log("filterToFind --> ", filterToFind);
        let results = yield typeorm_1.getConnection().getRepository(CaseDistribution_1.CaseDistribution).find({});
        return results;
    });
}
exports.getCase = getCase;
//# sourceMappingURL=CaseController.js.map