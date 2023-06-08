import express from 'express'
import { UserRoutes } from '../app/modules/users/users.route'
import { AcademicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route'

const router = express.Router()

const allRotes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academicSemesters',
    route: AcademicSemesterRoutes,
  },
]

allRotes.forEach(route => router.use(route.path, route.route))

export default router
