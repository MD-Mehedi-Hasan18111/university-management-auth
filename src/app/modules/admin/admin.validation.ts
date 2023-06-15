import { z } from 'zod'
import { bloodGroup, gender } from './admin.constants'

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'first name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'last name is required',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'date of birth is required',
      }),
      email: z.string({
        required_error: 'email is required',
      }),
      contactNo: z.string({
        required_error: 'contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'emergency contact number is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: 'present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanent address is required',
      }),
      managementDepartment: z.string({
        required_error: 'management department is required',
      }),
      designation: z.string({
        required_error: 'designation is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
})

const updateAdminZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    managementDepartment: z.string().optional(),
    designation: z.string().optional(),
    profileImage: z.string().optional(),
  }),
})

export const adminValidation = {
  createAdminZodSchema,
  updateAdminZodSchema,
}
