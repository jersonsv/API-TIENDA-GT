import sequelize from "../config/database.js";

export class CategoriaProductService {
  
  async createCategoriaProducto(productData) {
    try {

      const [result] = await sequelize.query(
        "sp_categoria_producto_insertar @UsuarioID=:usuarioId, @Nombre=:nombre",
        {
          replacements: {
            usuarioId: productData.usuarioID,
            nombre: productData.nombre,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  async updateCategoriaProducto(productData) {
    try {

      const [result] = await sequelize.query(
        "EXEC sp_categoria_producto_actualizar @CategoriaProductoID=:categoriaProductoID, @UsuarioID=:usuarioId, @Nombre=:nombre",
        {
          replacements: {
            categoriaProductoID: productData.categoriaProductoID,
            usuarioId: productData.usuarioID,
            nombre: productData.categoriaProductoNombre
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al actualizar categoria de producto: ${error.message}`);
    }
  }

  async desactiveCategoriaProducto(productData) {
    try {
      const [result] = await sequelize.query(
        "EXEC sp_categoria_producto_desactivar @CategoriaProductoID=:categoriaProductoID, @EstadoID=:estadoID",
        {
          replacements: {
            categoriaProductoID: productData.categoriaProductoID,
            estadoID: productData.estadoID,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al eliminar categoria producto: ${error.message}`);
    }
  }

  async getCategoriaProductosActivos() {
    try {
      const productos = await sequelize.query(`SELECT c.CategoriaProductoID, c.UsuarioID, c.Nombre, c.EstadoID, e.Nombre Estado, c.FechaCreacion FROM dbo.CategoriaProducto  c
INNER JOIN dbo.Estado e ON c.EstadoID = e.EstadoID
WHERE c.EstadoID=1`, {
        type: sequelize.QueryTypes.SELECT,
      });
      console.log(productos);
      return productos;
    } catch (error) {
      throw new Error(`Error al obtener categoria de productos: ${error.message}`);
    }
  }

  // Método con filtros para la vista
  async getCategoriaProductoActivoFiltrado(categoriaProductoID) {
    try {
      const filtros = {};
      filtros.CategoriaProductoID = categoriaProductoID

      let query = "SELECT * FROM CategoriaProducto WHERE EstadoID=1";
      const replacements = {};

      if (filtros.CategoriaProductoID) {
        query += " AND CategoriaProductoID = :categoriaProductoID";
        replacements.categoriaProductoID = filtros.CategoriaProductoID;
      }

      const productos = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      });
      return productos;

    } catch (error) {
      throw new Error(`Error al obtener categoria de  producto  ${error.message}`);
    }
  }
}
