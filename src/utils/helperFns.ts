import bcrypt from 'bcryptjs'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { DecodedUser } from '../types/shared'
import { User } from '../types/user'

const { compare, hash } = bcrypt
const { sign, verify } = jwt

export const comparePasswordBcrypt = async (
  password: string,
  userPassword: string
): Promise<boolean> => {
  return await compare(password, userPassword)
}

export const hashPasswordBcrypt = async (
  password: string,
  salt: string | number = 10
): Promise<string> => {
  return await hash(password, salt)
}

export const verifyToken = async (
  token: string,
  secret: Secret
): Promise<string | DecodedUser | JwtPayload> => {
  return verify(token, secret)
}

export const generateAuthToken = (user: Partial<User>) => {
  const credentials: string | object | Buffer = {
    id: user.id,
    name: user.name,
    isAdmin: user.isAdmin
  }
  const exp: { expiresIn: string } = { expiresIn: process.env.ACCESS_TOKEN_EXP }
  return sign(credentials, process.env.ACCESS_TOKEN_SECRET, exp)
}
