import express from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-Student',
  validateRequest(studentValidations.CreateStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
