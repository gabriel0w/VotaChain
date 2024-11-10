import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import UserService from './UserService';

class AuthService {

    static async login(email: string, password: string): Promise<string> {
        const user = await UserService.findUserByEmail(email);
        if (!user || !(await UserService.verifyPassword(password, user.password))) {
            throw new Error('Credenciais inválidas');
        }

        // Incluindo o authHash no payload do JWT
        return jwt.sign({ id: user.id, userHash : user.userHash }, 'secretKey', { expiresIn: '1h' });
    }
}

export default AuthService;
