import { IStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (studentData: IStudent) => {
  if (await StudentModel.isUserExists(studentData.id)) {
    throw new Error('User already Exists');
  }

  const result = await StudentModel.create(studentData); //built in static method

  // const student = new StudentModel(studentData); //created instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already Exists');
  // }

  // const result = await student.save(); //build in instance methods
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
