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
exports.ipRequestRestrictionGuard = void 0;
const http_statuses_1 = require("../../common/http-statuses/http-statuses");
const mongodb_1 = require("mongodb");
const command_repository_1 = require("../../repository-layers/command-repository-layer/command-repository");
const query_repository_1 = require("../../repository-layers/query-repository-layer/query-repository");
const ipRequestRestrictionGuard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // создаем объект при обращении данные для сессии
    const requestId = new mongodb_1.ObjectId();
    const deviceName = req.get("User-Agent") || ""; // или req.headers['user-agent'] - обязательно с малыми, т.к. по стандарту http все приводится к строчным. Методы .get и .header же осуществляют приведение к строчным(маленьким) под капотом
    const deviceIp = req.ip || "";
    const url = req.originalUrl || "";
    const checkIfCallAllowed = yield query_repository_1.dataQueryRepository.calculateIfCallAllowed(url, deviceIp, deviceName);
    if (!checkIfCallAllowed) {
        return res.status(http_statuses_1.HttpStatus.TooManyRequests).json({
            error: `Too many requests on URL: ${url}`,
        });
    }
    const newUrlCall = {
        _id: requestId,
        deviceIp: deviceIp,
        deviceName: deviceName,
        calledURL: url,
        dateOfRequest: new Date(),
    };
    const insertedUrlCall = yield command_repository_1.dataCommandRepository.insertUrlCall(newUrlCall);
    if (!insertedUrlCall) {
        return res.status(http_statuses_1.HttpStatus.InternalServerError).json({
            error: "Internal server error during await dataCommandRepository.insertUrlCall(newUrlCall) call inside ipRequestRestrictionGuard",
        });
    }
    next();
    return next();
});
exports.ipRequestRestrictionGuard = ipRequestRestrictionGuard;
