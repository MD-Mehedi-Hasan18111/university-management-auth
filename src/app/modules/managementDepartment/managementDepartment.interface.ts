import { Model } from 'mongoose'

export type IManagementDepartment = {
  title: string
}

export type IManagementDepartmentModel = Model<
  IManagementDepartment,
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

export type IManagementDepartmentFilter = {
  searchTerm?: string
}
