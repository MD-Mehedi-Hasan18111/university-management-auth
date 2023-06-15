import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import User from './users.model'

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastStudent?.id ? lastStudent?.id?.substring(4) : undefined
}

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0')
  let incrementStudentId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementStudentId = `${String(academicSemester?.year).slice(2, 4)}${
    academicSemester?.code
  }${incrementStudentId}`
  return incrementStudentId
}

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastFaculty?.id ? lastFaculty?.id?.substring(2) : undefined
}

export const generateFacultyId = async () => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0')
  let incrementFacultyId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementFacultyId = `F-${incrementFacultyId}`
  return incrementFacultyId
}

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastAdmin?.id ? lastAdmin?.id?.substring(2) : undefined
}

export const generateAdminId = async () => {
  const currentId = (await findLastAdminId()) || (0).toString().padStart(5, '0')
  let incrementAdminId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementAdminId = `A-${incrementAdminId}`
  return incrementAdminId
}
