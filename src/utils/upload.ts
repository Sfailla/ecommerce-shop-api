import { Request, RequestHandler } from 'express'
import multer, { StorageEngine } from 'multer'
import path from 'path'
import { CustomError } from '../utils/customErrors.js'

function fileFilter(
  _req: Request,
  file: Express.Multer.File,
  cb: (error: CustomError, filename: string) => void
): void {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, file.originalname.toLowerCase().replace(' ', '-'))
  } else {
    cb(new CustomError('Error: Images Only!'), file.originalname)
  }
}

// multer image upload config
const storage: StorageEngine = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error, filename: string) => void
  ): void => cb(null, './public/uploads'),
  filename: fileFilter
})

export const uploadImage: RequestHandler = multer({ storage }).single('image')
export const uploadImages = multer({ storage }).array('images', 10)
