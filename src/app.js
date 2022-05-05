import express from 'express'
import productRouter from '../routes/productRouter.js'
import cartRouter from '../routes/cartRouter.js'
let admin=true 
let port=8080
let app=express()
let server=app.listen(8080 || process.env.port,()=>{console.log(`listen port`,port)})
app.use(express.json())

app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)

export {admin}

