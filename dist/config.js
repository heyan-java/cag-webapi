"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 开发状态配置文件
 */
const conf = {
    port: 80,
    // 当前系统运行级别 debug / release
    target: 'release',
    // 发布版时间戳，用于生成今天文件的文件名
    stamp: '1427387849970',
    // 静态内容大部分保存在cdn上
    mongo_url: "mongodb://localhost/cag",
    // 静态文件CDN
    cdn_url: 'https://cdns.ltfc.net',
    // 图片文件CDN
    media_url: 'http://cag.ltfc.net',
    // express_log
    express_log: 'default',
};
exports.default = conf;
//# sourceMappingURL=config.js.map