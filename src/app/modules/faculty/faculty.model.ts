import { Schema, model } from 'mongoose'
import { FacultyModel, IFaculty } from './faculty.interface'
import { bloodGroup, gender } from './faculty.constant'

const facultySchema = new Schema<IFaculty>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String, required: false },
        lastName: { type: String, required: true },
      },
    },
    gender: { type: String, enum: gender },
    dateOfBirth: { type: String },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    designation: { type: String, required: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    profileImage: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema)
