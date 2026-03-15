import type {
	CreateTaxonomieSchema,
	FindTaxonomieSchema,
	TaxonomieRepositorySchema,
	TaxonomieSchema,
} from "@fastify-e-commerce/schemas";
import { uuidv7 } from "uuidv7";

export class InMemoryTaxonomieRepository implements TaxonomieRepositorySchema {
	public taxonomies: Map<string, TaxonomieSchema> = new Map();

	async create(data: CreateTaxonomieSchema): Promise<TaxonomieSchema> {
		const uuid = uuidv7();
		const tax = { ...data, taxonomie_id: uuid };
		this.taxonomies.set(uuid, tax);
		return tax;
	}
	async find(data: FindTaxonomieSchema): Promise<TaxonomieSchema | null> {
		const alreadyExistsTax = this.taxonomies.entries().find(([id, tax]) => {
			return (
				tax.taxonomie_slug === data.taxonomie_slug || id === data.taxonomie_id
			);
		});
		if (!alreadyExistsTax) {
			return null;
		}
		const [_, tax] = alreadyExistsTax;
		return tax;
	}
}
