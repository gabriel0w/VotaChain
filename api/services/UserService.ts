import bcrypt from 'bcrypt';
import { Database } from 'sqlite';
import { getDatabase } from '../utils/database';
import crypto from 'crypto';

interface User {
    id?: number;
    email: string;
    password: string;
    cpf: string;
    nome: string;
    userHash? : string;
}

class UserService {
    static async createUser(user: User): Promise<User> {
        const db: Database = await getDatabase();
        const { email, password, cpf, nome } = user;

        // Criptografa a senha com bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const userHash = crypto.createHash('sha256').update(email + cpf).digest('hex');

        await db.run(
            'INSERT INTO users (email, password, cpf, nome, user_hash) VALUES (?, ?, ?, ?, ?)',
            [email, hashedPassword, cpf, nome, userHash]
        );

        return { ...user, password: hashedPassword };
    }

    static async findUserByEmail(email: string): Promise<User | undefined> {
        const db: Database = await getDatabase();
        return db.get<User>('SELECT * FROM users WHERE email = ?', [email]);
    }

    static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}

export default UserService;
