import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { GetSingleAdmin, UpdateAdmin, getAllAdmin } from './admin.controller'
import { adminValidation } from './admin.validation'

const router = express.Router()

router.get('/:id', GetSingleAdmin)

router.patch(
  '/:id',
  validateRequest(adminValidation.updateAdminZodSchema),
  UpdateAdmin
)

// router.delete('/:id', DeleteStudent)

router.get('/', getAllAdmin)

export const AdminRoutes = router
