import app from './app.js'
import { connectDB } from './db.js'

connectDB()

app.listen(4001, () => {
  console.log('Customer Server on port', 4001)
})