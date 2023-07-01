import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import {
  DeleteManagementDepartment,
  GetSingleManagementDepartment,
  UpdateManagementDepartment,
  createManagementDepartments,
  getManagementDepartments,
} from './managementDepartment.controller'
import { ManagementDepartmentValidation } from './managementDepartment.validation'
import { auth } from '../../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.post(
  '/create-management-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  createManagementDepartments
)

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  GetSingleManagementDepartment
)

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UpdateManagementDepartment
)

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  DeleteManagementDepartment
)

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  getManagementDepartments
)

export const ManagementDepartmentmentRoutes = router
