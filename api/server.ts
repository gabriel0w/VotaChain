import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());

// Simulação da API gov.br
app.post('/auth', (req, res) => {
    const { cpf, nome } = req.body;

    // Gera um hash simples para simular a autenticação
    const authHash = crypto.createHash('sha256').update(cpf + nome).digest('hex');

    res.json({ authHash });
});

app.listen(3000, () => {
    console.log('API de autenticação rodando em http://localhost:3000');
});
