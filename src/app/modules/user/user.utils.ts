import { TAcademicSemester } from '../academicSemester/as.interface';
import { User } from './user.model';

//find last student id
const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

//Required year, semester code, 4 digits
export const generateStudentId = async (payLoad: TAcademicSemester) => {
  if (!payLoad.year || !payLoad.code) {
    throw new Error('Missing required academic semester details (year/code)');
  }

  //2025010001
  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId();
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lasetSemesterCode = lastStudentId?.substring(4, 6);
  const currentSemesterCode = payLoad.code;
  const currentYear = payLoad.year;

  if (
    lastStudentId &&
    lasetSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;

  return incrementId;
};
