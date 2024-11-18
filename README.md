
VotaChain

VotaChain é uma aplicação para um sistema de votação seguro e descentralizado. A aplicação utiliza um contrato inteligente em blockchain, provas de conhecimento zero (ZKP) geradas com a biblioteca Semaphore, e uma interface frontend construída em React. Os usuários podem configurar suas chaves de votação, gerar provas ZKP localmente e enviar votos para o contrato inteligente de forma segura.

---

### Estrutura do Projeto

```
/votachain
├── contracts/                      # Contrato inteligente em Solidity
│   └── Voting.sol                  # Contrato de votação
├── scripts/                        # Scripts de deploy e interação com o contrato
│   ├── deploy.ts                   # Script de deploy do contrato usando Hardhat
│   └── interact.ts                 # Script de interação com o contrato
├── api/                            # API para simular login e autenticação no gov.br 
├── client/                         # Interface frontend em React
│   ├── src/                        # Código-fonte do React
│   │   ├── components/             # Componentes reutilizáveis
│   │   ├── pages/                  # Páginas principais da aplicação
│   │   ├── App.tsx                 # Componente principal do React
│   │   ├── index.tsx               # Ponto de entrada da aplicação React
│   │   └── styles.css              # Estilos da aplicação React
│   └── package.json                # Configuração do Node.js e dependências do frontend
├── package.json                    # Configuração do Node.js e dependências do projeto
└── README.md                       # Documentação do projeto
```

---

### Descrição dos Arquivos

**contracts/**
- `Voting.sol`: Contrato inteligente em Solidity que gerencia o processo de votação, verifica os nullifiers para evitar votos duplicados e valida provas de conhecimento zero para garantir a autenticidade dos votos.

**scripts/**
- `deploy.ts`: Script para fazer o deploy do contrato inteligente na blockchain usando Hardhat.
- `interact.ts`: Script para realizar interações com o contrato, como verificar resultados e consultar o estado dos votos.

**client/**
- `components/`: Contém componentes reutilizáveis como formulários, botões e modais.
- `pages/`: Define as páginas principais do frontend, como "Configurar VotingKey", "Gerar Prova" e "Enviar Voto".
- `App.tsx`: Componente principal que configura as rotas e o layout da aplicação.
- `index.tsx`: Ponto de entrada do React, onde o ReactDOM renderiza a aplicação.
- `styles.css`: Define os estilos visuais da interface gráfica.

---

### Instalação

#### Pré-requisitos
- Node.js e npm instalados
- Dependências listadas no `package.json`
- Hardhat para deploy do contrato inteligente
- Biblioteca Semaphore para geração de provas ZKP

#### Passos de Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/votachain.git
cd votachain
```

2. Instale as dependências do projeto:

```bash
npm install
```

3. Configure o contrato inteligente:

Edite `scripts/deploy.ts` com os parâmetros desejados.

4. Execute o deploy:

```bash
npx hardhat run scripts/deploy.ts --network <sua-rede>
```

5. Inicie o frontend React:

```bash
cd client
npm install
npm start
```

---

### Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.
