import Router from 'express';
import { EstadoController } from '../controllers/estadoController.js';

const estadoRouter = Router()
const estadoController = new EstadoController();

estadoRouter.get("/estado", async (req, res) => estadoController.getEstados(req,res));

estadoRouter.get("/estado/:id", async (req, res) => estadoController.getEstadoFiltrado(req,res));

estadoRouter.post("/estado", async (req, res) => estadoController.createEstado(req,res));

estadoRouter.put("/estado", async (req, res) => estadoController.updateEstado(req, res)); 

estadoRouter.delete("/estado/:id", async (req, res) => estadoController.eliminarEstado(req, res));

export default estadoRouter;