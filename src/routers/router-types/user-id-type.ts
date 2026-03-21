import { ObjectId } from "mongodb";

export type UserIdType = { userId: string | null };


export type SessionMetaDataType = {
    userId: string | null;
    sessionId: ObjectId | undefined;
    deviceId: string | undefined;
};
