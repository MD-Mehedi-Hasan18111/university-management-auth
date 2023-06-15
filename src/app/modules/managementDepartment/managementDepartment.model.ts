import { Schema, model } from 'mongoose'
import {
  IManagementDepartment,
  IManagementDepartmentModel,
} from './managementDepartment.interface'

const managementDepartmentSchema = new Schema<IManagementDepartment>(
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

const ManagementDepartment = model<
  IManagementDepartment,
  IManagementDepartmentModel
>('ManagementDepartment', managementDepartmentSchema)

export default ManagementDepartment
