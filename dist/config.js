"use strict";
// import dotenv from "dotenv";
// dotenv.config();
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
require("dotenv/config");
// дефолтные значения параметров
const DEFAULT_PORT = "3003";
const DEFAULT_ACCESS_TOKEN_SECRET = "ryuas235GCPHvlt347782uzHBSDuw4hr";
const DEFAULT_REFRESH_TOKEN_SECRET = "ryuas235GCPHvlt347782uzHBSDuw4hr";
const DEFAULT_ACCESS_TOKEN_LIFETIME = "10"; // sec
const DEFAULT_REFRESH_TOKEN_LIFETIME = "20"; // sec
const DEFAULT_COOKIE_DOMAIN = "localhost";
const DEFAULT_COOKIE_SECURE = true;
const DEFAULT_MAIL_PORT = "465";
const DEFAULT_MAIL_HOST = "smtp.yandex.ru";
const DEFAULT_MAIL_LOGIN = "geniusb198";
const DEFAULT_MAIL_PASS = "gbpqxmmaleaqmiwu";
// парсинг значений
const getConfig = () => {
    let appPort = process.env.PORT;
    let accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    let refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    let accessTokenLifetime = process.env.ACCESS_TOKEN_LIFETIME;
    let refreshTokenLifetime = process.env.REFRESH_TOKEN_LIFETIME;
    let mailPort = process.env.MAIL_PORT;
    let mailHost = process.env.MAIL_HOST;
    let mailLogin = process.env.MAIL_LOGIN;
    let mailPass = process.env.MAIL_PASS;
    // валидация
    if (!appPort) {
        console.warn(`PORT is not defined in .env! Applied default port number ${DEFAULT_PORT}.`);
        appPort = DEFAULT_PORT;
    }
    // if (!accessJwtSecret) throw new Error("JWT_SECRET is required in .env");
    if (!accessTokenSecret) {
        console.warn("ACCESS_TOKEN_SECRET is not defined in .env! Applied default value.");
        accessTokenSecret = DEFAULT_ACCESS_TOKEN_SECRET;
    }
    if (!refreshTokenSecret) {
        console.warn("REFRESH_TOKEN_SECRET is not defined in .env! Applied default value.");
        refreshTokenSecret = DEFAULT_REFRESH_TOKEN_SECRET;
    }
    if (!accessTokenLifetime) {
        console.warn(`ACCESS_TOKEN_LIFETIME is not defined in .env! Applied default value (seconds) (: ${DEFAULT_ACCESS_TOKEN_LIFETIME}.`);
        accessTokenLifetime = DEFAULT_ACCESS_TOKEN_LIFETIME;
    }
    if (!refreshTokenLifetime) {
        console.warn(`REFRESH_TOKEN_LIFETIME is not defined in .env! Applied default value (seconds): ${DEFAULT_REFRESH_TOKEN_LIFETIME}.`);
        refreshTokenLifetime = DEFAULT_REFRESH_TOKEN_LIFETIME;
    }
    if (!mailPort) {
        console.warn(`MAIL_PORT is not defined in .env! Applied default value: ${DEFAULT_MAIL_PORT}.`);
        mailPort = DEFAULT_MAIL_PORT;
    }
    if (!mailHost) {
        console.warn(`MAIL_HOST is not defined in .env! Applied default value: ${DEFAULT_MAIL_HOST}.`);
        mailHost = DEFAULT_MAIL_HOST;
    }
    if (!mailLogin) {
        console.warn(`MAIL_LOGIN is not defined in .env! Applied default value: ${DEFAULT_MAIL_LOGIN}.`);
        mailLogin = DEFAULT_MAIL_LOGIN;
    }
    if (!mailPass) {
        console.warn(`MAIL_PASS is not defined in .env! Applied default value: ${DEFAULT_MAIL_PASS}.`);
        mailPass = DEFAULT_MAIL_PASS;
    }
    return {
        appPort: parseInt(appPort, 10),
        accessTokenSecret: accessTokenSecret,
        refreshTokenSecret: refreshTokenSecret,
        accessTokenLifetime: parseInt(accessTokenLifetime, 10),
        refreshTokenLifetime: parseInt(refreshTokenLifetime, 10),
        mailPort: parseInt(mailPort, 10),
        mailHost: mailHost,
        mailLogin: mailLogin,
        mailPass: mailPass,
    };
};
exports.envConfig = getConfig();
// {"error":"Session doesnt exist or expired token",
//     "requestData":
//     {
//     "userId":"69c0f984652c80d52b4dff31","deviceId":"1d0ed794-1794-4511-84b6-369108de28e9","expToPass":"2026-03-23T08:28:20.000Z","iatToPass":"2026-03-23T08:28:00.000Z"
// },
//     "metaData":[
//         {"_id":"69c0f990652c80d52b4dff35","userId":"69c0f984652c80d52b4dff31","deviceId":"b8f361ca-b7aa-495a-a40f-ebd68167d7a3","issuedAt":"2026-03-23T08:28:00.000Z","deviceName":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:105.0) Gecko/20100101 Firefox/103.0","deviceIp":"18.195.23.171","expiresAt":"2026-03-23T08:28:20.000Z"}
//     ,{"_id":"69c0f991652c80d52b4dff37","userId":"69c0f984652c80d52b4dff31","deviceId":"085c23fd-1f2a-4e35-87db-95de026bd71f","issuedAt":"2026-03-23T08:28:01.000Z","deviceName":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36","deviceIp":"18.195.23.171","expiresAt":"2026-03-23T08:28:21.000Z"},
//     {"_id":"69c0f991652c80d52b4dff39","userId":"69c0f984652c80d52b4dff31","deviceId":"65f6aae6-68cf-45db-a5ac-f3dcc7023c26","issuedAt":"2026-03-23T08:28:01.000Z","deviceName":"Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Safari/605.1.15","deviceIp":"18.195.23.171","expiresAt":"2026-03-23T08:28:21.000Z"}]}
