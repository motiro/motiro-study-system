import express from 'express';
import studentController from '../controllers/studentsController';
import { authMiddleware } from '../applications/middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware.authUser, authMiddleware.checkRole('admin'), studentController.create);
router.patch('/:id', authMiddleware.authUser, authMiddleware.checkRole('student'), studentController.update);
router.get('/', authMiddleware.authUser, studentController.list);
router.get('/:id', authMiddleware.authUser, studentController.listStudent);
router.delete('/:id', authMiddleware.authUser, authMiddleware.checkRole('admin'), studentController.delete);

export default router;
