import config from '../../config';
import { AcademicSemester } from '../academicSemester/as.model';
import { IStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
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

  userData.id = await generateStudentId(admissionSemester);

  //create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payLoad.id = newUser.id;
    payLoad.user = newUser._id;

    const newStudent = await StudentModel.create(payLoad);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
