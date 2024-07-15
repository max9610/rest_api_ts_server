"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateAvailability = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getProducts = async (req, res) => {
    const products = await Product_1.default.findAll({
        order: [
            ['id', 'ASC']
        ],
    });
    res.json({ data: products });
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ data: product });
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    // const product= new Product(req.body)
    // const savedProduct=await product.save()
    const product = await Product_1.default.create(req.body);
    res.status(201).json({ data: product });
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    //actualizar
    // product.name=req.body.name
    // product.price=req.body.price
    // product.availability=req.body.availability
    await product.update(req.body);
    await product.save();
    res.json({ data: product });
};
exports.updateProduct = updateProduct;
const updateAvailability = async (req, res) => {
    const { id } = req.params;
    const product = await Product_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        });
    }
    // Verificar el valor actual de availability
    console.log('Valor actual de availability:', product.dataValues.availability);
    // Actualizar
    const value = !product.dataValues.availability;
    console.log('Nuevo valor de availability:', value);
    product.availability = value;
    await product.save();
    // Verificar si el valor se actualizó correctamente
    const updatedProduct = await Product_1.default.findByPk(id);
    console.log('Valor actualizado de availability:', updatedProduct?.dataValues.availability);
    res.json({ data: updatedProduct });
};
exports.updateAvailability = updateAvailability;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        });
    }
    await product.destroy();
    res.json({ data: 'Producto eliminado' });
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map