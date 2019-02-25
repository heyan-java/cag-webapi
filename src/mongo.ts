import mongoose from "mongoose";
import conf from './config';
import { getLogger } from './logger';
const logger = getLogger('mongo');

// Use native promises
// see: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

// 使用mongoose访问MongoDB
mongoose.connect(conf.mongo_url, {
  useMongoClient: true,
  db: { 
    ative_parser: true, 
    safe: true 
  },
  server : { 
    socketOptions : { 
      keepAlive: 1 
    } 
  }
});
const mdb = mongoose.connection;
// 连接断开后重连
mdb.on('error', (err: any) => {
  logger.error('[DB ERROR]: mongoose db error:%s', err);
});
mdb.on('open',  (err: any) => {
  logger.info("mongoose连接DB成功...");
});
mdb.on('close', () => {
  logger.info('connection closed, should will reconnect soon');
});
export const connecting = mdb;
export function info() {
  logger.info('mongo db collections:' + conf.mongo_url);
}





