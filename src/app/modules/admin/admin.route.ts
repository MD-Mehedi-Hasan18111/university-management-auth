import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import {
  DeleteAdmin,
  GetSingleAdmin,
  UpdateAdmin,
  getAllAdmin,
} from './admin.controller'
import { adminValidation } from './admin.validation'
import { auth } from '../../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  GetSingleAdmin
)

router.patch(
  '/:id',
  validateRequest(adminValidation.updateAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UpdateAdmin
)

router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN), DeleteAdmin)

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  getAllAdmin
)

export const AdminRoutes = router
