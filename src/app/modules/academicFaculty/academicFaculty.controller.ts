import { RequestHandler } from 'express'
import {
  createAcademicFaculty,
  deleteFaculty,
  getAllFaculty,
  getOneFaculty,
  updateFaculty,
} from './academicFaculty.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { filterFields } from './academicFaculty.constants'

export const createFaculty: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body
    const result = await createAcademicFaculty(data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculties created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const getFaculties: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, filterFields)
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ])
    const result = await getAllFaculty(filters, paginationOptions)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculties retrived successfully',
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
    const result = await getOneFaculty(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculty retrived successfully',
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
      message: 'faculty updated successfully',
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
      message: 'faculty deleted successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
