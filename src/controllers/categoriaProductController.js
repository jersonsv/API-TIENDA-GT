import { CategoriaProductService } from '../services/categoriaProductService.js';

export class CategoriaProductController {
    constructor() {
        this.categoriaProductService = new CategoriaProductService();
    }

    async createCategoriaProducto(req, res) {
        try {
            const product = await this.categoriaProductService.createCategoriaProducto(req.body);
            
            return res.status(201).json({
                ok: true,
                status: 201,
                message: "Categoria Producto creada",
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

    async updateCategoriaProducto(req, res) {
        try {
            const product = await this.categoriaProductService.updateCategoriaProducto(req.body);
            
            return res.status(200).json({
                ok: true,
                status: 200,
                message: "Categoria Producto modificada",
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

    async desactiveCategoriaProducto(req, res) {
        try {
            const product = await this.categoriaProductService.desactiveCategoriaProducto(req.body);
            
            return res.status(200).json({
                ok: true,
                status: 204,
                message: "Categoria Producto eliminado",
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

    async getCategoriaProductosActivos(req, res) {
        try {
            const productos = await this.categoriaProductService.getCategoriaProductosActivos();
            return res.status(200).json({
                ok: true,
                data: productos
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: error.message
            });
        }
    }

    async getCategoriaProductoActivoFiltrado(req, res) {
        try {
            const productos = await this.categoriaProductService.getCategoriaProductoActivoFiltrado(req.params.id);
            return res.status(200).json({
                ok: true,
                data: productos
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: error.message
            });
        }
    }
}