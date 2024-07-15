"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const product_1 = require("./handlers/product");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor curvo de 49 pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 *
 */
/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of Products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *
 *
 */
//routing
router.get('/', product_1.getProducts);
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by Id
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *
 *          404:
 *              description: Not found
 *
 *          400:
 *              description: Bad Request - Invalid ID
 */
router.get('/:id', (0, express_validator_1.param)('id').isInt().withMessage('Id no valido'), middleware_1.handleInputErrors, product_1.getProductById);
/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new Product
 *      tags:
 *          - Products
 *      description: Return a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data
 *
 *
 *
 *
 *
 *
 */
router.post('/', 
//validacion
(0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'), (0, express_validator_1.body)('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El precio del producto no puede ir vacio')
    .custom((value) => value > 0).withMessage('El precio debe ser mayor a cero'), middleware_1.handleInputErrors, product_1.createProduct);
/**
 *
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *
 *          400:
 *              description: Bad request - Invalid Id or Invalid input data
 *          404:
 *              description: Product not found
 */
router.put('/:id', (0, express_validator_1.param)('id').isInt().withMessage('Id no valido'), (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'), (0, express_validator_1.body)('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El precio del producto no puede ir vacio')
    .custom((value) => value > 0).withMessage('El precio debe ser mayor a cero'), (0, express_validator_1.body)('availability')
    .isBoolean().withMessage('Valor para disponibilidad no valido'), middleware_1.handleInputErrors, product_1.updateProduct);
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *             type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *
 *          400:
 *              description: Bad request - Invalid Id
 *          404:
 *              description: Product not found
 *
 */
router.patch('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, product_1.updateAvailability);
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by a given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema:
 *             type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto eliminado'
 *
 *          400:
 *              description: Bad request - Invalid Id
 *          404:
 *              description: Product not found
 *
 */
router.delete('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, product_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=router.js.map