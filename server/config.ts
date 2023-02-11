export class Env {
  static server = {
    PORT: 4000,
  };
  static isDevelopment = (): boolean => {
    return process.env.NODE_ENV === 'development';
  };
  static isProduction = (): boolean => {
    return process.env.NODE_ENV === 'production';
  };
}
