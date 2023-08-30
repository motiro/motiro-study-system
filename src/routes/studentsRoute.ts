import express from 'express';
import studentController from '../controllers/studentsController';

const path = express.Router();

path.post('/', studentController.create);
path.put('/:id', studentController.update);
path.get('/', studentController.list);
path.delete('/:id', studentController.delete);

export default path;
