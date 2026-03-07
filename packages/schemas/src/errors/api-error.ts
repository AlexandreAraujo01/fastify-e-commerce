export interface IAppError {
	statusCode: number;
	message: string;
}

export abstract class AppError extends Error implements IAppError {
	constructor(
		public readonly message: string,
		public readonly statusCode: number = 400,
	) {
		super(message);
		// Garante que o nome do erro na stack trace seja o da classe filha
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}
