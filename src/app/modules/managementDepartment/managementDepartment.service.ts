import { IPagination } from './pagination'
import calculationPagination from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'
import {
  IGenericResponse,
  IManagementDepartment,
  IManagementDepartmentFilter,
} from './managementDepartment.interface'
import ManagementDepartment from './managementDepartment.model'
import { searchAbleFiltersFields } from './managementDepartment.constants'

export const createManagementDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  const createdDepartment = await ManagementDepartment.create(payload)
  if (!createdDepartment) {
    throw new Error('Failed to create management department!')
  }
  return createdDepartment
}

export const getAllManagementDepartments = async (
  filters: IManagementDepartmentFilter,
  paginationOptions: IPagination
): Promise<IGenericResponse<IManagementDepartment[]>> => {
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

  const result = await ManagementDepartment.find(whereCondtions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await ManagementDepartment.countDocuments(whereCondtions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const getOneManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id)
  return result
}

export const updateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  )
  return result
}

export const deleteManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id)
  return result
}
