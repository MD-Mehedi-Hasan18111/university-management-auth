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

const router = express.Router()

router.post(
  '/create-department',
  validateRequest(academicFacultyValidation.createAcademicDepartmentZodSchema),
  createDepartment
)

router.get('/:id', GetSingleDepartment)

router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.updateAcademicDepartmentZodSchema),
  UpdateDepartment
)

router.delete('/:id', DeleteDepartment)

router.get('/', getDepartments)

export const AcademicDepartmentRoutes = router
