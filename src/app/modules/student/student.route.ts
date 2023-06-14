import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { studentValidation } from './student.validation'
import {
  GetSingleStudent,
  UpdateStudent,
  getStudents,
} from './student.controller'

const router = express.Router()

router.get('/:id', GetSingleStudent)

router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentZodSchema),
  UpdateStudent
)

// router.delete('/:id', DeleteStudent)

router.get('/', getStudents)

export const StudentRoutes = router
