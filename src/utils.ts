import { isme } from './sharepage.js';
/**
 * 通过命令行启动函数,
 * @param filename 模块名称
 */
export function lunchCli(moduleName: string, tester: TestDict, needDB: boolean) {
  if (needDB) {
    const info = require('./mongo').info;
    info();
  }
  
  if (isme(moduleName)) {
    if (process.argv.length > 2) {
      const testfn = process.argv[2];
      console.log("run test:%s", testfn);

      const targetFn = tester[testfn];
      if (targetFn) {
        targetFn(["test"]);
      } else {
        console.log(`[ WARING ] invalide command:${testfn}\nplease call with:` + moduleName + ' ' + Object.keys(tester).join('|'));
      }
    } else {
      console.log(moduleName + ' ' + Object.keys(tester).join('|'));
    }
  }
}


