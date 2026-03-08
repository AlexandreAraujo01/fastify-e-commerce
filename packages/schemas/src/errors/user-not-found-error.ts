import { AppError } from "./api-error";

export class UserNotFoundError extends AppError {
	constructor() {
		// 409 Conflict é o status HTTP semanticamente correto para este caso
		super("User not found!", 400);
	}
}
