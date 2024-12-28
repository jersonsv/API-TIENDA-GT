import Router from 'express';
import { ProductController } from '../controllers/productController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const productRouter = Router()
const productController = new ProductController();

productRouter.get("/products", validateToken, async (req, res) => productController.getProductosActivos(req,res));

productRouter.get("/products/:id", validateToken, async (req, res) => productController.getProductoActivoFiltrado(req,res));

productRouter.post("/products", validateToken, async (req, res) => productController.createProduct(req,res));

productRouter.put("/products", validateToken, async (req, res) => productController.updateProduct(req, res)); 

productRouter.post("/products/eliminarproducto", validateToken, async (req, res) => productController.desactiveProduct(req, res));

export default productRouter;