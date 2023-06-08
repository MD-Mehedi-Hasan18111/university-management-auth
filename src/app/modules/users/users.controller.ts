import { RequestHandler } from 'express'
import { createUser } from './users.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

export const CreateUser: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body
    const result = await createUser(data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully',
      data: result,
    })
    next()
  } catch (error) {
    next(error)
  }
}
