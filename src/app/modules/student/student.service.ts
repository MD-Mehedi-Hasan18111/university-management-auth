import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IPagination } from './pagination'
import calculationPagination from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'
import { Student } from './student.model'
import { IGenericResponse, IStudent, IStudentFilter } from './student.interface'
import { searchAbleFiltersFields } from './student.constant'

export const getAllStudents = async (
  filters: IStudentFilter,
  paginationOptions: IPagination
): Promise<IGenericResponse<IStudent[]>> => {
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

  const result = await Student.find(whereCondtions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Student.countDocuments(whereCondtions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const getOneStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
  return result
}

export const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student not found')
  }

  const { name, gurdian, localGurdian, ...studentData } = payload

  const updateStudentData: Partial<IStudent> = { ...studentData }

  // handle name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(updateStudentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  // handle gurdian
  if (gurdian && Object.keys(gurdian).length > 0) {
    Object.keys(gurdian).forEach(key => {
      const gurdianKey = `gurdian.${key}` as keyof Partial<IStudent>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(updateStudentData as any)[gurdianKey] =
        gurdian[key as keyof typeof gurdian]
    })
  }

  // handle localGurdian
  if (localGurdian && Object.keys(localGurdian).length > 0) {
    Object.keys(localGurdian).forEach(key => {
      const localGurdianianKey =
        `localGurdian.${key}` as keyof Partial<IStudent>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(updateStudentData as any)[localGurdianianKey] =
        localGurdian[key as keyof typeof localGurdian]
    })
  }

  const result = await Student.findOneAndUpdate({ id }, payload, {
    new: true,
  })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')

  return result
}

// export const deleteStudent = async (
//   id: string
// ): Promise<IAcademicSemester | null> => {
//   const result = await AcademicSemester.findByIdAndDelete(id)
//   return result
// }
