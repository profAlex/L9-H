import { ObjectId } from "mongodb";
import { dataCommandRepository } from "../repository-layers/command-repository-layer/command-repository";


export const securityDevicesService = {
    async removeSessionById(sessionId: ObjectId): Promise<null | undefined> {
        return await dataCommandRepository.removeSession(sessionId);
    },

    async removeAllButOneSession(sessionId: ObjectId, userId:string): Promise<null | undefined> {
        return await dataCommandRepository.removeAllButOneSession(sessionId, userId);
    },
};