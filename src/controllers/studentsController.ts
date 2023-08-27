import { Request, Response } from 'express';
import { studentModel } from '../models/studentModel';

export const createStudent = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const student = await studentModel.create({ name, email, password });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar aluno.' });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const { name, email, password } = req.body;

  try {
    const student = await studentModel.findByIdAndUpdate(
      studentId,
      { name, email, password },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Aluno não encontrado.' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar aluno.' });
  }
};

export const listStudents = async (_req: Request, res: Response) => {
  try {
    const students = await studentModel.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar alunos.' });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const studentId = req.params.id;

  try {
    const student = await studentModel.findByIdAndDelete(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Aluno não encontrado.' });
    }

    res.json({ message: 'Aluno excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir aluno.' });
  }
};