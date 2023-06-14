import { z } from 'zod'
import { bloodGroup, gender } from '../student/student.constant'

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
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
      academicSemester: z.string({
        required_error: 'Academic Semester is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      gurdian: z.object({
        fatherName: z.string({ required_error: 'father name is required' }),
        fatherOccupation: z.string({
          required_error: 'father occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'father contact number is required',
        }),
        motherName: z.string({ required_error: 'mother name is required' }),
        motherOccupation: z.string({
          required_error: 'mother occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'mother contact number is required',
        }),
        address: z.string({ required_error: 'address is required' }),
      }),
      localGurdian: z.object({
        name: z.string({ required_error: 'local gurdian name is required' }),
        occupation: z.string({
          required_error: 'local gurdian occupation is required',
        }),
        contactNo: z.string({
          required_error: 'local gurdian contact no is required',
        }),
        address: z.string({
          required_error: 'local gurdian address is required',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
})

export const userValidation = {
  createUserZodSchema,
}
