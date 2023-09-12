import app from './app.js'
import { connectDB } from './db.js'

connectDB()

const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
  console.log('Customer Server on port', 4001)
})