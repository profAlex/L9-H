import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../common/http-statuses/http-statuses";
import { JwtAccessPayloadType } from "../../adapters/verification/payload-type";
import { jwtService } from "../../adapters/verification/jwt-service";
import { ObjectId } from "mongodb";
import { RequestRestrictionStorageModel } from "../router-types/auth-RequestRestrictionStorageModel";
import { dataCommandRepository } from "../../repository-layers/command-repository-layer/command-repository";
import { dataQueryRepository } from "../../repository-layers/query-repository-layer/query-repository";

export const ipRequestRestrictionGuard = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const requestId = new ObjectId();
        const deviceName = req.get("User-Agent") || "";
        const deviceIp = req.ip || "";
        const url = req.originalUrl || "";


        const checkIfCallAllowed = await dataQueryRepository.calculateIfCallAllowed(
            url,
            deviceIp,
            deviceName,
            10
        );

        // console.warn("FLAG checkIfCallAllowed: ", checkIfCallAllowed);

        if (!checkIfCallAllowed) {
            return res.status(HttpStatus.TooManyRequests).json({
                error: `Too many requests on URL: ${url}`,
            });
        }

        const newUrlCall: RequestRestrictionStorageModel = {
            _id: requestId,
            deviceIp: deviceIp,
            deviceName: deviceName,
            calledURL: url,
            dateOfRequest: new Date(),
        };

        const insertedUrlCall = await dataCommandRepository.insertUrlCall(newUrlCall);
        if (!insertedUrlCall) {
            return res.status(HttpStatus.InternalServerError).json({
                error: "Internal server error during insertUrlCall",
            });
        }

        //const restrictedSessionsList = await dataQueryRepository.utilGetAllRestrictedSessionRecords();
        //console.warn("AMOUNT OF ACTIVE SESSION: ", restrictedSessionsList.length);

        return next();
    } catch (error) {
        console.error('Error in ipRequestRestrictionGuard:', error);
        return res.status(HttpStatus.InternalServerError).json({
            error: 'Internal server error in ipRequestRestrictionGuard',
        });
    }
};


export const ipRequestRestrictionGuardForRegistration = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const requestId = new ObjectId();
        const deviceName = req.get("User-Agent") || "";
        const deviceIp = req.ip || "";
        const url = req.originalUrl || "";


        const checkIfCallAllowed = await dataQueryRepository.calculateIfCallAllowed(
            url,
            deviceIp,
            deviceName,
            15
        );

        // console.warn("FLAG checkIfCallAllowed: ", checkIfCallAllowed);

        if (!checkIfCallAllowed) {
            return res.status(HttpStatus.TooManyRequests).json({
                error: `Too many requests on URL: ${url}`,
            });
        }

        const newUrlCall: RequestRestrictionStorageModel = {
            _id: requestId,
            deviceIp: deviceIp,
            deviceName: deviceName,
            calledURL: url,
            dateOfRequest: new Date(),
        };

        const insertedUrlCall = await dataCommandRepository.insertUrlCall(newUrlCall);
        if (!insertedUrlCall) {
            return res.status(HttpStatus.InternalServerError).json({
                error: "Internal server error during insertUrlCall",
            });
        }

        //const restrictedSessionsList = await dataQueryRepository.utilGetAllRestrictedSessionRecords();
        //console.warn("AMOUNT OF ACTIVE SESSION: ", restrictedSessionsList.length);

        return next();
    } catch (error) {
        console.error('Error in ipRequestRestrictionGuard:', error);
        return res.status(HttpStatus.InternalServerError).json({
            error: 'Internal server error in ipRequestRestrictionGuard',
        });
    }
};


export const ipRequestRestrictionGuardForResending = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const requestId = new ObjectId();
        const deviceName = req.get("User-Agent") || "";
        const deviceIp = req.ip || "";
        const url = req.originalUrl || "";


        const checkIfCallAllowed = await dataQueryRepository.calculateIfCallAllowed(
            url,
            deviceIp,
            deviceName,
            15
        );

        // console.warn("FLAG checkIfCallAllowed: ", checkIfCallAllowed);

        if (!checkIfCallAllowed) {
            return res.status(HttpStatus.TooManyRequests).json({
                error: `Too many requests on URL: ${url}`,
            });
        }

        const newUrlCall: RequestRestrictionStorageModel = {
            _id: requestId,
            deviceIp: deviceIp,
            deviceName: deviceName,
            calledURL: url,
            dateOfRequest: new Date(),
        };

        const insertedUrlCall = await dataCommandRepository.insertUrlCall(newUrlCall);
        if (!insertedUrlCall) {
            return res.status(HttpStatus.InternalServerError).json({
                error: "Internal server error during insertUrlCall",
            });
        }

        //const restrictedSessionsList = await dataQueryRepository.utilGetAllRestrictedSessionRecords();
        //console.warn("AMOUNT OF ACTIVE SESSION: ", restrictedSessionsList.length);

        return next();
    } catch (error) {
        console.error('Error in ipRequestRestrictionGuard:', error);
        return res.status(HttpStatus.InternalServerError).json({
            error: 'Internal server error in ipRequestRestrictionGuard',
        });
    }
};