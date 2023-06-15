import { Model, Types } from 'mongoose'
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface'

type IUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

type IGender = 'male' | 'female'

type IBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export type IAdmin = {
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
  managementDepartment: Types.ObjectId | IManagementDepartment
  designation: string
  profileImage?: string
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>

export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}

export type IAdminFilter = {
  searchTerm?: string
  bloodGroup?: string
  email?: string
  id?: string
}
