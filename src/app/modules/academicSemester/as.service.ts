import mongoose from 'mongoose';
import { academicSemerNameCodeMapper } from './as.constants';
import { TAcademicSemester } from './as.interface';
import { AcademicSemester } from './as.model';

const createAcademicSemisterIntoDB = async (payload: TAcademicSemester) => {
  // academicSemerNameCodeMapper["Summar"] !== 03
  if (academicSemerNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

//get semester by id
const getSemesterByIdFromDB = async (semesterId: string) => {
  const result = await AcademicSemester.findOne({
    _id: new mongoose.Types.ObjectId(semesterId),
  });
  return result;
};

export const AcademicSemisterServices = {
  createAcademicSemisterIntoDB,
  getAcademicSemestersFromDB,
  getSemesterByIdFromDB,
};
