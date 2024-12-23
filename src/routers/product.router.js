import Router from 'express';
import { ProductController } from '../controllers/productController.js';

const productRouter = Router()
const productController = new ProductController();

productRouter.get("/products", async (req, res) => productController.getProductosActivos(req,res));

productRouter.get("/products/:id", async (req, res) => productController.getProductoActivoFiltrado(req,res));

productRouter.post("/products", async (req, res) => productController.createProduct(req,res));

productRouter.put("/products", async (req, res) => productController.updateProduct(req, res)); 

productRouter.post("/products/eliminarproducto", async (req, res) => productController.desactiveProduct(req, res));

export default productRouter;