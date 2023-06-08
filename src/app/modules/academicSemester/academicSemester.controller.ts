import { RequestHandler } from 'express'
import { createAcademicSemester } from './academicSemester.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

export const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body
    const result = await createAcademicSemester(data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semester created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
