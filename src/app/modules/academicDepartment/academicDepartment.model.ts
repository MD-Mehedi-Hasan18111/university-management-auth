import { Schema, model } from 'mongoose'

import {
  IAcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const AcademicDepartment = model<IAcademicDepartment, IAcademicDepartmentModel>(
  'AcademicDepartment',
  academicDepartmentSchema
)

export default AcademicDepartment
