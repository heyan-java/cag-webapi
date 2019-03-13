import * as path from 'path';

/**
 * 判断某个 nodejs file，是否是当前进程的启动文件
 * @param filename 当前运行的文件名
 */
export function isme(filename: string) {
  const base = path.basename(filename);
  return process.argv[1].indexOf(base) > 0 ;
}

/**
 * 通过命令行启动函数
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
      console.log('run test:%s', testfn);

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


