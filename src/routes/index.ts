import express from 'express'
import { UserRoutes } from '../app/modules/users/users.route'
import { AcademicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../app/modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoutes } from '../app/modules/academicDepartment/academicDepartment.route'
import { StudentRoutes } from '../app/modules/student/student.route'
import { FacultyRoutes } from '../app/modules/faculty/faculty.route'

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
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
]

allRotes.forEach(route => router.use(route.path, route.route))

export default router
