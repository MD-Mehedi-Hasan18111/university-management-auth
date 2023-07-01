import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { academicFacultyValidation } from './academicDepartment.validation'
import {
  DeleteDepartment,
  GetSingleDepartment,
  UpdateDepartment,
  createDepartment,
  getDepartments,
} from './academicDepartment.controller'
import { auth } from '../../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.post(
  '/create-department',
  validateRequest(academicFacultyValidation.createAcademicDepartmentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  createDepartment
)

router.get('/:id', GetSingleDepartment)

router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.updateAcademicDepartmentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UpdateDepartment
)

router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN), DeleteDepartment)

router.get('/', getDepartments)

export const AcademicDepartmentRoutes = router
