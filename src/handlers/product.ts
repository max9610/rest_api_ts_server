import {Request,Response} from 'express'
import Product from '../models/Product';


export const getProducts = async (req:Request,res:Response)=>{
    const products= await Product.findAll({
        order:[
            ['id','ASC']
        ],
    })
    res.json({data:products})
}

export const getProductById = async (req:Request,res:Response)=>{
    const {id}=req.params
        const product=await Product.findByPk(id)
        if(!product){
            return res.status(404).json({error:'Producto no encontrado'})
        }
        res.json({data:product})
}


export const createProduct=async(req:Request,res:Response)=>{
    // const product= new Product(req.body)
    // const savedProduct=await product.save()
    const product=await Product.create(req.body)
    res.status(201).json({data:product})
}

export const updateProduct=async (req:Request,res:Response)=>{
    const {id}=req.params
    const product=await Product.findByPk(id)
    if(!product){
        return res.status(404).json({error:'Producto no encontrado'})
    }
    //actualizar
    // product.name=req.body.name
    // product.price=req.body.price
    // product.availability=req.body.availability
    await product.update(req.body)
    await product.save()
    
    res.json({data:product})
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

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
    const updatedProduct = await Product.findByPk(id);
    console.log('Valor actualizado de availability:', updatedProduct?.dataValues.availability);

    res.json({ data: updatedProduct });
};


export const deleteProduct=async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
    await product.destroy()
    res.json({data:'Producto eliminado'})
}
