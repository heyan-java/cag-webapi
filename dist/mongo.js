"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./logger");
const logger = logger_1.getLogger('mongo');
// Use native promises
// see: http://mongoosejs.com/docs/promises.html
mongoose_1.default.Promise = global.Promise;
// 使用mongoose访问MongoDB
mongoose_1.default.connect(config_1.default.mongo_url, {
    useMongoClient: true,
    db: {
        ative_parser: true,
        safe: true
    },
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
});
const mdb = mongoose_1.default.connection;
// 连接断开后重连
mdb.on('error', (err) => {
    logger.error('[DB ERROR]: mongoose db error:%s', err);
});
mdb.on('open', (err) => {
    logger.info("mongoose连接DB成功...");
});
mdb.on('close', () => {
    logger.info('connection closed, should will reconnect soon');
});
exports.connecting = mdb;
function info() {
    logger.info('mongo db collections:' + config_1.default.mongo_url);
}
exports.info = info;
//# sourceMappingURL=mongo.js.map