import express from 'express';
import { AcademicSemesterControllers } from './as.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './as.validation';

const router = express.Router();

router.post(
  '/create-academic-semister',
  validateRequest(
    AcademicSemesterValidation.CreateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemister,
);

router.get('/', AcademicSemesterControllers.getAcademicSemesters);
router.get('/:id', AcademicSemesterControllers.getSemesterById);

export const AcademicSemisterRoutes = router;
