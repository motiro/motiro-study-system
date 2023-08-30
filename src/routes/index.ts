import express from 'express'
import studentRoutes from './studentsRoute';

const router = express.Router();

router.use('/students', studentRoutes);

export default router
