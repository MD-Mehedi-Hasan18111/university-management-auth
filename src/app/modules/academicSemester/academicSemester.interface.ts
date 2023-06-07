import { Model } from 'mongoose'

export type IAcademicMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type IAcademicTitles = 'Autumn' | 'Summer' | 'Fall'

export type IAcademicCodes = '01' | '02' | '03'

export type IAcademicSemester = {
  title: IAcademicTitles
  year: number
  code: IAcademicCodes
  startMonth: IAcademicMonths
  endMonth: IAcademicMonths
}

export type IAcademicModel = Model<IAcademicSemester>
