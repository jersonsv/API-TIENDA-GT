import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION } from "../config/authConfig.js";
import sequelize from "../config/database.js";


export class AuthService {
  
    async login(credenciales) {
    try {
        const [resultado] = await sequelize.query(
            `SELECT 
              u.UsuarioID,
              u.RolID,
              u.CorreoElectronico,
              u.NombreCompleto,
              u.ClienteID,
              CASE 
                WHEN u.Constrasena = HASHBYTES('SHA2_256', CAST(:contrasena AS VARCHAR(MAX))) THEN 1
                ELSE 0
              END as contrasenaValida
            FROM dbo.Usuario u
            WHERE u.CorreoElectronico = :correo`,
            {
              replacements: {
                correo: credenciales.correo,
                contrasena: credenciales.contrasena
              },
              type: sequelize.QueryTypes.SELECT
            }
          );
    
          if (!resultado) {
            throw new Error('Usuario no encontrado');
          }
    
          if (!resultado.contrasenaValida) {
            throw new Error('Contraseña incorrecta');
          }

      const datosToken = {
        usuarioId: resultado.UsuarioID,
        rolId: resultado.RolID,
        correo: resultado.CorreoElectronico,
        nombreCompleto: resultado.NombreCompleto,
        clienteId: resultado.ClienteID
      };

      const token = jwt.sign(datosToken, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });

      return {
        usuario: datosToken,
        token,
      };
    } catch (error) {
      throw new Error(`Error en login: ${error.message}`);
    }
  }


  verifyToken(token) {
    try {
      const datosUsuario = jwt.verify(token, JWT_SECRET);
      return datosUsuario;
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }
}
