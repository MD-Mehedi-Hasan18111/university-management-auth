import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

export type IAcademicDepartment = {
  title: string
  academicFaculty: Types.ObjectId | IAcademicFaculty
}

export type IAcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>

export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}

export type IAcademicDepartmentFilter = {
  searchTerm?: string
  academicFaculty?: Types.ObjectId
}
