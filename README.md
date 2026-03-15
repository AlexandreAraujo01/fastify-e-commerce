🚀 Fastify E-commerce API

[!IMPORTANT]
🚧 Status: Arquitetura de Referência (Em Desenvolvimento)

Este projeto é um Estudo de Caso de Engenharia de Software. O objetivo principal é consolidar práticas avançadas de desenvolvimento, como TDD, Clean Architecture e Monorepo, servindo como um laboratório técnico e portfólio pessoal.

Nota: Por ser um projeto 100% didático, o foco está na qualidade do código e nas decisões arquiteturais, e não na viabilidade comercial imediata.


Este é um projeto de e-commerce de alta performance construído com uma arquitetura de monorepo, focado em escalabilidade, tipagem estrita e TDD (Test-Driven Development).
🛠️ Tech Stack

    Runtime: Node.js (v22+)

    Framework: Fastify (E-commerce focado em performance)

    Gerenciador de Pacotes: pnpm (Workspaces)

    Linguagem: TypeScript

    Validação: Zod (Garantindo a integridade dos schemas em todo o monorepo)

    Banco de Dados: Prisma ORM

🧪 Qualidade de Código e Ferramentas

O projeto utiliza o que há de mais moderno para manter a base de código limpa e segura:
TDD com Vitest

O desenvolvimento é guiado por testes. Utilizamos o Vitest para garantir que cada regra de negócio seja validada antes mesmo da implementação final. O pipeline de CI no GitHub Actions exige 100% de sucesso nos testes para permitir merges na branch dev.
Biome

Substituímos o combo ESLint/Prettier pelo Biome. Ele é responsável pelo linting e pela formatação do código de forma extremamente rápida, mantendo o padrão do projeto consistente sem perda de performance no desenvolvimento.
Zod Schemas

A verdade única dos dados. O Zod é utilizado para validar entradas de API, variáveis de ambiente e comunicações entre pacotes internos, garantindo que erros de tipagem sejam pegos em tempo de execução e compilação.
