
import fs from 'fs'
import Product from './product.js'
class Cart{
    constructor(){
        this.filename='cart.txt'
    }
    createCart(){
        if(fs.existsSync(this.filename)){
            let actcart=fs.readFileSync(`${this.filename}`,'utf-8')
        
            let cart=JSON.parse(actcart)
            cart.push({
                id:(Object.keys(cart).length)+1,
                products:[]
            })
            fs.writeFileSync(`${this.filename}`,JSON.stringify(cart))
            
        }else{
            let cart=[{
                id:1,
                products:[]
            }]
            fs.writeFileSync(`${this.filename}`,JSON.stringify(cart))
        }
    }
    getCartid(){
        try{
            let actcart=fs.readFileSync(`${this.filename}`,'utf-8')
            let cart=JSON.parse(actcart)
            return (Object.keys(cart).length)
        }catch(error){
            console.log(`ERROR--> ${error} TO GET: ${id}, CART DOESN'T EXIST`)
        }
    }
    getAllProductsOnCart(id){
        try{
        let actcart=fs.readFileSync(`${this.filename}`,'utf-8')
        let cart=JSON.parse(actcart)
        let flag=false
        let show
        cart.map(el=>{
                    if(el.id===id){
                        flag=true
                    }
                })
        //si existe el carro
        if(flag===true){
            show=cart.map(el=>el.products)
            //muestrolos productos
            return show
        }
    }catch(error){
        console.log(`ERROR--> ${error} TO GET: ${id}, CART DOESN'T EXIST`)
    }
    }
    addProduct(id,prod){ 
        try{
            let actcart=fs.readFileSync(`${this.filename}`,'utf-8')
            let cart=JSON.parse(actcart) 
            let searchedproduct=Product.searchProduct(prod.id)
            cart.map(el=>{
                if(searchedproduct==true){
                    //si existe el carrito
                    if(el.id===id){
                        el.products.push(prod)
                        fs.writeFileSync(`${this.filename}`,JSON.stringify(cart))
                        return "Product added"
                    }
                }else{
                    return error
                }
            })
        }catch(error){
            console.log(`ERROR--> ${error} TO GET: ${id}, CART DOESN'T EXIST`)
        }
    }
    deleteCart(id){
        try{
        let actcart=fs.readFileSync(`${this.filename}`,'utf-8')
        let cart=JSON.parse(actcart)
        let flag=false
        let show
        cart.map(el=>{
                    if(el.id===id){
                        flag=true
                    }
                })
        //si existe el carrito
        if(flag===true){
            show=cart.filter(el=>el.id!==id)
            //elimino carrito
            fs.writeFileSync(`${this.filename}`,JSON.stringify(show))
            console.log('PRODUCT DELETED')
        }
    }catch(error){
        console.log(`ERROR--> ${error} TO GET: ${id}, CART DOESN'T EXIST`)
    }
    }
    deleteProd(idCart,idProd){
        try{
        let actcart=fs.readFileSync(`${this.filename}`,'utf-8')
        let cart=JSON.parse(actcart)
        let show=[]
        //mapeo cada carrito
        cart.map(el=>{
                //si es el carrito que buscamos entonces
                    if(el.id===idCart){                 
                        //mapeo los productos       
                        (el.products).map(element=>{
                            console.log(element)
                            //filtro todos los productos que queremos conservar
                            if(element.id!==idProd){
                                show=show.push(element)
                            }
                        })
                        el.products=show
                    }
                })
        fs.writeFileSync(`${this.filename}`,JSON.stringify(cart))
        return show
    }catch(error){
        console.log(`ERROR--> ${error} TO GET: ${id}`)
    }
    }
}
export default new Cart