import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { filterFields } from './admin.constants'
import { GetAllAdmin, getOneAdmin, updateAdmin } from './admin.service'

export const getAllAdmin: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, filterFields)
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ])
    const result = await GetAllAdmin(filters, paginationOptions)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Admin retrived successfully',
      meta: result.meta,
      data: result.data,
    })
  } catch (error) {
    next(error)
  }
}

export const GetSingleAdmin: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await getOneAdmin(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin retrived successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UpdateAdmin: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const result = await updateAdmin(id, data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
