import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import {
  DeleteFaculty,
  GetSingleFaculty,
  UpdateFaculty,
  getFaculties,
} from './faculty.controller'
import { facultyValidation } from './faculty.validation'

const router = express.Router()

router.get('/:id', GetSingleFaculty)

router.patch(
  '/:id',
  validateRequest(facultyValidation.updateFacultyZodSchema),
  UpdateFaculty
)

router.delete('/:id', DeleteFaculty)

router.get('/', getFaculties)

export const FacultyRoutes = router
