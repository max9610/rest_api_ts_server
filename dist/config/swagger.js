"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiOptions = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API opetations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://cdn.worldvectorlogo.com/logos/nasa-6.svg');
            height: 80px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color:blue
        }
    `,
    customSiteTitle: 'Documentacion rest Api Express'
};
exports.swaggerUiOptions = swaggerUiOptions;
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map