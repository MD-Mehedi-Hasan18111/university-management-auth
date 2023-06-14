import express from 'express'
import { CreateStudent } from './users.controller'
import validateRequest from '../../../middlewares/validateRequest'
import { userValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(userValidation.createUserZodSchema),
  CreateStudent
)

export const UserRoutes = router
