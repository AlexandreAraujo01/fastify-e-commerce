import { AppError } from "./api-error";

export class ProductNotFoundError extends AppError {
	constructor() {
		super("User not found!", 400);
	}
}
