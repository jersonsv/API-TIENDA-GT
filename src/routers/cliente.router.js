import Router from 'express';
import { ClienteController } from '../controllers/clienteController.js';

const clienteRouter = Router()
const clienteController = new ClienteController();

clienteRouter.get("/cliente", async (req, res) => clienteController.getClientes(req,res));

clienteRouter.get("/cliente/:id", async (req, res) => clienteController.getClienteFiltrado(req,res));

clienteRouter.post("/cliente", async (req, res) => clienteController.createCliente(req,res));

clienteRouter.put("/cliente", async (req, res) => clienteController.updateCliente(req, res)); 

export default clienteRouter;