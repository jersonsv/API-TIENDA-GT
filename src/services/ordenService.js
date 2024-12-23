import sequelize from "../config/database.js";

export class OrdenService {

  async createOrden(ordenData) {
    try {
      const detalleOrdenJson = JSON.stringify(ordenData.detalles);
      console.log(detalleOrdenJson)

      const [result] = await sequelize.query(
        "EXEC sp_orden_insertar_v2 @UsuarioID=:usuarioId, @NombreCompleto=:nombreCompleto, @Direccion=:direccion, @Telefono=:telefono, @CorreoElectronico=:correoElectronico, @FechaEntrega=:fechaEntrega, @TotalOrden=:totalOrden, @Json_detalle_orden=:detalleOrdenJson",
        {
          replacements: {
            usuarioId: ordenData.usuarioID,
            nombreCompleto: ordenData.nombreCompleto,
            direccion: ordenData.direccion,
            telefono: ordenData.telefono,
            correoElectronico: ordenData.correoElectronico,
            fechaEntrega: ordenData.fechaEntrega,
            totalOrden: ordenData.totalOrden,
            detalleOrdenJson: detalleOrdenJson 
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  async updateOrden(ordenData) {
    try {
      const [result] = await sequelize.query(
        "EXEC sp_orden_actualizar @OrdenID=:ordenID, @UsuarioID=:usuarioId,@EstadoID=:estadoID, @NombreCompleto=:nombreCompleto, @Direccion=:direccion, @Telefono=:telefono, @CorreoElectronico=:correoElectronico, @FechaEntrega=:fechaEntrega",
        {
          replacements: {
            ordenID: ordenData.ordenID,
            usuarioId: ordenData.usuarioID,
            estadoID: ordenData.estadoID,
            nombreCompleto: ordenData.nombreCompleto,
            direccion: ordenData.direccion,
            codigo: ordenData.productCodigo,
            telefono: ordenData.telefono,
            correoElectronico: ordenData.correoElectronico,
            fechaEntrega: ordenData.fechaEntrega,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al actualizar orden: ${error.message}`);
    }
  }

  async getOrdenes() {
    try {
      const productos = await sequelize.query("SELECT * FROM dbo.Orden", {
        type: sequelize.QueryTypes.SELECT,
      });
      return productos;
    } catch (error) {
      throw new Error(`Error al obtener ordenes: ${error.message}`);
    }
  }

  async getOrdenFiltrado(ordenParams) {
    try {
      const filtros = {};
      filtros.OrdenID = ordenParams.id

      let query = "SELECT * FROM dbo.Orden WHERE 1=1";
      const replacements = {};

      if (filtros.OrdenID) {
        query += " AND OrdenID = :ordenID";
        replacements.ordenID = filtros.OrdenID;
      }

      const productos = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      });
      return productos;

    } catch (error) {
      throw new Error(`Error al obtener orden: ${error.message}`);
    }
  }

}
