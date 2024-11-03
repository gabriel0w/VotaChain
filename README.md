 # Voting DApp Electron 
Esta é uma aplicação desktop para um sistema de votação seguro e descentralizado. A aplicação utiliza um contrato inteligente em blockchain, provas de conhecimento zero (ZKP) para autenticação, e uma interface desktop construída com Electron. O usuário pode configurar sua chave de votação, gerar provas ZKP localmente, e enviar seu voto para o contrato inteligente de forma segura.
 
 ## Estrutura do Projeto
 
 ```
 /voting-dapp-electron
 ├── circom/                         # Circuito ZKP e arquivos de configuração
 │   ├── authentication.circom       # Circuito Circom para geração da prova ZKP
 │   ├── build/                      # Arquivos compilados do circuito
 │   │   ├── authentication.r1cs     # Arquivo de restrições do circuito
 │   │   ├── authentication.wasm     # Arquivo WebAssembly para execução da prova
 │   │   ├── authentication.zkey     # Arquivo de configuração final da prova
 │   │   └── verification_key.json   # Chave de verificação para o contrato
 │   └── compile_circuit.sh          # Script para compilar o circuito
 ├── contracts/                      # Contrato inteligente em Solidity
 │   └── Voting.sol                  # Contrato de votação
 ├── scripts/                        # Scripts de deploy e interação com o contrato
 │   ├── deploy.ts                   # Script de deploy do contrato usando Hardhat
 │   └── interact.ts                 # Script de interação com o contrato
 ├── src/                            # Código-fonte principal
 │   ├── main.ts                     # Processo principal do Electron
 │   ├── preload.ts                  # Script de preload para comunicação segura
 │   ├── votingKey.ts                # Geração e armazenamento seguro da VotingKey
 │   ├── proofGenerator.ts           # Geração da prova ZKP e nullifier
 │   ├── contractInteraction.ts      # Interação com o contrato inteligente via Ethers.js
 │   └── config.ts                   # Configurações globais
 ├── public/                         # Interface do usuário
 │   ├── index.html                  # Arquivo HTML principal da interface
 │   ├── app.ts                      # Código frontend para manipulação da interface
 │   └── styles.css                  # Estilos para a interface gráfica
 ├── package.json                    # Configuração do Node.js e dependências do projeto
 └── README.md                       # Documentação do projeto
 ```
 
 ## Descrição dos Arquivos
 
 ### `circom/`
 - **authentication.circom**: Circuito Circom que define a lógica da prova de conhecimento zero.
 - **build/**: Arquivos gerados pelo compilador Circom para a execução e verificação da prova.
   - **authentication.r1cs**: Arquivo de restrições para o circuito.
   - **authentication.wasm**: Arquivo WebAssembly para execução da prova.
   - **authentication.zkey**: Arquivo de configuração final para gerar provas.
   - **verification_key.json**: Chave de verificação pública usada no contrato inteligente.
 - **compile_circuit.sh**: Script para compilar o circuito. Execute este script para gerar os arquivos `.r1cs`, `.wasm`, e `.zkey` necessários.
 
 ### `contracts/`
 - **Voting.sol**: Contrato inteligente em Solidity que gerencia o processo de votação, verifica os nullifiers para evitar votos duplicados e valida provas de conhecimento zero para garantir a autenticidade dos votos.
 
 ### `scripts/`
 - **deploy.ts**: Script para fazer o deploy do contrato inteligente na blockchain usando Hardhat.
 - **interact.ts**: Script para realizar interações com o contrato, como verificar resultados e consultar o estado dos votos.
 
 ### `src/`
 - **main.ts**: Arquivo principal do Electron. Cria a janela da aplicação e gerencia a comunicação entre o frontend e backend.
 - **preload.ts**: Script de preload que expõe funções seguras do backend para o frontend através de IPC (Inter-Process Communication).
 - **votingKey.ts**: Módulo responsável pela geração e armazenamento seguro da VotingKey usando um salt local.
 - **proofGenerator.ts**: Código para gerar a prova de conhecimento zero (ZKP) e o nullifier localmente, com base na VotingKey e na Merkle Root.
 - **contractInteraction.ts**: Funções para interação com o contrato inteligente, como envio de transações e registro do voto.
 - **config.ts**: Arquivo para configurações globais do projeto, como URLs de nós do blockchain e endereço do contrato.
 
 ### `public/`
 - **index.html**: Interface principal em HTML para o usuário interagir com o sistema de votação.
 - **app.ts**: Código frontend que manipula eventos da interface e comunica-se com o backend do Electron.
 - **styles.css**: Arquivo de estilos para a interface gráfica, definindo o layout e aparência da aplicação.
 
 ## Instalação
 
 ### Pré-requisitos
 - Node.js e npm instalados
 - Dependências listadas no `package.json`
 - Hardhat para deploy do contrato inteligente
 - Circom e SnarkJS para compilar e gerar provas ZKP
 
 ### Passos de Instalação
 
 1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/voting-dapp-electron.git
    cd voting-dapp-electron
    ```
 
 2. Instale as dependências do projeto:
    ```bash
    npm install
    ```
 
 3. Compile o circuito Circom:
    ```bash
    cd circom
    ./compile_circuit.sh
    ```
 
 4. Configure o contrato inteligente:
    - Edite `scripts/deploy.ts` com os parâmetros desejados.
    - Execute o deploy:
    ```bash
    npx hardhat run scripts/deploy.ts --network <sua-rede>
    ```
 
 5. Inicie a aplicação Electron:
    ```bash
    npm start
    ```
 
 ## Uso
 
 1. **Configuração da VotingKey**: Abra a aplicação e insira seu ID de votação para gerar e configurar a VotingKey.
 2. **Geração de Prova e Nullifier**: Use a opção "Gerar Prova" para criar uma prova ZKP e o nullifier localmente.
 3. **Envio do Voto**: Após a geração da prova, envie seu voto para o contrato inteligente diretamente pela interface.
 
 ## Licença
 
 Este projeto é distribuído sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.
