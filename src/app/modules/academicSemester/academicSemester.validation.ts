import { z } from 'zod'
import {
  AcademicCodes,
  AcademicMonths,
  AcademicTitles,
} from './academicSemester.constants'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicTitles] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.number({
      required_error: 'year is required',
    }),
    code: z.enum([...AcademicCodes] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...AcademicMonths] as [string, ...string[]], {
      required_error: 'startMonth is required',
    }),
    endMonth: z.enum([...AcademicMonths] as [string, ...string[]], {
      required_error: 'endMonth is required',
    }),
  }),
})

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
}
