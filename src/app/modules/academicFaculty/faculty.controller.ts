import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';
import httpStatus from 'http-status';

const createFacultyControllers = catchAsync(async (req, res) => {
  const faculty = req.body;

  const result = await FacultyServices.createFacultyIntoDB(faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successful',
    data: result,
  });
});

const getAllFacultyController = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB();

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Successfully',
    data: result,
  });
});

const getFacultiesByIdController = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyServices.getFacultyByIdFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successful',
    data: result,
  });
});

const updateFacultyControllers = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyServices.updateFacultyIntoDB(facultyId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successful',
    data: result,
  });
});

export const FacultyControllers = {
  createFacultyControllers,
  getAllFacultyController,
  getFacultiesByIdController,
  updateFacultyControllers,
};
