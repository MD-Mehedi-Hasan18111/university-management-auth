import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { AcademicSemesterCodesMapper } from './academicSemester.constants'
import { IAcademicSemester } from './academicSemester.interface'
import AcademicSemester from './academicSemester.model'

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
