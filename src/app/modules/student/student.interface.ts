import { Model, Types } from 'mongoose'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

type IUserName = {
  firstName: string
  middleName: string
  lastName: string
}

type IGender = 'male' | 'female'

type IBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

type IGurdian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
  address: string
}

type ILocalGurdian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type IStudent = {
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
  gurdian: IGurdian
  localGurdian: ILocalGurdian
  academicSemester: Types.ObjectId | IAcademicSemester
  academicDepartment: Types.ObjectId | IAcademicDepartment
  academicFaculty: Types.ObjectId | IAcademicFaculty
  profileImage?: string
}

export type StudentModel = Model<IStudent, Record<string, unknown>>

export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}

export type IStudentFilter = {
  searchTerm?: string
  bloodGroup?: string
  email?: string
  id?: string
}
