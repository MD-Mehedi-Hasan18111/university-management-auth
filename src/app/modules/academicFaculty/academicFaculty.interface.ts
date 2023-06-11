import { Model } from 'mongoose'

export type IAcademicFaculty = {
  title: string
}

export type IAcademicFacultryModel = Model<
  IAcademicFaculty,
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

export type IAcademicFacultyFilter = {
  searchTerm?: string
}
