import express from 'express';
import { AuthService } from '../services/authService.js';


export class AuthController{
    constructor() {
        this.authService = new AuthService();
    }

    async createToken(req, res){
        try{
            const { correo, contrasena} = req.body;
            const result = await authService.login({ correo, contrasena });
            return res.status(200).json({
                ok: true,
                status: 200,
                message: 'Usuario logueado',
                data: result            
            })
            res.json(result);

        } catch(error){
            return res.status(500).json({
                ok: false,
                status: 500,
                message: error.message
            })

        }

    }
}


const authRouter = express.Router();
const authService = new AuthService();

authRouter.post('/login', async (req, res) => {
  try {
    const { correo, contrasena} = req.body;
    const result = await authService.login({ correo, contrasena });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
