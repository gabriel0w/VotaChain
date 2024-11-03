import express from 'express';
import authRoutes from './routes/authRoutes';
import { initializeDatabase } from './utils/database';

const app = express();
app.use(express.json());

// Inicializa o banco de dados SQLite
initializeDatabase();

// Rota de autenticação
app.use('/auth', authRoutes);

app.listen(3000, () => {
    console.log('API de autenticação rodando em http://localhost:3000');
});
