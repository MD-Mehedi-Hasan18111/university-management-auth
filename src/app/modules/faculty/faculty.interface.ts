import { Model, Types } from 'mongoose'
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

type IUserName = {
  firstName: string
  middleName: string
  lastName: string
}

type IGender = 'male' | 'female'

type IBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export type IFaculty = {
  id: string
  name: IUserName
  gender: IGender
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  bloodGroup?: IBloodGroup
  designation: string
  academicDepartment: Types.ObjectId | IAcademicDepartment
  academicFaculty: Types.ObjectId | IAcademicFaculty
  profileImage?: string
}

export type FacultyModel = Model<IFaculty, Record<string, unknown>>

export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}

export type IFacultyFilter = {
  searchTerm?: string
  bloodGroup?: string
  email?: string
  id?: string
}
