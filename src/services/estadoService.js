import sequelize from "../config/database.js";

export class EstadoService {
  
  async createEstado(statusData) {
    try {

      const [result] = await sequelize.query(
        "EXEC sp_estado_insertar @Nombre=:nombre",
        {
          replacements: {
            nombre: statusData.estadoNombre,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al crear estado: ${error.message}`);
    }
  }

  async updateEstado(statusData) {
    try {

      const [result] = await sequelize.query(
        "EXEC sp_estado_actualizar @EstadoID=:estadoID, @Nombre=:nombre",
        {
          replacements: {
            estadoID: statusData.estadoID,
            nombre: statusData.estadoNombre
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al actualizar estado: ${error.message}`);
    }
  }

  async eliminarEstado(statusParams) {
    try {
      let pEstadoID = statusParams.id
      const [result] = await sequelize.query(
        "EXEC sp_estado_eliminar @EstadoID=:estadoID",
        {
          replacements: {
            estadoID: pEstadoID,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al eliminar estado: ${error.message}`);
    }
  }

  async getEstados() {
    try {
      const productos = await sequelize.query("SELECT * FROM dbo.Estado", {
        type: sequelize.QueryTypes.SELECT,
      });
      console.log(productos);
      return productos;
    } catch (error) {
      throw new Error(`Error al obtener estados: ${error.message}`);
    }
  }

  async getEstadoFiltrado(statusParams) {
    try {
      const filtros = {};
      filtros.EstadoID = statusParams.id

      let query = "SELECT * FROM dbo.Estado WHERE 1=1";
      const replacements = {};

      if (filtros.EstadoID) {
        query += " AND EstadoID = :estadoID";
        replacements.estadoID = filtros.EstadoID;
      }

      const productos = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      });
      return productos;

    } catch (error) {
      throw new Error(`Error al obtener estado: ${error.message}`);
    }
  }
}
