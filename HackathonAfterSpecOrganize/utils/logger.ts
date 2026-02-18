export class Logger {
  static error(arg0: string) {
    throw new Error('Method not implemented.');
  }
  static log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}
