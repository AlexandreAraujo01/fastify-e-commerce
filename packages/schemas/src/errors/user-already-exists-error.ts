import { AppError } from "./api-error";

export class UserAlreadyExistsError extends AppError {
	constructor() {
		// 409 Conflict é o status HTTP semanticamente correto para este caso
		super("User Already Exists!", 409);
	}
}
