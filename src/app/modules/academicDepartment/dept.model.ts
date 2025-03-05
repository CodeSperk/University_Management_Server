import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import AppError from '../../errors/AppError';
import { TDepartment } from './dept.interface';

const departmentSchema = new Schema<TDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
  },
);
departmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await Department.findOne({ name: this.name });

  if (isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Department is already exists');
  }
  next();
});

departmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await Department.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department does not exist! ',
    );
  }

  next();
});

export const Department = model<TDepartment>('Department', departmentSchema);
