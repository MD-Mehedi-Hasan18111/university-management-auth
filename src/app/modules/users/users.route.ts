import express from 'express'
import { CreateAdmin, CreateFaculty, CreateStudent } from './users.controller'
import validateRequest from '../../../middlewares/validateRequest'
import { userValidation } from './user.validation'
import { facultyValidation } from '../faculty/faculty.validation'
import { adminValidation } from '../admin/admin.validation'
import { auth } from '../../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(userValidation.createUserZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CreateStudent
)

router.post(
  '/create-faculty',
  validateRequest(facultyValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CreateFaculty
)

router.post(
  '/create-admin',
  validateRequest(adminValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CreateAdmin
)

export const UserRoutes = router
