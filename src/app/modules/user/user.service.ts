import config from '../../config';
import { IStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: IStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //set userData values
  userData.password = password || (config.default_password as string);
  userData.role = 'student';
  userData.id = '2030100002'; // custom generated id
  //remaining are set as default value

  //create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
