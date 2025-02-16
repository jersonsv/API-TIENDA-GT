import sequelize from "../config/database.js";

export class ProductService {
  async createProduct(productData) {
    try {
      // Convertir la imagen Base64 a un arreglo de bytes
      const fotoBuffer = Buffer.from(productData.productFoto, "base64");

      const [result] = await sequelize.query(
        "EXEC sp_producto_insertar @CategoriaProductoID=:categoriaId, @UsuarioID=:usuarioId, @Nombre=:nombre, @Marca=:marca, @Codigo=:codigo, @Stock=:stock, @Precio=:precio, @Foto=:foto",
        {
          replacements: {
            categoriaId: productData.productCategoriaID,
            usuarioId: productData.usuarioID,
            nombre: productData.productName,
            marca: productData.productMarca,
            codigo: productData.productCodigo,
            stock: productData.productStock,
            precio: productData.productPrecio,
            foto: fotoBuffer,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  async updateProduct(productData) {
    try {
      // Convertir la imagen Base64 a un arreglo de bytes
      const fotoBuffer = Buffer.from(productData.productFoto, "base64");

      const [result] = await sequelize.query(
        "EXEC sp_producto_actualizar @ProductoID=:productID, @CategoriaProductoID=:categoriaId, @UsuarioID=:usuarioId, @Nombre=:nombre, @Marca=:marca, @Codigo=:codigo, @Stock=:stock, @Precio=:precio, @Foto=:foto",
        {
          replacements: {
            productID: productData.productID,
            categoriaId: productData.productCategoriaID,
            usuarioId: productData.usuarioID,
            nombre: productData.productName,
            marca: productData.productMarca,
            codigo: productData.productCodigo,
            stock: productData.productStock,
            precio: productData.productPrecio,
            foto: fotoBuffer,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  }

  async desactiveProduct(productData) {
    try {
      const [result] = await sequelize.query(
        "EXEC sp_producto_desactivar @ProductoID=:productID, @EstadoID=:estadoID",
        {
          replacements: {
            productID: productData.productID,
            estadoID: productData.estadoID,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  }

  async getProductosActivos() {
    try {
      const productos = await sequelize.query(`SELECT p.ProductoID, c.Nombre AS  Categoria, p.Nombre, p.Marca, p.Codigo, p.Stock, p.EstadoID, Precio, Foto FROM ProductoActivo p
INNER JOIN CategoriaProducto c ON p.CategoriaProductoID = c.CategoriaProductoID`, {
        type: sequelize.QueryTypes.SELECT,
      });

    // Convertir las imágenes de buffer (varbinary) a Base64
    const productosConImagenes = productos.map((producto) => {
      if (producto.Foto) {
        producto.Foto = producto.Foto.toString("base64"); // Convertir buffer a Base64
      }
      return producto;
    });

      return productosConImagenes;
    } catch (error) {
      throw new Error(`Error al obtener productos activos: ${error.message}`);
    }
  }

  /* Método con filtros para la vista */
  async getProductoActivoFiltrado(productoID) {
    try {
      const filtros = {};
      filtros.ProductoID = productoID
      console.log(productoID)
      console.log(filtros)

      let query = "SELECT * FROM ProductoActivo WHERE 1=1";
      const replacements = {};

      if (filtros.ProductoID) {
        query += " AND ProductoID = :productoID";
        replacements.productoID = filtros.ProductoID;
      }

      const productos = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      });

      // Convertir las imágenes de buffer (varbinary) a Base64
    const productoConImagene = productos.map((producto) => {
      if (producto.Foto) {
        producto.Foto = producto.Foto.toString("base64"); // Convertir buffer a Base64
      }
      return producto;
    });

    return productoConImagene;

    } catch (error) {
      throw new Error(`Error al obtener productos filtrados: ${error.message}`);
    }
  }
}
