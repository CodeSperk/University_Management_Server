import { model, Schema } from 'mongoose';
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
  { timestamps: true },
);

departmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await Department.findOne({ name: this.name });

  if (isDepartmentExist) {
    throw new Error('Department is already exists');
  }

  next();
});

departmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  console.log(query._id._id);
  const isDepartmentExist = await Department.findById({ _id: query._id._id });
  console.log(isDepartmentExist);

  if (!isDepartmentExist) {
    throw new Error('Department does not exists');
  }

  next();
});

export const Department = model<TDepartment>('Department', departmentSchema);
