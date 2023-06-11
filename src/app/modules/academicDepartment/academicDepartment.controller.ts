import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { filterFields } from './academicDepartment.constants'
import {
  createAcademicDepartment,
  deleteDepartment,
  getAllDepartments,
  getOneDepartment,
  updateDepartment,
} from './academicDepartment.service'

export const createDepartment: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body
    const result = await createAcademicDepartment(data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'department created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const getDepartments: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, filterFields)
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ])
    const result = await getAllDepartments(filters, paginationOptions)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'departments retrived successfully',
      meta: result.meta,
      data: result.data,
    })
  } catch (error) {
    next(error)
  }
}

export const GetSingleDepartment: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await getOneDepartment(id)
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

export const UpdateDepartment: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const result = await updateDepartment(id, data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'department updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const DeleteDepartment: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await deleteDepartment(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'department deleted successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
