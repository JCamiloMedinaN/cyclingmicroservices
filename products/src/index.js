import app from './app.js'
import { connectDB } from './db.js'

connectDB()

//-----------agregado--------------------------------------
app.use('/',(req,res,next) =>{
	return res.status(200).json({"msg":"Hola desde products"})
})
//--------------------------------------------

app.listen(4002)
console.log('Products is Listening to Port', 4002)
