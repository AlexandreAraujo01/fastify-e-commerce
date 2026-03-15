export class ProductAlreadyExistsError extends Error {
	constructor(name: string) {
		super(`Product with name "${name}" already exists.`);
		this.name = "ProductAlreadyExistsError";
	}
}
