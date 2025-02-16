import sequelize from "../config/database.js";

export class UsuarioService {
  
  async createUsuario(userData) {
    try {

      const [result] = await sequelize.query(
        "EXEC sp_usuario_insertar @RolID=:rolID,@CorreoElectronico=:correoElectronico,@NombreCompleto=:nombreCompleto,@Contrasena=:contrasena,@Telefono=:telefono,@FechaNacimiento=:fechaNacimiento,@ClienteID=:clienteID",
        {
          replacements: {
            rolID: userData.rolID,
            correoElectronico: userData.correoElectronico,
            nombreCompleto: userData.nombreCompleto,
            contrasena: userData.contrasena,
            telefono: userData.telefono,
            fechaNacimiento: userData.fechaNacimiento,
            clienteID: userData.clienteID,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }

  async updateUsuario(userData) {
    try {

      const [result] = await sequelize.query(
        "EXEC sp_usuario_actualizar @UsuarioID=:usuarioID,@RolID=:rolID,@CorreoElectronico=:correoElectronico,@NombreCompleto=:nombreCompleto,@Contrasena=:contrasena,@Telefono=:telefono,@FechaNacimiento=:fechaNacimiento",
        {
          replacements: {
            usuarioID: userData.usuarioID,
            rolID: userData.rolID,
            correoElectronico: userData.correoElectronico,
            nombreCompleto: userData.nombreCompleto,
            contrasena: userData.contrasena,
            telefono: userData.telefono,
            fechaNacimiento: userData.fechaNacimiento
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }

  async desactiveUsuario(userData) {
    try {
      const [result] = await sequelize.query(
        "EXEC sp_usuario_desactivar @UsuarioID=:usuarioID, @EstadoID=:estadoID",
        {
          replacements: {
            usuarioID: userData.usuarioID,
            estadoID: userData.estadoID,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }

  async getUsuariosActivos() {
    try {
      const productos = await sequelize.query(`SELECT u.UsuarioID, u.NombreCompleto, u.RolID, r.Nombre Rol, u.EstadoID, u.CorreoElectronico,u.Telefono, u.FechaNacimiento FROM dbo.Usuario u
INNER JOIN dbo.Rol r ON r.RolID = r.RolID
WHERE u.EstadoID=1`
     , {
        type: sequelize.QueryTypes.SELECT,
      });
      return productos;
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  }

  async getUsuarioFiltrado(userParams) {
    try {
      const filtros = {};
      filtros.UsuarioID = userParams.id

      let query = `SELECT u.UsuarioID, u.NombreCompleto, u.RolID, r.Nombre Rol, u.EstadoID, u.CorreoElectronico,u.Telefono, u.FechaNacimiento FROM dbo.Usuario u
INNER JOIN dbo.Rol r ON r.RolID = r.RolID
WHERE u.EstadoID=1`;
      const replacements = {};

      if (filtros.UsuarioID) {
        query += " AND UsuarioID = :usuarioID";
        replacements.usuarioID = filtros.UsuarioID;
      }

      const productos = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      });
      return productos;

    } catch (error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }
}
