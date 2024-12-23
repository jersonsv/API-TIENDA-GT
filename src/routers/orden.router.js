import Router from 'express';
import { OrdenController } from '../controllers/ordenController.js';

const ordenRouter = Router()
const ordenController = new OrdenController();

ordenRouter.get("/orden", async (req, res) => ordenController.getOrdenes(req,res));

ordenRouter.get("/orden/:id", async (req, res) => ordenController.getOrdenFiltrado(req,res));

ordenRouter.post("/orden", async (req, res) => ordenController.createOrden(req,res));

ordenRouter.put("/orden", async (req, res) => ordenController.updateOrden(req, res)); 


export default ordenRouter;