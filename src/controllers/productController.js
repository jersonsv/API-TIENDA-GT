import { ProductService } from '../services/productService.js';

export class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    async createProduct(req, res) {
        try {
            const product = await this.productService.createProduct(req.body);
            
            return res.status(201).json({
                ok: true,
                status: 201,
                message: "Producto creado",
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

    async updateProduct(req, res) {
        try {
            const product = await this.productService.updateProduct(req.body);
            
            return res.status(200).json({
                ok: true,
                status: 200,
                message: "Producto modificado",
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

    async desactiveProduct(req, res) {
        try {
            const product = await this.productService.desactiveProduct(req.body);
            
            return res.status(200).json({
                ok: true,
                status: 204,
                message: "Producto eliminado",
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

    async getProductosActivos(req, res) {
        try {
            const productos = await this.productService.getProductosActivos();
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

    async getProductoActivoFiltrado(req, res) {
        try {
            console.log(req.params.id)
            const productos = await this.productService.getProductoActivoFiltrado(req.params.id);
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