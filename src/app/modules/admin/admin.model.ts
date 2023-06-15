import { Schema, model } from 'mongoose'
import { bloodGroup, gender } from './admin.constants'
import { AdminModel, IAdmin } from './admin.interface'

const adminSchema = new Schema<IAdmin>(
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
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'ManagementDepartment',
      required: true,
    },
    designation: {
      type: String,
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

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema)
