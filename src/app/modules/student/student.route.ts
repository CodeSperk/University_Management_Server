import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.patch(
  '/:studentId',
  validateRequest(studentValidations.UpdateStudentValidationSchema),
  StudentControllers.updateStudent,
);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
