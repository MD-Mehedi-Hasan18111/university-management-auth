import { Request, Response } from 'express'
import { createUser } from './users.service'

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const result = await createUser(data)
    res.status(200).json({
      status: 'success',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
    })
  }
}
