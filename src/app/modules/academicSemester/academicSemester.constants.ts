import {
  IAcademicCodes,
  IAcademicMonths,
  IAcademicTitles,
} from './academicSemester.interface'

export const AcademicMonths: IAcademicMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const AcademicTitles: IAcademicTitles[] = ['Autumn', 'Summer', 'Fall']

export const AcademicCodes: IAcademicCodes[] = ['01', '02', '03']

export const AcademicSemesterCodesMapper: {
  [key: string]: string
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}

export const searchAbleFiltersFields = ['title', 'code']

export const filterFields = ['searchTerm', 'title', 'year', 'code']
