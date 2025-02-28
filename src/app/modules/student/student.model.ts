import { Schema, model } from 'mongoose';
import {
  IGuardian,
  IStudent,
  ILocalGuardian,
  IStudentMethods,
  IStudentModel,
  IUserName,
} from './student.interface';

const userNameSchema = new Schema<IUserName>({
  firstName: {
    type: String,
    trim: true,
  },
  middleName: { type: String },
  lastName: {
    type: String,
    trim: true,
  },
});

const guardianSchema = new Schema<IGuardian>({
  fatherName: {
    type: String,
    trim: true,
  },
  fatherOccupation: {
    type: String,
    trim: true,
  },
  fatherContactNo: {
    type: String,
    trim: true,
  },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: {
    type: String,
    trim: true,
  },
  motherContactNo: {
    type: String,
    trim: true,
  },
});

const localGuardianSchema = new Schema<ILocalGuardian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: {
    type: String,
    trim: true,
  },
  contactName: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
});

const studentSchema = new Schema<IStudent, IStudentModel, IStudentMethods>({
  id: {
    type: String,
    unique: true,
    trim: true,
  },
  name: {
    type: userNameSchema,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: 'The gender field can only be either "male" or "female"',
    },
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  dateOfBirth: { type: String },
  contactNo: {
    type: String,
    trim: true,
  },
  emergencyContactNo: {
    type: String,
    trim: true,
  },
  bloodGroup: {
    type: String,
    trim: true,
  },
  presentAddress: {
    type: String,
    trim: true,
  },
  permanentAddress: {
    type: String,
    trim: true,
  },
  guardian: {
    type: guardianSchema,
  },
  localGuardian: {
    type: localGuardianSchema,
  },
  profileImg: { type: String, trim: true },
  isActive: {
    type: String,
    default: 'active',
    trim: true,
  },
});

//creating an custom instance method
studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};

export const StudentModel = model<IStudent, IStudentModel>(
  'Student',
  studentSchema,
);
