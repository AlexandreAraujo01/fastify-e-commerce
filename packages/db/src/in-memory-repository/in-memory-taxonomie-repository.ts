import type {
	CreateTaxonomieSchema,
	FindTaxonomieSchema,
	TaxonomieRepositorySchema,
	TaxonomieSchema,
} from "@fastify-e-commerce/schemas";
import { uuidv7 } from "uuidv7";

export class InMemoryTaxonomieRepository implements TaxonomieRepositorySchema {
	public taxonomies: Map<string, TaxonomieSchema> = new Map();

	async create(data: CreateTaxonomieSchema): Promise<TaxonomieSchema | Error> {
		const uuid = uuidv7();
		const alreadyExistsTax = await this.find({
			taxonomie_slug: data.taxonomie_slug,
		});
		if (alreadyExistsTax) {
			return new Error("Taxonomie Already Exists");
		}
		const tax = { ...data, taxonomie_id: uuid };
		this.taxonomies.set(uuid, tax);
		return tax;
	}
	async find(data: FindTaxonomieSchema): Promise<TaxonomieSchema | undefined> {
		const alreadyExistsTax = this.taxonomies.entries().find(([id, tax]) => {
			return (
				tax.taxonomie_slug === data.taxonomie_slug || id === data.taxonomie_id
			);
		});
		if (!alreadyExistsTax) {
			return alreadyExistsTax;
		}
		const [_, tax] = alreadyExistsTax;
		return tax;
	}
}
