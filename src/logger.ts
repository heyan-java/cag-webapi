/**
 * logger untiltiy, 创建和配置 log
 */
import winston, { TransportInstance, LoggerInstance } from 'winston';
// import rotateFile from 'winston-daily-rotate-file';
import moment from 'moment';
import fs from 'fs';

// init log dir and conditions
interface LogCache {
    [propName: string]: LoggerInstance;
}
interface TransportCache {
    [propName: string]: TransportInstance[];
}

const transportCache: TransportCache = {};
const categoryLoggerCache: LogCache = {};
const baseDir = './log/';
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
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
export function getLogger(category: string = defaultCategory, name: string = defaultLoggerName): LoggerInstance {
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


function baseFormatter(info: any) {
    const category = (info.meta && info.meta.category) ? info.meta.category : 'ROOT';
    return `${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} ${info.level.toUpperCase()} [${category}] ${info.message}`;
};

function createTransports(name: string): TransportInstance[] {    
    return [
        new (winston.transports.Console)({
            level: defaultLevel,
            formatter: baseFormatter,
        }),
        // new winston.transports.DailyRotateFile({
        //     filename: baseDir + name + '.log',
        //     datePattern: '.yyyy-MM-dd',
        //     prepend: false,
        //     json: false,
        //     formatter : baseFormatter,
        //     level: defaultLevel,
        // })
    ];
}

/**
 * 创建 winston log, log 输出的所有消息都加上 category 标签
 * @param {string} category
 */
function createWinstonLogger(category: string, transports: TransportInstance[]): LoggerInstance {
    const winstonLogger = new (winston.Logger)({
        rewriters: [function (level, msg, meta) {
            if ( !meta ) {
                return { category : category };
            }
            meta.category = category;
            return meta;
        }],
        transports: transports
    });
    return winstonLogger;
}


// ============================= 下面是单元测试用的代码 ================================
const tester: TestDict = {
    test_multilog: function(argv: string[]) {
        const logger1 = getLogger("test1");
        logger1.info('this is info from logger1');
        const logger2 = getLogger("test2");
        logger2.info('this is info from logger2');
        const logger3 = getLogger("test3", "test-log");
        logger3.info('this is info from logger3');
        const rootlogger = getLogger();
        rootlogger.info('this is info from root');
    },

    test_loglevel: function(argv: string[]) {
        const infologger = new (winston.Logger)({
            level : 'info',   // the level options in logger construct only apply when transport.level is empty
            transports: [
                new (winston.transports.Console)({
                    level: "debug",
                    formatter: baseFormatter,
                })
            ]
        });
        infologger.debug("this is a debug log");
        infologger.info("this is a  info log");
    }
}

// 常规启动点代码
import { lunchCli } from "./utils";
lunchCli(__filename, tester, false);


