import Router from 'express';
import { CategoriaProductController } from '../controllers/categoriaProductController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const categoriaRouter = Router()
const categoriaProductController = new CategoriaProductController();

categoriaRouter.get("/categoriaProducto", validateToken, async (req, res) => categoriaProductController.getCategoriaProductosActivos(req,res));

categoriaRouter.get("/categoriaProducto/:id", validateToken, async (req, res) => categoriaProductController.getCategoriaProductoActivoFiltrado(req,res));

categoriaRouter.post("/categoriaProducto", validateToken, async (req, res) => categoriaProductController.createCategoriaProducto(req,res));

categoriaRouter.put("/categoriaProducto", validateToken, async (req, res) => categoriaProductController.updateCategoriaProducto(req, res)); 

categoriaRouter.post("/products/eliminarCategoriaProducto", validateToken, async (req, res) => categoriaProductController.desactiveCategoriaProducto(req, res));

export default categoriaRouter;