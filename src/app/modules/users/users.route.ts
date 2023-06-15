import express from 'express'
import { CreateAdmin, CreateFaculty, CreateStudent } from './users.controller'
import validateRequest from '../../../middlewares/validateRequest'
import { userValidation } from './user.validation'
import { facultyValidation } from '../faculty/faculty.validation'
import { adminValidation } from '../admin/admin.validation'

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

router.post(
  '/create-admin',
  validateRequest(adminValidation.createAdminZodSchema),
  CreateAdmin
)

export const UserRoutes = router
