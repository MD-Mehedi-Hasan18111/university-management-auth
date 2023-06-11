import express from 'express'
import { UserRoutes } from '../app/modules/users/users.route'
import { AcademicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../app/modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoutes } from '../app/modules/academicDepartment/academicDepartment.route'

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
  {
    path: '/academicFaculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academicDepartment',
    route: AcademicDepartmentRoutes,
  },
]

allRotes.forEach(route => router.use(route.path, route.route))

export default router
