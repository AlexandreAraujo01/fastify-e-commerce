import type { HashHelper } from "./hash-helper";

export class FakeHashHelper implements HashHelper {
	async hash(raw: string): Promise<string> {
		return `${raw}-hashed`;
	}
	async compare(hash: string, raw: string): Promise<boolean> {
		const normalized = hash.replace("-hashed", "");

		if (normalized === raw) {
			return true;
		}
		return false;
	}
}
