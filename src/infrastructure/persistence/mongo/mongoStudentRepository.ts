import { Student } from 'domain/entities/students'
import { StudentRepository } from 'domain/repository/studentRepository'
import { Document, ObjectId } from 'mongoose'

import { instructorModel } from './instructorModel'
import { studentModel } from './studentModel'

interface StudentDocument extends Document {
  _id: ObjectId
  id: string
  name: string
  email: string
  role: string
}

export class MongoStudentRepository implements StudentRepository {
  async findStudentById(id: string): Promise<Student | null> {
    const result: StudentDocument = await studentModel
      .findById(id)
      .select('-password')

    if (result) {
      return new Student(result)
    }

    return null
  }
  async saveStudent(student: Student): Promise<Student> {
    const result: StudentDocument = (
      await studentModel.create(student)
    ).toObject()

    return new Student(
      {
        name: result.name,
        email: result.email,
        role: result.role
      },
      result.id
    )
  }
  async updateStudent(student: Student): Promise<void> {
    await instructorModel.updateOne({ _id: student.id }, student)
  }
  async deleteStudent(id: string): Promise<void> {
    await instructorModel.deleteOne().where({ _id: id })
  }
  async getAllStudents(): Promise<Student[]> {
    const result: StudentDocument[] = await studentModel
      .find()
      .select('-password')

    const students: Student[] = []

    for (let item of result) {
      const student: Student = {
        id: item._id.toString(),
        name: item.name,
        email: item.email,
        role: item.role
      }

      students.push(student)
    }

    return students
  }
}
