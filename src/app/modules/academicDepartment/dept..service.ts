import { TDepartment } from './dept.interface';
import { Department } from './dept.model';

const CreateDepartmentIntoDB = async (payload: TDepartment) => {
  const result = await Department.create(payload);
  return result;
};

const GetAllDepartmentsFromDB = async () => {
  const result = await Department.find().populate('faculty');
  return result;
};

const GetDepartmentByIdFromDB = async (id: string) => {
  const result = await Department.findById(id).populate('faculty');
  return result;
};

const UpdateDepartmentIntoDB = async (
  id: string,
  payload: Partial<TDepartment>,
) => {
  const result = await Department.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const DepartmentServices = {
  CreateDepartmentIntoDB,
  GetAllDepartmentsFromDB,
  GetDepartmentByIdFromDB,
  UpdateDepartmentIntoDB,
};
