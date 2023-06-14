import { RequestHandler } from 'express'
import { createStudent } from './users.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

export const CreateStudent: RequestHandler = async (req, res, next) => {
  try {
    const { student, ...data } = req.body
    const result = await createStudent(student, data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
