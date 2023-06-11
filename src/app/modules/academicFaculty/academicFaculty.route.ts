import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { academicFacultyValidation } from './academicFaculty.validation'
import {
  DeleteFaculty,
  GetSingleFaculty,
  UpdateFaculty,
  createFaculty,
  getFaculties,
} from './academicFaculty.controller'

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(academicFacultyValidation.createAcademicFacultyZodSchema),
  createFaculty
)

router.get('/:id', GetSingleFaculty)

router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.updateAcademicFacultyZodSchema),
  UpdateFaculty
)

router.delete('/:id', DeleteFaculty)

router.get('/', getFaculties)

export const AcademicFacultyRoutes = router
