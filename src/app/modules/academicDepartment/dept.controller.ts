import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DepartmentServices } from './dept..service';
import httpStatus from 'http-status';

const createDepartmetn = catchAsync(async (req, res) => {
  const result = await DepartmentServices.CreateDepartmentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department has been created Successfully',
    data: result,
  });
});

const GetAllDepartments = catchAsync(async (req, res) => {
  const result = await DepartmentServices.GetAllDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Here is you all depertments',
    data: result,
  });
});

const GetDepartmentById = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const result = await DepartmentServices.GetDepartmentByIdFromDB(departmentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Here is your department',
    data: result,
  });
});

const UpdateDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const result = await DepartmentServices.UpdateDepartmentIntoDB(
    departmentId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department has been updated Successfully',
    data: result,
  });
});

export const DepartmentControllers = {
  createDepartmetn,
  GetAllDepartments,
  GetDepartmentById,
  UpdateDepartment,
};
