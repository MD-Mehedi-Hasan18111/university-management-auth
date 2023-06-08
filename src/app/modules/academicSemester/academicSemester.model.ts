import { Schema, model } from 'mongoose'
import { IAcademicModel, IAcademicSemester } from './academicSemester.interface'
import {
  AcademicCodes,
  AcademicMonths,
  AcademicTitles,
} from './academicSemester.constants'
import ApiError from '../../../errors/ApiError'
import status from 'http-status'

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, required: true, enum: AcademicTitles },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: AcademicCodes },
    startMonth: { type: String, required: true, enum: AcademicMonths },
    endMonth: { type: String, required: true, enum: AcademicMonths },
  },
  {
    timestamps: true,
  }
)

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic Semester is already exist!')
  }
  next()
})

const AcademicSemester = model<IAcademicSemester, IAcademicModel>(
  'AcademicSemester',
  academicSemesterSchema
)

export default AcademicSemester
