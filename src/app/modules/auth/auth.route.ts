import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { LoginUser, RefreshToken } from './auth.controller'
import { authValidation } from './auth.validation'

const router = express.Router()

router.post('/login', validateRequest(authValidation.loginZodSchema), LoginUser)
router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenZodSchema),
  RefreshToken
)

export const AuthRoutes = router
