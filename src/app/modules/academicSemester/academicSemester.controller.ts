import { RequestHandler } from 'express'
import {
  createAcademicSemester,
  deleteSemester,
  getAllSemester,
  getOneSemester,
  updateSemester,
} from './academicSemester.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { filterFields } from './academicSemester.constants'

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

export const getSemesters: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, filterFields)
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ])
    const result = await getAllSemester(filters, paginationOptions)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semesters retrived successfully',
      meta: result.meta,
      data: result.data,
    })
  } catch (error) {
    next(error)
  }
}

export const GetSingleSemester: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await getOneSemester(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semester retrived successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UpdateSemester: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const result = await updateSemester(id, data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semester updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const DeleteSemester: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await deleteSemester(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semester deleted successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
