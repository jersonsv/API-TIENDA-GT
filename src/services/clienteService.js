import sequelize from "../config/database.js";

export class ClienteService {
  
  async createCliente(clientData) {
    try {

      const [result] = await sequelize.query(
        "EXEC sp_cliente_insertar @RazonSocial=:razonSocial,@NombreComercial=:nombreComercial, @DireccionEntrega=:direccionEntrega,@Telefono=:telefono,@Email=:email",
        {
          replacements: {
            razonSocial: clientData.razonSocial,
            nombreComercial: clientData.nombreComercial,
            direccionEntrega: clientData.direccionEntrega,
            telefono: clientData.telefono,
            email: clientData.email,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al guardar cliente: ${error.message}`);
    }
  }

  async updateCliente(clientData) {
    try {

      const [result] = await sequelize.query(
        "EXEC sp_cliente_actualizar @ClienteID=:clienteID,@RazonSocial=:razonSocial,@NombreComercial=:nombreComercial, @DireccionEntrega=:direccionEntrega,@Telefono=:telefono,@Email=:email",
        {
          replacements: {
            clienteID: clientData.clienteID,
            razonSocial: clientData.razonSocial,
            nombreComercial: clientData.nombreComercial,
            direccionEntrega: clientData.direccionEntrega,
            telefono: clientData.telefono,
            email: clientData.email,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al actualizar estado: ${error.message}`);
    }
  }

  async getClientes() {
    try {
      const productos = await sequelize.query("SELECT * FROM dbo.Cliente", {
        type: sequelize.QueryTypes.SELECT,
      });
      return productos;
    } catch (error) {
      throw new Error(`Error al obtener clientes: ${error.message}`);
    }
  }

  async getClienteFiltrado(clientParams) {
    try {
      const filtros = {};
      filtros.ClienteID = clientParams.id

      let query = "SELECT * FROM dbo.Cliente WHERE 1=1";
      const replacements = {};

      if (filtros.ClienteID) {
        query += " AND ClienteID = :clienteID";
        replacements.clienteID = filtros.ClienteID;
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
