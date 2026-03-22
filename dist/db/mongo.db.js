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
exports.db = exports.requestsRestrictionDataStorage = exports.sessionsDataStorage = exports.refreshTokensBlackListCollection = exports.commentsCollection = exports.usersCollection = exports.postsCollection = exports.bloggersCollection = exports.client = exports.REQUESTS_RESTRICTIONS_COLLECTION_NAME = exports.SESSIONS_COLLECTION_NAME = exports.REFRESH_TOKENS_COLLECTION_NAME = exports.COMMENTS_COLLECTION_NAME = exports.USERS_COLLECTION_NAME = exports.POSTS_COLLECTION_NAME = exports.BLOGGERS_COLLECTION_NAME = void 0;
exports.runDB = runDB;
exports.closeDB = closeDB;
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
const DB_NAME = "bloggers_db";
exports.BLOGGERS_COLLECTION_NAME = "bloggers_collection";
exports.POSTS_COLLECTION_NAME = "posts_collection";
exports.USERS_COLLECTION_NAME = "users_collection";
exports.COMMENTS_COLLECTION_NAME = "comments_collection";
exports.REFRESH_TOKENS_COLLECTION_NAME = "refresh_tokens_collection";
exports.SESSIONS_COLLECTION_NAME = "sessions_collection";
exports.REQUESTS_RESTRICTIONS_COLLECTION_NAME = "requests_restrictions_collection";
const URI = "mongodb+srv://admin:admin@learningcluster.f1zm90x.mongodb.net/?retryWrites=true&w=majority&appName=LearningCluster";
let db = null;
exports.db = db;
exports.client = null;
function runDB() {
    return __awaiter(this, void 0, void 0, function* () {
        exports.client = new mongodb_1.MongoClient(URI);
        exports.db = db = exports.client.db(DB_NAME);
        exports.bloggersCollection = db.collection(exports.BLOGGERS_COLLECTION_NAME);
        exports.postsCollection = db.collection(exports.POSTS_COLLECTION_NAME);
        exports.usersCollection = db.collection(exports.USERS_COLLECTION_NAME);
        exports.commentsCollection = db.collection(exports.COMMENTS_COLLECTION_NAME);
        exports.refreshTokensBlackListCollection = db.collection(exports.REFRESH_TOKENS_COLLECTION_NAME);
        // настройка автоудаления токенов
        yield exports.refreshTokensBlackListCollection.createIndex({ createdAt: 1 }, // поле для индексации
        {
            // unique: true,  // это лишнее, не ускоряет поиск по индексированному полю, это просто встроенная провекра на уникальность, для нашего случая помоему излишне
            expireAfterSeconds: 86400, // считается в секундах, т.е. 24×60×60 = 86400 это будут одни сутки, а, например, 604 800 сек = 7 суток
        });
        // настройка автоудаления сессий
        exports.sessionsDataStorage = db.collection(exports.SESSIONS_COLLECTION_NAME);
        yield exports.sessionsDataStorage.createIndex({ createdAt: 1 }, // поле для индексации
        {
            expireAfterSeconds: config_1.envConfig.refreshTokenLifetime, // считается в секундах, например: 24×60×60 = 86400 это будут одни сутки, а, например, 604 800 сек = 7 суток
        });
        exports.requestsRestrictionDataStorage = db.collection(exports.REQUESTS_RESTRICTIONS_COLLECTION_NAME);
        yield exports.requestsRestrictionDataStorage.createIndex({ dateOfRequest: 1 }, // поле для индексации
        {
            expireAfterSeconds: 11, // считается в секундах, например: 24×60×60 = 86400 это будут одни сутки, а, например, 604 800 сек = 7 суток
        });
        try {
            yield exports.client.connect();
            yield db.command({ ping: 1 });
            console.log(`🟢 Connected to DB ${DB_NAME}`);
        }
        catch (error) {
            yield exports.client.close();
            throw new Error(`Database not connected: ${error}`);
        }
    });
}
function closeDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (exports.client) {
                yield exports.client.close();
                console.log("🛑 MongoDB connection closed");
                exports.client = null;
                exports.db = db = null;
            }
        }
        catch (error) {
            console.error("Error: ", error);
        }
    });
}
