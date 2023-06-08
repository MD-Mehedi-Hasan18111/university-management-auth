import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { academicSemesterValidation } from './academicSemester.validation'
import { createSemester } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  createSemester
)

export const AcademicSemesterRoutes = router
