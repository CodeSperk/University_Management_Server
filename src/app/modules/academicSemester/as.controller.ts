import { AcademicSemisterServices } from './as.service';
import catchAsync from '../../utils/catchAsync';

const createAcademicSemister = catchAsync(async (req, res) => {
  const academicSemister = req.body;

  const result =
    await AcademicSemisterServices.createAcademicSemisterIntoDB(
      academicSemister,
    );

  res.status(200).json({
    success: true,
    message: 'Created Successfully',
    data: result,
  });
});

const getAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.getAcademicSemestersFromDB();

  res.status(200).json({
    success: true,
    message: 'Successful',
    data: result,
  });
});

const getSemesterById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemisterServices.getSemesterByIdFromDB(id);

  res.status(200).json({
    success: true,
    message: 'Successful',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemister,
  getAcademicSemesters,
  getSemesterById,
};
