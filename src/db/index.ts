import mongoose from 'mongoose'
import { CustomError } from '../utils/customErrors.js'

interface MongooseOptions {
  connectTimeoutMS: number
  dbName?: string
}

export const makeDbConnection: () => Promise<void> = async () => {
  const mongooseOptions: MongooseOptions = {
    connectTimeoutMS: 1000
  }

  const url: string = process.env.MONGOOSE_URI

  mongoose.connection.on('connected', () => {
    const msg = `Mongoose connection established to MLAB database`
    console.log(msg)
  })

  mongoose.connection.on('error', (error) => {
    const msg = `Mongoose default connection has occured ${JSON.stringify(error)} error`
    console.log(msg)
  })

  mongoose.connection.on('disconnected', () => {
    const msg = 'Mongoose default connection is disconnected'
    console.log(msg)
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      const msg = 'Mongoose default connection is disconnected due to application termination'
      console.log(msg)
      process.exit(0)
    })
  })

  try {
    await mongoose.connect(url, mongooseOptions)
  } catch (err) {
    console.log(err)
    throw new CustomError('Mongoose connection error')
  }
}
