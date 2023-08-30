import { Request, Response } from 'express';
import { studentModel } from '@mongo/studentModel';

class StudentController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const student = new studentModel({ name, email, password });
      await student.save();
      return res.status(201).json(student);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create student' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const student = await studentModel.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true }
      );
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      return res.json(student);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update student' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const students = await studentModel.find();
      return res.json(students);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch students' });
    }
  }

  async listStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const student = await studentModel.findById(id);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      return res.json(student);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch student' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedStudent = await studentModel.findByIdAndDelete(id);
      if (!deletedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
      return res.json(deletedStudent);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete student' });
    }
  }
}

export default new StudentController();
