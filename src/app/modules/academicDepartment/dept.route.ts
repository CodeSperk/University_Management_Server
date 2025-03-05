import express from 'express';
import { DepartmentControllers } from './dept.controller';
import validateRequest from '../../middlewares/validateRequest';
import { DepartmentValidation } from './dept.validation';

const router = express.Router();

router.post('/create-department', DepartmentControllers.createDepartmetn);

router.get('/', DepartmentControllers.GetAllDepartments);

router.get('/:departmentId', DepartmentControllers.GetDepartmentById);

router.patch(
  '/:departmentId',
  validateRequest(DepartmentValidation.updateDepertmentValidationSchema),
  DepartmentControllers.UpdateDepartment,
);

export const DepartmentRoutes = router;
