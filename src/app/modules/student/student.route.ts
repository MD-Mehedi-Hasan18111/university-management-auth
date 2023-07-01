import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { studentValidation } from './student.validation'
import {
  DeleteStudent,
  GetSingleStudent,
  UpdateStudent,
  getStudents,
} from './student.controller'
import { auth } from '../../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  GetSingleStudent
)

router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UpdateStudent
)

router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN), DeleteStudent)

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  getStudents
)

export const StudentRoutes = router
