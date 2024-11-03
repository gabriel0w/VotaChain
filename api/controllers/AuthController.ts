import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

class AuthController {
    static async register(req: Request, res: Response) {
        const { email, password, cpf, nome } = req.body;
        try {
            const user = await UserService.createUser({ email, password, cpf, nome });
            res.status(201).json({ user });
        } catch (error) {
            const err = error as Error; 
            res.status(400).json({ error: err.message });
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const token = await AuthService.login(email, password);
            res.json({ token });
        } catch (error) {
            const err = error as Error; 
            res.status(401).json({ error: err.message });
        }
    }
}

export default AuthController;
