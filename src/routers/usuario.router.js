import Router from 'express';
import { UsuarioController } from '../controllers/usuarioController.js';

const usuarioRouter = Router()
const usuarioController = new UsuarioController();

usuarioRouter.get("/usuario", async (req, res) => usuarioController.getUsuarioActivos(req,res));

usuarioRouter.get("/usuario/:id", async (req, res) => usuarioController.getUsuarioFiltrado(req,res));

usuarioRouter.post("/usuario", async (req, res) => usuarioController.createUsuario(req,res));

usuarioRouter.put("/usuario", async (req, res) => usuarioController.updateUsuario(req, res)); 

usuarioRouter.post("/usuario/eliminarUsuario", async (req, res) => usuarioController.desactiveUsuario(req, res));

export default usuarioRouter;