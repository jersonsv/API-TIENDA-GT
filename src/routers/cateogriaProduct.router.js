import Router from 'express';
import { CategoriaProductController } from '../controllers/categoriaProductController.js';

const categoriaRouter = Router()
const categoriaProductController = new CategoriaProductController();

categoriaRouter.get("/categoriaProducto", async (req, res) => categoriaProductController.getCategoriaProductosActivos(req,res));

categoriaRouter.get("/categoriaProducto/:id", async (req, res) => categoriaProductController.getCategoriaProductoActivoFiltrado(req,res));

categoriaRouter.post("/categoriaProducto", async (req, res) => categoriaProductController.createCategoriaProducto(req,res));

categoriaRouter.put("/categoriaProducto", async (req, res) => categoriaProductController.updateCategoriaProducto(req, res)); 

categoriaRouter.post("/products/eliminarCategoriaProducto", async (req, res) => categoriaProductController.desactiveCategoriaProducto(req, res));

export default categoriaRouter;