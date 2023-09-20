import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'

// Colocar el .env en la carpeta controllers
// node test-cloudinary.js

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

await cloudinary.uploader.destroy('Prueba/ow8xdqufknakz02yynrf', (error, result) => {
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Operation Result:', result)
  }
})