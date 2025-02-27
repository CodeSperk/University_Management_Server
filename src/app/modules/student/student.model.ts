import { Schema, model } from 'mongoose';
import {
  Guardian,
  IStudent,
  LocalGuardian,
  UserName,
} from './student.interface';
// import validator from 'validator';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    // required: [true, 'First name is required'],
    // maxlength: 20,
    trim: true,
    // validate: {
    //   validator: function (fName: string) {
    //     const capitalized = fName.charAt(0).toUpperCase() + fName.slice(1);
    //     return fName === capitalized;
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    // required: [true, 'Last name is required'],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    // required: [true, "Father's name is required"],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    // required: [true, "Father's occupation is required"],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    // required: [true, "Father's contact number is required"],
    trim: true,
  },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: {
    type: String,
    // required: [true, "Mother's occupation is required"],
    trim: true,
  },
  motherContactNo: {
    type: String,
    // required: [true, "Mother's contact number is required"],
    trim: true,
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: {
    type: String,
    // required: [true, "Local guardian's occupation is required"],
    trim: true,
  },
  contactName: {
    type: String,
    // required: [true, "Local guardian's contact number is required"],
    trim: true,
  },
  address: {
    type: String,
    // required: [true, "Local guardian's address is required"],
    trim: true,
  },
});

const studentSchema = new Schema<IStudent>({
  id: {
    type: String,
    // required: [true, 'Student ID is required'],
    unique: true,
    trim: true,
  },
  name: {
    type: userNameSchema,
    // required: [true, 'Student name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: 'The gender field can only be either "male" or "female"',
    },
    // required: [true, 'Gender is required'],
  },
  email: {
    type: String,
    // required: [true, 'Email is required'],
    unique: true,
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not an email type',
    // },
  },
  dateOfBirth: { type: String }, // Optional field
  contactNo: {
    type: String,
    // required: [true, 'Contact number is required'],
    trim: true,
  },
  emergencyContactNo: {
    type: String,
    // required: [true, 'Emergency contact number is required'],
    trim: true,
  },
  bloodGroup: {
    type: String,
    // enum: {
    //   values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    //   message: '{VALUE} is not a valid blood group.',
    // },
    trim: true,
  },
  presentAddress: {
    type: String,
    // required: [true, 'Present address is required'],
    trim: true,
  },
  permanentAddress: {
    type: String,
    // required: [true, 'Permanent address is required'],
    trim: true,
  },
  guardian: {
    type: guardianSchema,
    // required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    // required: [true, 'Local guardian information is required'],
  },
  profileImg: { type: String, trim: true },
  isActive: {
    type: String,
    // enum: {
    //   values: ['active', 'blocked'],
    //   message: 'Status must be either "active" or "blocked"',
    // },
    default: 'active',
    trim: true,
  },
});

export const StudentModel = model<IStudent>('Student', studentSchema);
