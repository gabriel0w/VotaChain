pragma circom 2.0.0;

include "pedersen.circom"; // Inclui o Pedersen Hash

// Template para o hash de dois elementos usando Pedersen
template HashLeftRight() {
    signal input left;
    signal input right;
    signal output hash;

    // Usa Pedersen para combinar left e right
    component hasher = Pedersen(2);  // 2 entradas
    hasher.in[0] <== left;
    hasher.in[1] <== right;
    hash <== hasher.out[0];
}

// Template para um nível da árvore de Merkle
template MerkleTreeLevel(leafCount, nodeCount) {
    signal input leaves[leafCount];
    signal output nodes[nodeCount];

    // Verificação de quantidade de folhas e nós
    leafCount === 2 * nodeCount;

    component hashers[nodeCount];

    var i = 0;
    var n = 0;
    while (i < nodeCount) {
        hashers[i] = HashLeftRight();
        hashers[i].left <== leaves[n];
        hashers[i].right <== leaves[n + 1];
        nodes[i] <== hashers[i].hash;

        i++;
        n += 2;
    }
}

// Template para construir a árvore de Merkle
template MerkleTree(levels) {
    signal input leaves[2**levels];
    signal output root;

    component merkleLevels[levels];

    // Itera sobre cada nível da árvore
    var i = 0;
    while (i < levels) {
        var leafCount = 2**(levels - i);
        var nodeCount = 2**(levels - i - 1);

        merkleLevels[i] = MerkleTreeLevel(leafCount, nodeCount);

        var n = 0;
        while (n < leafCount) {
            merkleLevels[i].leaves[n] <== i == 0 ? leaves[n] : merkleLevels[i - 1].nodes[n];
            n++;
        }
        i++;
    }

    root <== merkleLevels[levels - 1].nodes[0];
}

// Template para verificar se uma árvore de Merkle corresponde à raiz fornecida
template MerkleTreeChecker(levels) {
    signal input leaves[2**levels];
    signal input root;
    signal output isMember;

    component tree = MerkleTree(levels);
    tree.leaves <== leaves;

    // Usa o componente IsEqual para verificar se a raiz calculada é igual à raiz fornecida
    component equalCheck = IsEqual();
    equalCheck.in[0] <== tree.root;
    equalCheck.in[1] <== root;
    isMember <== equalCheck.out;
}

// Template para gerar o VotingID a partir da VotingKey usando Pedersen Hash
template GenerateVotingID() {
    signal input votingKey;
    signal output votingID;

    // Usa Pedersen Hash para gerar um VotingID único a partir da VotingKey
    component hasher = Pedersen(1);  // 1 entrada
    hasher.in[0] <== votingKey;
    votingID <== hasher.out[0];
}

// Circuito principal para verificar a elegibilidade do votante usando Merkle Tree
template VotingEligibilityChecker(levels) {
    signal input votingKey;              // Chave de votação do usuário (privada)
    signal input leaves[2**levels];      // Todas as folhas da árvore de Merkle (VotingIDs válidos)
    signal input root;                   // Raiz da árvore de Merkle (MerkleTreeRoot)

    signal output isEligible;            // 1 se o votante for elegível, 0 caso contrário

    // Gera o VotingID a partir da VotingKey
    component genVotingID = GenerateVotingID();
    genVotingID.votingKey <== votingKey;

    // Verifica a árvore usando MerkleTreeChecker
    component treeChecker = MerkleTreeChecker(levels);
    treeChecker.leaves <== leaves;
    treeChecker.root <== root;

    // Define isEligible com o resultado da verificação da árvore
    isEligible <== treeChecker.isMember;
}

component main = VotingEligibilityChecker(2); // Exemplo com uma árvore de Merkle de profundidade 2
