import bcrypt from 'bcryptjs'

const { compare, hash } = bcrypt

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
