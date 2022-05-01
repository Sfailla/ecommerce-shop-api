import { NextFunction, Request, Response } from 'express'
import { DbModel } from '../types/shared'
import { User, UserClass } from '../types/user'
import { CustomError, UniqueConstraintError } from '../utils/customErrors.js'
import { comparePasswordBcrypt, generateAuthToken, hashPasswordBcrypt } from '../utils/helperFns.js'

export default class UserController implements UserClass {
  constructor(public readonly userDb: DbModel<User>) {
    this.userDb = userDb
  }

  getUsers = async (_req: Request, res: Response) => {
    try {
      const users: User[] = await this.userDb.find()
      res.status(200).json({ success: true, users })
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }

  getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: User = await this.userDb.findById(req.params.id)
      if (!user) throw new UniqueConstraintError('User123')
      res.status(200).json({ success: true, user })
    } catch (error) {
      next(error)
    }
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const hashedPassword = await hashPasswordBcrypt(req.body.password)
      const user: User = await this.userDb.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country
      })
      res.status(200).json({ success: true, message: 'user created successfully', user })
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }

  updateUser = async (req: Request, res: Response) => {
    try {
      const user: User = await this.userDb.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })

      res.status(200).json({ success: true, message: 'user updated successfully', user })
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    try {
      const user: User = await this.userDb.findByIdAndDelete(req.params.id)

      res.status(200).json({ success: true, message: 'user deleted successfully', user })
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }

  // AUTHORIZATION METHODS

  register = async (_req: Request, res: Response) => {
    res.send('register')
  }

  login = async (req: Request, res: Response) => {
    try {
      const user: User = await this.userDb.findOne({ email: req.body.email })
      console.log({ user })
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'user not found'
        })
        return
      }
      const isPasswordValid = await comparePasswordBcrypt(req.body.password, user.password)
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'invalid password'
        })
        return
      }
      const token = generateAuthToken(user)
      res.status(200).json({
        success: true,
        message: 'user logged in successfully',
        user,
        token
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }
}
