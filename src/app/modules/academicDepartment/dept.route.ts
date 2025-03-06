import express from 'express';
import { DepartmentControllers } from './dept.controller';
import validateRequest from '../../middlewares/validateRequest';
import { DepartmentValidation } from './dept.validation';

const router = express.Router();

router.post(
  '/create-department',
  // validateRequest(DepartmentValidation.createDepartmentValidationSchema),
  DepartmentControllers.createDepartment,
);

router.get('/', DepartmentControllers.GetAllDepartments);

router.get('/:departmentId', DepartmentControllers.GetDepartmentById);

router.patch(
  '/:departmentId',
  validateRequest(DepartmentValidation.updateDepartmentValidationSchema),
  DepartmentControllers.UpdateDepartment,
);

export const DepartmentRoutes = router;
