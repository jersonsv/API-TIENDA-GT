import Router from 'express';
import { EstadoController } from '../controllers/estadoController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const estadoRouter = Router()
const estadoController = new EstadoController();

estadoRouter.get("/estado", validateToken, async (req, res) => estadoController.getEstados(req,res));

estadoRouter.get("/estado/:id", validateToken, async (req, res) => estadoController.getEstadoFiltrado(req,res));

estadoRouter.post("/estado", validateToken, async (req, res) => estadoController.createEstado(req,res));

estadoRouter.put("/estado", validateToken, async (req, res) => estadoController.updateEstado(req, res)); 

estadoRouter.delete("/estado/:id", validateToken, async (req, res) => estadoController.eliminarEstado(req, res));

export default estadoRouter;