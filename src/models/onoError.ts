export default class OnoError extends Error {
  public innerError: any;

  constructor(message: string, innerError?: any) {
    super(message);
    this.innerError = innerError;
  }
}
