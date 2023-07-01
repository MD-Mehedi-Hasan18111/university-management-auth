import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { academicSemesterValidation } from './academicSemester.validation'
import {
  DeleteSemester,
  GetSingleSemester,
  UpdateSemester,
  createSemester,
  getSemesters,
} from './academicSemester.controller'
import { auth } from '../../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  createSemester
)

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  GetSingleSemester
)

router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UpdateSemester
)

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  DeleteSemester
)

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  getSemesters
)

export const AcademicSemesterRoutes = router
