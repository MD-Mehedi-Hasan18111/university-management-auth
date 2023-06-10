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

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicTitles] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),
      year: z
        .number({
          required_error: 'year is required',
        })
        .optional(),
      code: z
        .enum([...AcademicCodes] as [string, ...string[]], {
          required_error: 'code is required',
        })
        .optional(),
      startMonth: z
        .enum([...AcademicMonths] as [string, ...string[]], {
          required_error: 'startMonth is required',
        })
        .optional(),
      endMonth: z
        .enum([...AcademicMonths] as [string, ...string[]], {
          required_error: 'endMonth is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Title and code both should be provided',
    }
  )

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}
