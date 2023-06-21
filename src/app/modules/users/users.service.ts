import mongoose from 'mongoose'
import config from '../../../config'
import AcademicSemester from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './users.interface'
import User from './users.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './users.utils'
import { Student } from '../student/student.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'

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

export const createFaculty = async (
  faculty: IFaculty,
  userData: IUser
): Promise<IUser | null> => {
  // Default password
  if (!userData.password) {
    userData.password = config.faculty_default_pass as string
  }

  // set role
  userData.role = 'faculty'

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // Generate faculty id
    const id = await generateFacultyId()
    userData.id = id
    faculty.id = id

    const newFaculty = await Faculty.create([faculty], { session })

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create faculty')
    }

    //set faculty -->  _id into user.faculty
    userData.faculty = newFaculty[0]._id

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
      path: 'faculty',
      populate: [{ path: 'academicDepartment' }, { path: 'academicFaculty' }],
    })
  }

  return newUserAllData
}

export const createAdmin = async (
  admin: IAdmin,
  userData: IUser
): Promise<IUser | null> => {
  // Default password
  if (!userData.password) {
    userData.password = config.admin_default_pass as string
  }

  // set role
  userData.role = 'admin'

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // Generate admin id
    const id = await generateAdminId()
    userData.id = id
    admin.id = id

    const newAdmin = await Admin.create([admin], { session })

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create admin')
    }

    //set admin -->  _id into user.faculty
    userData.admin = newAdmin[0]._id

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
      path: 'admin',
      populate: [{ path: 'managementDepartment' }],
    })
  }

  return newUserAllData
}
