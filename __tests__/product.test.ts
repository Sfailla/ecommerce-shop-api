import request from 'supertest'
import express from 'express'
import router from '../src/routes/product.js'
// import { app } from '../src/main.js'

// const mockGetProducts = jest.fn().mockReturnValue([
//   { id: 1, name: 'product 1', price: 100 },
//   { id: 2, name: 'product 2', price: 200 },
//   { id: 3, name: 'product 3', price: 300 }
// ])
// jest.mock('../src/routes/product.js', () => ({
//   getProducts: jest.fn().mockReturnValue([
//     { id: 1, name: 'product 1', price: 100 },
//     { id: 2, name: 'product 2', price: 200 },
//     { id: 3, name: 'product 3', price: 300 }
//   ])
// }))

// mock db connection
jest.mock('../src/db/index.js')

const app = express()
app.use('/', router)

describe('GET /products', () => {
  it('should return all products', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('products')
    expect(response.body.products).toHaveLength(3)
  })
})
