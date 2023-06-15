import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IPagination } from './pagination'
import calculationPagination from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'
import { IAdmin, IAdminFilter, IGenericResponse } from './admin.interface'
import { Admin } from './admin.model'
import { searchAbleFiltersFields } from './admin.constants'

export const GetAllAdmin = async (
  filters: IAdminFilter,
  paginationOptions: IPagination
): Promise<IGenericResponse<IAdmin[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculationPagination(paginationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const { searchTerm, ...filtersData } = filters
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: searchAbleFiltersFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filters).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const whereCondtions = andCondition.length > 0 ? { $and: andCondition } : {}

  const result = await Admin.find(whereCondtions)
    .populate('managementDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Admin.countDocuments(whereCondtions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const getOneAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate('managementDepartment')
  return result
}

export const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin not found')
  }

  const { name, ...adminData } = payload

  const updateAdminData: Partial<IAdmin> = { ...adminData }

  // handle name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(updateAdminData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Admin.findOneAndUpdate({ id }, payload, {
    new: true,
  }).populate('managementDepartment')

  return result
}
