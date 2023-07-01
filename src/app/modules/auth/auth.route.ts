import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { ChangePassword, LoginUser, RefreshToken } from './auth.controller'
import { authValidation } from './auth.validation'
import { auth } from '../../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.post('/login', validateRequest(authValidation.loginZodSchema), LoginUser)
router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenZodSchema),
  RefreshToken
)

router.post(
  '/change-password',
  validateRequest(authValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  ChangePassword
)

export const AuthRoutes = router
