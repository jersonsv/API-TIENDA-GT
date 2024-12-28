import { AuthService } from '../services/authService.js';

export const validateToken = async (req, res, next) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ 
          message: 'No se proporcionó token de acceso' 
        });
      }
  
      const authService = new AuthService();
      const datosUsuario = authService.verifyToken(token);
      
      req.user = datosUsuario;
      next();
      
    } catch (error) {
      return res.status(401).json({ 
        message: 'Token inválido o expirado' 
      });
    }
  };