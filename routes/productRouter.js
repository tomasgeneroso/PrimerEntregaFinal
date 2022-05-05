import express from 'express'
import Product from '../src/product.js'
import {admin} from '../src/app.js'
const router=express.Router()

const isAdm=(req,res,next)=>{
    if (admin){
        next();
    }else{
        res.status(401).send({message: "-1",
        description: `ruta: ${req.url} - metodo: ${req.method} no autorizado`});
    }
    
}

// router.get('/prueba',(req,res)=>{ 
//     let prueba=Product.searchProduct(1)
//     res.send({status:"success",message:"PRODUCT: "+prueba})
// })
//Me permite listar todos los productos disponibles 
router.get('/',(req,res)=>{ 
    let prod=Product.getAllProducts()
    let product=JSON.stringify(prod,null,"\t")
    res.send({status:"success",message:"PRODUCT: "+product})
})
//Me permite listar un producto por su id (disponible para usuarios y administradores)
router.get('/:pid',(req,res)=>{ 
    let id=parseInt(req.params.pid)
    let prod=Product.getProduct(id)
    prod=JSON.stringify(prod,null,"\t")
    res.send({status:'succes',products:prod})
})
//Para incorporar productos al listado (disponible para administradores)
router.post('/',isAdm,(req,res)=>{
    let prod=req.body
    Product.addProduct(prod)
    res.send({status:'success',message:'connected'})
})
//Actualiza un producto por su id (disponible para administradores)
router.put('/:pid',isAdm,(req,res)=>{
    let id=req.params.pid
    let prod=req.body
    Product.updateProduct(id,prod)
    res.send({status:'success',message:'connected'})
})
//Borra un producto por su id (disponible para administradores)
router.delete('/:pid',isAdm,(req,res)=>{
    let id=parseInt(req.params.pid)
    Product.deleteProduct(id)
    res.send({status:'success',message:'connected'})
})

export default router