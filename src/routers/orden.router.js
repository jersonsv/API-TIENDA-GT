import Router from 'express';
import { OrdenController } from '../controllers/ordenController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const ordenRouter = Router()
const ordenController = new OrdenController();

ordenRouter.get("/orden", validateToken, async (req, res) => ordenController.getOrdenes(req,res));

ordenRouter.get("/orden/:id", validateToken, async (req, res) => ordenController.getOrdenFiltrado(req,res));

ordenRouter.post("/orden", validateToken, async (req, res) => ordenController.createOrden(req,res));

ordenRouter.put("/orden", validateToken, async (req, res) => ordenController.updateOrden(req, res));

ordenRouter.put("/orden/cambiarEstado", validateToken, async (req, res) => ordenController.updateStateOrden(req, res));


export default ordenRouter;