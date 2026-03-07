export abstract class HashHelper {
	abstract hash(raw: string): Promise<string>;

	abstract compare(hash: string, raw: string): Promise<boolean>;
}
