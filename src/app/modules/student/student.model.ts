import { Schema, model } from 'mongoose';
import {
  IGuardian,
  IStudent,
  ILocalGuardian,
  // IStudentMethods,
  IStudentModel,
  IUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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

const studentSchema = new Schema<IStudent, IStudentModel>(
  {
    id: {
      type: String,
      unique: true,
      trim: true,
    },
    name: {
      type: userNameSchema,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    password: {
      type: String,
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  },
);

//mongoose virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name?.middleName} ${this.name.lastName}`;
});

//pre save middleware/hook
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounnt),
  );
  next();
});

//post save middleware
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//[ {$match: {isDeleted: {$ne : true}}}, { '$match': { id: 's1234631' } } ]
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating an custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};

//creating an custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await StudentModel.findOne({ id });
//   return existingUser;
// };

export const StudentModel = model<IStudent, IStudentModel>(
  'Student',
  studentSchema,
);
