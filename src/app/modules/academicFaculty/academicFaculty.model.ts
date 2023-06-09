import { Schema, model } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import status from 'http-status'
import {
  IAcademicFacultryModel,
  IAcademicFaculty,
} from './academicFaculty.interface'

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

academicFacultySchema.pre('save', async function (next) {
  const isExist = await AcademicFaculty.findOne({
    title: this.title,
  })
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic Faculty is already exist!')
  }
  next()
})

const AcademicFaculty = model<IAcademicFaculty, IAcademicFacultryModel>(
  'AcademicFaculty',
  academicFacultySchema
)

export default AcademicFaculty
