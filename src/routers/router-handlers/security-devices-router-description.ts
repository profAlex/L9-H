import { Request, Response } from "express";
import {
    RequestWithParamsAndSessionMetaData,
    RequestWithSessionMetaData
} from "../request-types/request-types";
import { IdParamName } from "../util-enums/id-names";
import { HttpStatus } from "../../common/http-statuses/http-statuses";
import { securityDevicesService } from "../../service-layer(BLL)/security-devices-service";
import { SessionMetaDataType } from "../router-types/user-id-type";

export const removeSessionById = async (req: RequestWithParamsAndSessionMetaData<
    {
        [IdParamName.DeviceId]: string;
    },
    SessionMetaDataType
>, res: Response) => {
    const result = await securityDevicesService.removeSessionById(req.sessionId!);

    if (result === undefined) {
        res.sendStatus(HttpStatus.NotFound);
    }

    res.sendStatus(HttpStatus.NoContent);
};

export const removeAllButOneSession = async (req: RequestWithSessionMetaData<SessionMetaDataType>, res: Response) => {
    const result = await securityDevicesService.removeAllButOneSession(req.sessionId!, req.user!.userId!);

    if (result === undefined) {
        res.status(HttpStatus.InternalServerError).json({
            error: "Internal server error during await securityDevicesService.removeAllButOneSession(req.sessionId!, req.user!.userId!)  inside removeAllButOneSession",
        });
    }
    res.sendStatus(HttpStatus.NoContent);
};

export const getDevicesList = async (req: RequestWithSessionMetaData<SessionMetaDataType>, res: Response) => {
    const sanitizedQuery = matchedData<InputGetPostsQuery>(req, {
        locations: ["query"],
        includeOptionals: true,
    }); //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)

    const postsListOutput =
        await dataQueryRepository.getSeveralPosts(sanitizedQuery);

    res.status(HttpStatus.Ok).send(postsListOutput);
};