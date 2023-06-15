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

const router = express.Router()

router.post(
  '/create-management-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  createManagementDepartments
)

router.get('/:id', GetSingleManagementDepartment)

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  UpdateManagementDepartment
)

router.delete('/:id', DeleteManagementDepartment)

router.get('/', getManagementDepartments)

export const ManagementDepartmentmentRoutes = router
