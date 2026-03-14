// vitest.config.ts (na raiz do projeto)
import { defineConfig } from "vitest/config";
import path from "node:path";
export default defineConfig({
	test: {
		// Substitui o defineWorkspace e unifica os projetos
		projects: ["./apps/*", "./packages/*"],
		coverage: {
			provider: "v8",
			enabled: true,
			// O json-summary é o que a Action do GitHub precisa para comentar no PR
			reporter: ["text", "json", "json-summary"],
			// Centraliza todos os relatórios na pasta coverage da raiz
			reportsDirectory: "./coverage",
		},
	},
});
