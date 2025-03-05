import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/as.model';
import { IStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
// import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payLoad: IStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //set userData values
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payLoad.admissionSemester,
  );
  if (!admissionSemester) {
    throw new Error('Academic semester not found');
  }

  const session = await mongoose.startSession();

  try {
    //start transaction
    session.startTransaction();

    userData.id = await generateStudentId(admissionSemester);

    //create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set id , _id as user
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id;

    //Create a student (Transaction -2)
    const newStudent = await StudentModel.create([payLoad], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
