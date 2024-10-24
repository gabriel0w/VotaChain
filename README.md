# Voting DApp - Commit and Reveal

Este repositório contém um DApp de votação implementado em blockchain, com autenticação simulada via uma API "gov.br" e um sistema de votação baseado no mecanismo de **Commit and Reveal** para garantir a privacidade e integridade dos votos.

## Estrutura do Projeto

- **/api**: Simulação de uma API gov.br para autenticação do usuário.
- **/contracts**: Contratos inteligentes que gerenciam a lógica de votação.
- **/scripts**: Scripts de deploy e interação com os contratos usando Hardhat.
- **/test**: Testes automatizados para validar o comportamento dos contratos.
- **/client**: Frontend do DApp, integrando com MetaMask para autenticação e votação.

## Requisitos

- **Node.js** (v14 ou superior)
- **Hardhat** para compilação e deploy dos contratos
- **TypeScript**
- **MetaMask** para interação com o blockchain no frontend

## Instalação do Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/voting-dapp.git
   cd voting-dapp
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Compile o TypeScript:
   ```bash
   npx tsc
   ```

4. Inicie o Hardhat (configuração para a rede Polygon):
   ```bash
   npx hardhat node
   ```

5. Deploy dos contratos:
   ```bash
   npx hardhat run scripts/deploy.ts --network localhost
   ```

6. Inicie a API simulada do gov.br:
   ```bash
   cd api
   node server.js
   ```

## Estrutura de Diretórios

```plaintext
/voting-dapp
│
├── /api                   # Diretório para a API de autenticação simulada (gov.br)
│   └── server.ts          # Código da API de autenticação simulada em TypeScript
│
├── /contracts             # Diretório para os contratos inteligentes
│   └── Voting.sol         # Contrato inteligente de votação (commit and reveal)
│
├── /scripts               # Scripts para deploy, configuração e automação do Hardhat
│   └── deploy.ts          # Script de deploy dos contratos em TypeScript
│
├── /test                  # Testes automatizados
│   └── Voting.test.ts     # Testes para o contrato de votação em TypeScript
│
├── /client                # Diretório para o frontend do DApp (com integração MetaMask)
│   └── index.html         # Página inicial do frontend
│   └── app.ts             # Lógica de interação com MetaMask e contratos em TypeScript
│
├── tsconfig.json          # Arquivo de configuração do TypeScript
├── package.json           # Dependências do projeto
└── README.md              # Documentação do projeto (markdown)
```