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

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  createSemester
)

router.get('/:id', GetSingleSemester)

router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema),
  UpdateSemester
)

router.delete('/:id', DeleteSemester)

router.get('/', getSemesters)

export const AcademicSemesterRoutes = router
