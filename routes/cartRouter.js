import express from 'express'
import Cart from '../src/cart.js'
const router=express.Router()
let id=0
//Me permite listar todos los productos guardados en el carrito
router.get('/:cid/products',(req,res)=>{ 
    let id=parseInt(req.params.cid)
    let carts=Cart.getAllProductsOnCart(id)
    res.send({status:'success',message:JSON.stringify(carts)})
})
//Crea un carrito VACÍO y devuelve su id.
router.post('/',(req,res)=>{
    Cart.createCart();
    id=Cart.getCartid()
    res.send({status:'success',message:'cart created: '+id})
})
//Para incorporar productos al carrito por su id de carrito
router.post('/:cid/products',(req,res)=>{
    let id=parseInt(req.params.cid)
    let prod=req.body
    Cart.addProduct(id,prod)
    res.send({status:'connected successfully',message:'PRODUCT ADDED'})
})
//Vacía un carrito y lo elimina.
router.delete('/:cid',(req,res)=>{
    let id=parseInt(req.params.cid)
    Cart.deleteCart(id)
    res.send({status:'success',message:'cart deleted: '+id})
})
//Eliminar un producto del carrito por su id de carrito y de producto
router.delete('/:cid/products/:pid',(req,res)=>{
    let idCart=parseInt(req.params.cid)
    let idProd=parseInt(req.params.pid)
    Cart.deleteProd(idCart,idProd)
    res.send({status:'success',message:'product deleted: '+id})
})

export default router

