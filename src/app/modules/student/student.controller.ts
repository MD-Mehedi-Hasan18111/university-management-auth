import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { filterFields } from './student.constant'
import { getAllStudents, getOneStudent, updateStudent } from './student.service'

export const getStudents: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, filterFields)
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ])
    const result = await getAllStudents(filters, paginationOptions)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students retrived successfully',
      meta: result.meta,
      data: result.data,
    })
  } catch (error) {
    next(error)
  }
}

export const GetSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await getOneStudent(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student retrived successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UpdateStudent: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const result = await updateStudent(id, data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// export const DeleteStudent: RequestHandler = async (req, res, next) => {
//   try {
//     const id = req.params.id
//     const result = await deleteStudent(id)
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Student deleted successfully',
//       data: result,
//     })
//   } catch (error) {
//     next(error)
//   }
// }
