import { ObjectId } from "mongodb";
import { envConfig } from "../../config";
import { UUIDgeneration } from "../../adapters/randomUUIDgeneration/UUIDgeneration";

export class UserSession {
    _id: ObjectId;
    userId: string;
    deviceId: string;
    issuedAt: Date;
    deviceName: string;
    deviceIp: string;
    expiresAt: Date;

    constructor(
        _id: ObjectId,
        userId: string,
        deviceName: string,
        deviceIp: string,
    ) {
        this._id = _id;
        this.userId = userId;
        this.deviceId = UUIDgeneration.generateUUID();
        this.issuedAt = new Date();
        this.deviceName = deviceName;
        this.deviceIp = deviceIp;

        // // создаём копию даты issuedAt. Это важно: если просто присвоить this.issuedAt,
        // // то обе переменные будут ссылаться на один объект, и изменения затронут оба поля.
        // const expiresAt = new Date(this.issuedAt.getTime());
        // expiresAt.setSeconds(expiresAt.getSeconds() + 20);
        // this.expiresAt = expiresAt;

        this.expiresAt = new Date(
            this.issuedAt.getTime() + envConfig.refreshTokenLifetime * 1000,
        );
    }
}
