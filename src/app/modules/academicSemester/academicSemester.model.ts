import { Schema, model } from 'mongoose'
import { IAcademicModel, IAcademicSemester } from './academicSemester.interface'
import {
  AcademicCodes,
  AcademicMonths,
  AcademicTitles,
} from './academicSemester.constants'

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

const AcademicSemester = model<IAcademicSemester, IAcademicModel>(
  'AcademicSemester',
  academicSemesterSchema
)

export default AcademicSemester
