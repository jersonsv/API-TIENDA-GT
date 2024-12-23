import { EstadoService } from '../services/estadoService.js';

export class EstadoController {
    constructor() {
        this.estadoService = new EstadoService();
    }

    async createEstado(req, res) {
        try {
            const product = await this.estadoService.createEstado(req.body);
            
            return res.status(201).json({
                ok: true,
                status: 201,
                message: "Estado creado",
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

    async updateEstado(req, res) {
        try {
            const product = await this.estadoService.updateEstado(req.body);
            
            return res.status(200).json({
                ok: true,
                status: 200,
                message: "Estado modificado",
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

    async eliminarEstado(req, res) {
        try {
            const product = await this.estadoService.eliminarEstado(req.params);
            
            return res.status(200).json({
                ok: true,
                status: 204,
                message: "Estado eliminado",
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

    async getEstados(req, res) {
        try {
            const estados = await this.estadoService.getEstados();
            return res.status(200).json({
                ok: true,
                data: estados
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: error.message
            });
        }
    }

    async getEstadoFiltrado(req, res) {
        try {
            const estado = await this.estadoService.getEstadoFiltrado(req.params);
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