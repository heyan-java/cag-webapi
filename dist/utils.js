"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharepage_js_1 = require("./sharepage.js");
/**
 * 通过命令行启动函数,
 * @param filename 模块名称
 */
function lunchCli(moduleName, tester, needDB) {
    if (needDB) {
        const info = require('./mongo').info;
        info();
    }
    if (sharepage_js_1.isme(moduleName)) {
        if (process.argv.length > 2) {
            const testfn = process.argv[2];
            console.log("run test:%s", testfn);
            const targetFn = tester[testfn];
            if (targetFn) {
                targetFn(["test"]);
            }
            else {
                console.log(`[ WARING ] invalide command:${testfn}\nplease call with:` + moduleName + ' ' + Object.keys(tester).join('|'));
            }
        }
        else {
            console.log(moduleName + ' ' + Object.keys(tester).join('|'));
        }
    }
}
exports.lunchCli = lunchCli;
//# sourceMappingURL=utils.js.map