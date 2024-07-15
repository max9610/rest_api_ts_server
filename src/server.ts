import  express  from "express";
import router from "./router";
import db from './config/db'
import colors from 'colors'
import cors,{CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi  from "swagger-ui-express";
import swaggerSpec, {swaggerUiOptions} from "./config/swagger";
//conectar a base de datos

export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.blue.bold('Conexion exitosa a la base de datos'));
                
    } catch (error) {
        // console.log(error);
        console.log(colors.red.bold('Hubo un error al conectar a la base de datos'));
    }
}

connectDB()

// instancia de express
const server=express()

//  Permitir conexiones

const corsOptions:CorsOptions={
    origin: function (origin,callback){
        if(origin=== process.env.FRONTEND_URL || 'http://localhost:4000/api/products'){
            callback(null,true)
        }else{
            callback(new Error('Error de cors'));
        }
    }
}

server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products',router)

// server.get('/api',(req,res)=>{
//     res.json({msg:'desde api'})
// })


//Docs
server.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec,swaggerUiOptions))

export default server