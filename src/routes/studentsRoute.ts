import express from 'express';
import studentController from '../controllers/studentsController';

const router = express.Router();

router.post('/', studentController.create);
router.patch('/:id', studentController.update);
router.get('/', studentController.list);
router.get('/:id', studentController.listStudent);
router.delete('/:id', studentController.delete);

export default router;
