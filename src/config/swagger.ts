import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options:swaggerJSDoc.Options={
    swaggerDefinition:{
        openapi:'3.0.2',
        tags:[
            {
                name:'Products',
                description:'API opetations related to products'
            }
        ],
        info:{
            title:'REST API Node.js / Express / Typescript',
            version:'1.0.0',
            description:'API Docs for Products'
        }
    },
    apis:['./src/router.ts']
}

const swaggerSpec=swaggerJSDoc(options)

const swaggerUiOptions:SwaggerUiOptions={
    customCss:`
        .topbar-wrapper .link {
            content: url('https://cdn.worldvectorlogo.com/logos/nasa-6.svg');
            height: 80px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color:blue
        }
    `,
    customSiteTitle:'Documentacion rest Api Express'
}

export default swaggerSpec

export { swaggerUiOptions}