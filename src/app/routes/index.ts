import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemisterRoutes } from '../modules/academicSemester/as.route';

const router = Router();

const moduleRoutes = [
  {
    path: 'students',
    route: StudentRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemisterRoutes,
  },
];

// router.use('/students', StudentRoutes);
// router.use('/users', UserRoutes);

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
