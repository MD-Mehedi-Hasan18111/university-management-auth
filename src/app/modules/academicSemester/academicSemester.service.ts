import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import {
  AcademicSemesterCodesMapper,
  searchAbleFiltersFields,
} from './academicSemester.constants'
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
  IGenericResponse,
} from './academicSemester.interface'
import AcademicSemester from './academicSemester.model'
import { IPagination } from './pagination'
import calculationPagination from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

export const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  if (AcademicSemesterCodesMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester code')
  }

  const createdSemester = await AcademicSemester.create(payload)
  if (!createdSemester) {
    throw new Error('Failed to create semester!')
  }
  return createdSemester
}

export const getAllSemester = async (
  filters: IAcademicSemesterFilter,
  paginationOptions: IPagination
): Promise<IGenericResponse<IAcademicSemester[]>> => {
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

  const result = await AcademicSemester.find(whereCondtions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const getOneSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}

export const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    AcademicSemesterCodesMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester code')
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}
