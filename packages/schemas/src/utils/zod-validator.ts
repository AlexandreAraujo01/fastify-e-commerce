import { left, right, type Either } from "@/either";
import type { ZodType } from "zod";

function zodValidator<T>(param: unknown, schema: ZodType<T>): Either<Error, T> {
	const result = schema.safeParse(param);
	if (!result.success) {
		console.log(result.error.message);
		return left(new Error("Error on input validation please check!"));
	}
	return right(result.data);
}

export default zodValidator;
