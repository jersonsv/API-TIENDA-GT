import { ClienteService } from '../services/clienteService.js';

export class ClienteController {
    constructor() {
        this.clienteService = new ClienteService();
    }

    async createCliente(req, res) {
        try {
            const product = await this.clienteService.createCliente(req.body);
            
            return res.status(201).json({
                ok: true,
                status: 201,
                message: "Cliente guardado",
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

    async updateCliente(req, res) {
        try {
            const product = await this.clienteService.updateCliente(req.body);
            
            return res.status(200).json({
                ok: true,
                status: 200,
                message: "Cliente editado",
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

    async getClientes(req, res) {
        try {
            const clientes = await this.clienteService.getClientes();
            return res.status(200).json({
                ok: true,
                data: clientes
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: error.message
            });
        }
    }

    async getClienteFiltrado(req, res) {
        try {
            const estado = await this.clienteService.getClienteFiltrado(req.params);
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