import express from 'express'
import { CreateUser } from './users.controller'

const router = express.Router()

router.post('/create-user', CreateUser)

export default router
