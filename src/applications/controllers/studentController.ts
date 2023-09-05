import { Request, Response } from 'express'
import { NotFoundError } from 'domain/entities/error'
import { studentModel } from '@mongo/studentModel'
import { authMiddleware } from 'applications/middlewares/authMiddleware'

class StudentController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body
    const student = new studentModel({ name, email, password })
    await student.save()
    return res.status(201).json(student)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, email, password } = req.body
    const student = await studentModel.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    )
    return res.json(student)
  }

  async list(_: Request, res: Response) {
    const students = await studentModel.find()
    return res.json(students)
  }

  async listStudent(req: Request, res: Response) {
    const { id } = req.params
    const student = await studentModel.findById(id)
    if (!student) {
      throw new NotFoundError('User not found')
    }
    authMiddleware.checkUserPermissions(req.body, student._id)
    return res.json(student)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    authMiddleware.checkUserPermissions(req.body, id)
    const deletedStudent = await studentModel.findByIdAndDelete(id)
    if (!deletedStudent) {
      throw new NotFoundError('User not found')
    }
    return res.status(200).send()
  }
}

export default new StudentController()
