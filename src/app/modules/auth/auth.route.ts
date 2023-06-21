import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { LoginUser } from './auth.controller'
import { authValidation } from './auth.validation'

const router = express.Router()

router.post('/login', validateRequest(authValidation.loginZodSchema), LoginUser)

export const AuthRoutes = router
