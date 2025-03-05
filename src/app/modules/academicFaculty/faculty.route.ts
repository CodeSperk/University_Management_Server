import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyValidationSchema),
  FacultyControllers.createFacultyControllers,
);
router.get('/', FacultyControllers.getAllFacultyController);

router.get('/:facultyId', FacultyControllers.getFacultiesByIdController);

router.patch(
  '/:facultyId',
  validateRequest(FacultyValidation.updateFacultyValidationSchema),
  FacultyControllers.updateFacultyControllers,
);

export const FacultyRoutes = router;
