import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../common/http-statuses/http-statuses";
import { jwtService } from "../../adapters/verification/jwt-service";
import { dataCommandRepository } from "../../repository-layers/command-repository-layer/command-repository";

export const refreshTokenGuard = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const  { refreshToken }  = req.cookies || {}; // || {} введено для тех случаев если забыли например подключить cooke-parcer, тогда поля cookies в структуре req вообще будет отсутствовать и тогда undefined крашнет приложение

    if (!refreshToken) {
        return res.status(HttpStatus.Unauthorized).json({
            error: `Malformed refresh token, was not found.`,
        });
    }

    const payload = await jwtService.verifyRefreshToken(refreshToken);

    if (!payload) {
        return res.status(HttpStatus.Unauthorized).json({
            error: `Improper refresh token format`,
        });
    }

    const decodedRefreshTokenData =
        await jwtService.decodeRefreshToken(refreshToken);

    const sessionId = await dataCommandRepository.findSession(
        decodedRefreshTokenData?.userId!,
        decodedRefreshTokenData?.deviceId!,
        new Date(decodedRefreshTokenData?.iat! * 1000),
        new Date(decodedRefreshTokenData?.exp! * 1000),
    );

    if (!sessionId) {
        return res.status(HttpStatus.Unauthorized).json({
            error: `Session doesnt exist or expired token`,
        });
    }
    // const ifRefreshTokenInBlackList = await dataCommandRepository.checkIfRefreshTokenInBlackList(refreshToken);
    // if (ifRefreshTokenInBlackList)
    // {
    //     // ВОТ ТУТ НАДО БЫ ПЕРЕДАТЬ В АЙТИ БЕЗОПАСНОСТЬ? т.к. кто-то с уже занесенным в блэк лист и скорее всего перевыпущенным токеном снова пытается обновиться? Или в случае если у нас несколько устройств, то это нормальная ситуация и надо бы проверять еще и по айпишникам-мак адресам?
    //     return res.status(HttpStatus.Unauthorized).json({
    //         error: `Refresh token is in the black list`,
    //     });
    // }

    // пытаемся найти сессию
    req.user = { userId: payload.userId };
    req.sessionId = sessionId;

    return next();
};
