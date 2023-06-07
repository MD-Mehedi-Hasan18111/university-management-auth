import { IAcademicSemester } from './academicSemester.interface'
import AcademicSemester from './academicSemester.model'

export const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  const createdSemester = await AcademicSemester.create(payload)
  if (!createdSemester) {
    throw new Error('Failed to create semester!')
  }
  return createdSemester
}
