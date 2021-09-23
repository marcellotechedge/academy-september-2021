"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE = exports.PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.HOST = exports.APPLICATION_PORT = void 0;
exports.APPLICATION_PORT = process.env.PORT || 3006;
/*export const HOST = process.env.HOST || "academy-may-2021-db.mysql.database.azure.com";
export const DB_PORT = (process.env.DB_PORT || 3306) as number;
export const DB_USERNAME = process.env.DB_USERNAME || "academyadmin@academy-may-2021-db";
export const PASSWORD = process.env.PASSWORD || "Techedge01!";
export const DATABASE = process.env.DATABASE || "academy";*/
exports.HOST = "techacademy-mysql-server.mysql.database.azure.com";
exports.DB_PORT = 3306;
exports.DB_USERNAME = "techadmin@techacademy-mysql-server";
exports.PASSWORD = "mysqlpassword_2021";
exports.DATABASE = "c19_tracker";
//# sourceMappingURL=Config.js.map