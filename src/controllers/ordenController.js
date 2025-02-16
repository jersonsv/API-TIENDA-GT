import { OrdenService } from '../services/ordenService.js';

export class OrdenController {
    constructor() {
        this.ordenService = new OrdenService();
    }

    async createOrden(req, res) {
        try {
            const product = await this.ordenService.createOrden(req.body);
            
            return res.status(201).json({
                ok: true,
                status: 201,
                message: "Orden guardado",
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

    async updateOrden(req, res) {
        try {
            const product = await this.ordenService.updateOrden(req.body);
            
            return res.status(200).json({
                ok: true,
                status: 200,
                message: "Orden modificado",
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

    async updateStateOrden(req, res) {
        try {
            const product = await this.ordenService.updateStateOrden(req.body);
            
            return res.status(200).json({
                ok: true,
                status: 200,
                message: "Estado de Orden modificado",
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

    async getOrdenes(req, res) {
        try {
            const ordenes = await this.ordenService.getOrdenes();
            return res.status(200).json({
                ok: true,
                data: ordenes
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: error.message
            });
        }
    }

    async getOrdenFiltrado(req, res) {
        try {
            const result = await this.ordenService.getOrdenFiltrado(req.params);
            return res.status(200).json({
                ok: true,
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: error.message
            });
        }
    }

}