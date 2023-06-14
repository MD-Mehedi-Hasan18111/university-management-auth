import { z } from 'zod'
import { bloodGroup, gender } from '../student/student.constant'

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'first name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'last name is required' }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      dateOfBirth: z.string({ required_error: 'date of birth is required' }),
      email: z.string({ required_error: 'email is required' }),
      contactNo: z.string({ required_error: 'contact no is required' }),
      emergencyContactNo: z.string({
        required_error: 'emergency contact no is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: 'present addess is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanent address is required',
      }),
      designation: z.string({
        required_error: 'Designation is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
})

const updateFacultyZodSchema = z.object({
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
    designation: z.string().optional(),
    academicFaculty: z.string().optional(),
    academicDepartment: z.string().optional(),
    profileImage: z.string().optional(),
  }),
})

export const facultyValidation = {
  createFacultyZodSchema,
  updateFacultyZodSchema,
}
