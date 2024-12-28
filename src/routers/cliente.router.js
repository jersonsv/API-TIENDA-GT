import Router from 'express';
import { ClienteController } from '../controllers/clienteController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const clienteRouter = Router()
const clienteController = new ClienteController();

clienteRouter.get("/cliente", validateToken, async (req, res) => clienteController.getClientes(req,res));

clienteRouter.get("/cliente/:id", validateToken, async (req, res) => clienteController.getClienteFiltrado(req,res));

clienteRouter.post("/cliente", validateToken, async (req, res) => clienteController.createCliente(req,res));

clienteRouter.put("/cliente", validateToken, async (req, res) => clienteController.updateCliente(req, res)); 

export default clienteRouter;