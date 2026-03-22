export class InvalidCredentialsError extends Error {
  constructor() {
    super(`Invalid Crdentials!`);
    this.name = "InvalidCredentialsError";
  }
}
