import { RequestHandler } from 'express'
import { createAdmin, createFaculty, createStudent } from './users.service'
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

export const CreateFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { faculty, ...data } = req.body
    const result = await createFaculty(faculty, data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculty created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const CreateAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { admin, ...data } = req.body
    const result = await createAdmin(admin, data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'admin created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
