import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let dbInstance: Database;

export const initializeDatabase = async () => {
    const db = await open({
        filename: './database.sqlite', // Caminho para o arquivo do banco de dados
        driver: sqlite3.Database
    });

    // Cria a tabela de usuários, se não existir
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            cpf TEXT NOT NULL,
            nome TEXT NOT NULL
        )
    `);

    await db.close();
};

export const getDatabase = async (): Promise<Database> => {
    return open({
        filename: './database.sqlite', // Define o arquivo de banco de dados
        driver: sqlite3.Database
    });
};
