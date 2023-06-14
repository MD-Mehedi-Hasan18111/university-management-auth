import mongoose from 'mongoose'
import config from '../../../config'
import AcademicSemester from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './users.interface'
import User from './users.model'
import { generateStudentId } from './users.utils'
import { Student } from '../student/student.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

export const createStudent = async (
  student: IStudent,
  userData: IUser
): Promise<IUser | null> => {
  // Default password
  if (!userData.password) {
    userData.password = config.student_default_pass as string
  }

  // set role
  userData.role = 'student'

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // Generate student id
    const id = await generateStudentId(academicSemester)
    userData.id = id
    student.id = id

    const newStudent = await Student.create([student], { session })

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create student')
    }

    //set student -->  _id into user.student
    userData.student = newStudent[0]._id

    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create user')
    }

    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    })
  }

  return newUserAllData
}
