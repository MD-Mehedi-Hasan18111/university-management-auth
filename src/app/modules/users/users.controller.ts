import { RequestHandler } from 'express'
import { createUser } from './users.service'

export const CreateUser: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body
    const result = await createUser(data)
    res.status(200).json({
      status: 'success',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
