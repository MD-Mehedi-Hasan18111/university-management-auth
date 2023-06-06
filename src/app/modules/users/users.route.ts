import express from 'express'
import { CreateUser } from './users.controller'
import validateRequest from '../../../middlewares/validateRequest'
import { userValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(userValidation.createUserZodSchema),
  CreateUser
)

export const UserRoutes = router
