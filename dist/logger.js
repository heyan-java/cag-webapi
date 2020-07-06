"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * logger untiltiy, 创建和配置 log
 */
const winston_1 = __importDefault(require("winston"));
// import rotateFile from 'winston-daily-rotate-file';
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const transportCache = {};
const categoryLoggerCache = {};
const baseDir = './log/';
if (!fs_1.default.existsSync(baseDir)) {
    fs_1.default.mkdirSync(baseDir);
}
// 基本配置
const defaultCategory = 'ROOT';
const defaultLoggerName = 'cag-imgtools';
const defaultLevel = 'info';
/**
 * 获取一个 Log 对象，并设置该对象的 category
 *
 * @param {string} category log category, 用于标记该行 log 是由哪个模块打印的，如果为空，default 值是“ROOT”，category 会输出到 log 文件中
 *      参考 baseFormatter() 函数的实现。
 * @param {string} name log 名称，每个不同的名称对应了一个单独的 log 文件，如果不输入名称，代表使用 drc-console log
 */
function getLogger(category = defaultCategory, name = defaultLoggerName) {
    if (!transportCache[name]) {
        transportCache[name] = createTransports(name);
    }
    const categoryLogName = name + '.' + category;
    if (!categoryLoggerCache[categoryLogName]) {
        categoryLoggerCache[categoryLogName] = createWinstonLogger(category, transportCache[name]);
    }
    return categoryLoggerCache[categoryLogName];
}
exports.getLogger = getLogger;
exports.getLogger = getLogger;
function baseFormatter(info) {
    const category = (info.meta && info.meta.category) ? info.meta.category : 'ROOT';
    return `${moment_1.default().format('YYYY-MM-DD HH:mm:ss.SSS')} ${info.level.toUpperCase()} [${category}] ${info.message}`;
}
;
function createTransports(name) {
    return [
        new (winston_1.default.transports.Console)({
            level: defaultLevel,
            formatter: baseFormatter,
        }),
    ];
}
/**
 * 创建 winston log, log 输出的所有消息都加上 category 标签
 * @param {string} category
 */
function createWinstonLogger(category, transports) {
    const winstonLogger = new (winston_1.default.Logger)({
        rewriters: [function (level, msg, meta) {
                if (!meta) {
                    return { category: category };
                }
                meta.category = category;
                return meta;
            }],
        transports: transports
    });
    return winstonLogger;
}
// ============================= 下面是单元测试用的代码 ================================
const tester = {
    test_multilog: function (argv) {
        const logger1 = getLogger("test1");
        logger1.info('this is info from logger1');
        const logger2 = getLogger("test2");
        logger2.info('this is info from logger2');
        const logger3 = getLogger("test3", "test-log");
        logger3.info('this is info from logger3');
        const rootlogger = getLogger();
        rootlogger.info('this is info from root');
    },
    test_loglevel: function (argv) {
        const infologger = new (winston_1.default.Logger)({
            level: 'info',
            transports: [
                new (winston_1.default.transports.Console)({
                    level: 'debug',
                    formatter: baseFormatter,
                })
            ]
        });
        infologger.debug('this is a debug log');
        infologger.info('this is a  info log');
    },
};
// 常规启动点代码
const utils_1 = require("./utils");
utils_1.lunchCli(__filename, tester, false);
//# sourceMappingURL=logger.js.map