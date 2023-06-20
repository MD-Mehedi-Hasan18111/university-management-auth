import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { filterFields } from './faculty.constant'
import {
  deleteFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
} from './faculty.service'

export const getFaculties: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, filterFields)
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ])
    const result = await getAllFaculties(filters, paginationOptions)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties retrived successfully',
      meta: result.meta,
      data: result.data,
    })
  } catch (error) {
    next(error)
  }
}

export const GetSingleFaculty: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await getSingleFaculty(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty retrived successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UpdateFaculty: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const result = await updateFaculty(id, data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const DeleteFaculty: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await deleteFaculty(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty deleted successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
