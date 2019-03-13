/**
 * 测试函数集合
 */
interface TestDict {
  [propName: string]: (argv: string[]) => void;
}
