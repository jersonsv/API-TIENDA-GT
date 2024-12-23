import { UsuarioService } from '../services/usuarioService.js';

export class UsuarioController {
    constructor() {
        this.usuarioService = new UsuarioService();
    }

    async createUsuario(req, res) {
        try {
            const product = await this.usuarioService.createUsuario(req.body);
            
            return res.status(201).json({
                ok: true,
                status: 201,
                message: "Usuario guardado",
                data: product
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                status: 500,
                message: error.message
            });
        }
    }

    async updateUsuario(req, res) {
        try {
            const product = await this.usuarioService.updateUsuario(req.body);
            
            return res.status(200).json({
                ok: true,
                status: 200,
                message: "Usuario editado",
                data: product
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                status: 500,
                message: error.message
            });
        }
    }

    async desactiveUsuario(req, res) {
        try {
            const user = await this.usuarioService.desactiveUsuario(req.body);
            
            return res.status(200).json({
                ok: true,
                status: 204,
                message: "Usuario eliminado",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                status: 500,
                message: error.message
            });
        }
    }

    async getUsuarioActivos(req, res) {
        try {
            const usuarios = await this.usuarioService.getUsuariosActivos();
            return res.status(200).json({
                ok: true,
                data: usuarios
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: error.message
            });
        }
    }

    async getUsuarioFiltrado(req, res) {
        try {
            const estado = await this.usuarioService.getUsuarioFiltrado(req.params);
            return res.status(200).json({
                ok: true,
                data: estado
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: error.message
            });
        }
    }
}