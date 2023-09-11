import app from './app.js'
import { connectDB } from './db.js'

connectDB()

const PORT = process.env.PORT || 4002
app.listen(PORT, () => {
  console.log('Products Server on port', 4002)
})