import { searchAbleFiltersFields } from './academicFaculty.constants'
import {
  IAcademicFaculty,
  IAcademicFacultyFilter,
  IGenericResponse,
} from './academicFaculty.interface'
import { IPagination } from './pagination'
import calculationPagination from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'
import AcademicFaculty from './academicFaculty.model'

export const createAcademicFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const createdFaculty = await AcademicFaculty.create(payload)
  if (!createdFaculty) {
    throw new Error('Failed to create faculty!')
  }
  return createdFaculty
}

export const getAllFaculty = async (
  filters: IAcademicFacultyFilter,
  paginationOptions: IPagination
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
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

  const result = await AcademicFaculty.find(whereCondtions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await AcademicFaculty.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const getOneFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id)
  return result
}

export const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const deleteFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id)
  return result
}
