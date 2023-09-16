import axios from 'axios'

const customer = axios.create({
  baseURL: 'http://localhost:4001/api',
  withCredentials: true
})

// const products = axios.create({
//   baseURL: 'http://localhost:4002/api',
//   withCredentials: true
// })


export { customer }

// export { customer, products }