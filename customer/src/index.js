import app from './app.js'
import { connectDB } from './db.js'

connectDB()
//-----------agregado-----------------
app.use('/',(req,res,next) =>{
	return res.status(200).json({"msg":"Hola desde customer"})
})
//-------------------------------------------

app.listen(4001)
console.log('Customer Server on port', 4001)