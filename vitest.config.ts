import { mergeConfig } from "vitest/config";
import baseConfig from "./vitest.config.base";

export default mergeConfig(baseConfig, {
	
  test: {
	projects: ["./apps/*", "./packages/*"], // O mapa
    environment: "node",
    // Configurações específicas como setupFiles para o banco de dados
  },
});
