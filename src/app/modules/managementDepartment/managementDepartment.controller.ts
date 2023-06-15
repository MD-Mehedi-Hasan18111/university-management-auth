import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { filterFields } from './managementDepartment.constants'
import {
  createManagementDepartment,
  deleteManagementDepartment,
  getAllManagementDepartments,
  getOneManagementDepartment,
  updateManagementDepartment,
} from './managementDepartment.service'

export const createManagementDepartments: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const data = req.body
    const result = await createManagementDepartment(data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const getManagementDepartments: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const filters = pick(req.query, filterFields)
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ])
    const result = await getAllManagementDepartments(filters, paginationOptions)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Departments retrived successfully',
      meta: result.meta,
      data: result.data,
    })
  } catch (error) {
    next(error)
  }
}

export const GetSingleManagementDepartment: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id
    const result = await getOneManagementDepartment(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department retrieved successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UpdateManagementDepartment: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id
    const data = req.body
    const result = await updateManagementDepartment(id, data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const DeleteManagementDepartment: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id
    const result = await deleteManagementDepartment(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department deleted successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
