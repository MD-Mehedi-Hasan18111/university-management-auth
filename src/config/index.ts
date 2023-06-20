/* eslint-disable no-undef */
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  student_default_pass: process.env.STUDENT_DEFAULT_PASSWORD,
  faculty_default_pass: process.env.FACULTY_DEFAULT_PASSWORD,
  admin_default_pass: process.env.ADMIN_DEFAULT_PASSWORD,
  bcrypt_password_salt: process.env.BCRYPT_PASSWORD_SALT,
}
