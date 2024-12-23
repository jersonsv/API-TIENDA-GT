import express from 'express';
import { AuthService } from '../services/authService.js';

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

export default authRouter;