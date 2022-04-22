import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import logger from 'morgan'

import { makeDbConnection } from './db/index.js'
import { productRoutes } from './routes/index.js'

dotenv.config()

const app: Express = express()

app.use(logger('dev'))
app.use(express.json())

makeDbConnection()

app.use('/api/v1/products', productRoutes)

app.get('/', (req: Request, res: Response) => {
  const body = req.body
  console.log(body)
  res.status(200).send('Hello World!')
})

app.listen(3000, () => console.log('...app running on port 3000!'))
