import { Instructor, Schedule } from 'domain/entities/instructor'
import { InstructorRepository } from 'domain/repository/instructorRepository'

import { instructorModel } from './instructorModel'
import { StudentRepository } from 'domain/repository/studentRepository'
import { Student } from 'domain/entities/students'
import { studentModel } from './studentModel'
import { Document, ObjectId, isValidObjectId } from 'mongoose'

interface InstructorDocument extends Document {
  _id: ObjectId
  id: string
  name: string
  email: string
  specialty: string[]
  schedule: Schedule[]
  role: string
}

interface StudentDocument extends Document {
  _id: ObjectId
  id: string
  name: string
  email: string
  role: string
}

export class MongoRepository
  implements InstructorRepository, StudentRepository
{
  // Insctuctor methods

  async findInstructorById(id: string): Promise<Instructor | null> {
    if (isValidObjectId(id)) {
      const result: InstructorDocument = await instructorModel
        .findById(id)
        .select('-password')

      if (result) {
        return new Instructor(result)
      }
    }
    return null
  }
  async saveInstructor(instructor: Instructor): Promise<Instructor> {
    const result: InstructorDocument = (
      await instructorModel.create(instructor)
    ).toObject()

    return new Instructor(
      {
        name: result.name,
        email: result.email,
        specialty: result.specialty,
        schedule: result.schedule,
        role: result.role
      },
      result.id
    )
  }
  async updateInstructor(instructor: Instructor): Promise<void> {
    await instructorModel.updateOne({ _id: instructor.id }, instructor)
  }
  async deleteInstructor(id: string): Promise<void> {
    await instructorModel.deleteOne().where({ _id: id })
  }
  async getAllInstructors(): Promise<Instructor[]> {
    const result: InstructorDocument[] = await instructorModel
      .find()
      .select('-password')
      .lean()

    const instructors: Instructor[] = []

    for (let item of result) {
      const instructor: Instructor = {
        id: item._id.toString(),
        name: item.name,
        email: item.email,
        specialty: item.specialty,
        schedule: item.schedule,
        role: item.role
      }

      instructors.push(instructor)
    }

    return instructors
  }

  // Student methods

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