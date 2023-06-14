import express from 'express'
import { CreateFaculty, CreateStudent } from './users.controller'
import validateRequest from '../../../middlewares/validateRequest'
import { userValidation } from './user.validation'
import { facultyValidation } from '../faculty/faculty.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(userValidation.createUserZodSchema),
  CreateStudent
)

router.post(
  '/create-faculty',
  validateRequest(facultyValidation.createFacultyZodSchema),
  CreateFaculty
)
export const UserRoutes = router
