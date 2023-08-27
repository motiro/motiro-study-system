import express from 'express';
import * as studentsController from '../controllers/studentsController';

const router = express.Router();

router.post('/students', studentsController.createStudent);
router.put('/students/:id', studentsController.updateStudent);
router.get('/students', studentsController.listStudents);
router.delete('/students/:id', studentsController.deleteStudent);

export default router;