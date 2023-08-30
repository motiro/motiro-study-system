import express from 'express';
import studentController from '../controllers/studentsController';

const router = express.Router();

router.post('/', studentController.create);
router.put('/:id', studentController.update);
router.get('/', studentController.list);
router.delete('/:id', studentController.delete);

export default router;