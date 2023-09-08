import { Instructor, Schedule } from 'domain/entities/instructor'
import { InstructorRepository } from 'domain/repositories/instructorRepository'
import { Document, isValidObjectId, ObjectId } from 'mongoose'

import { instructorModel } from '../models/instructorModel'

interface InstructorDocument extends Document {
  _id: ObjectId
  id: string
  name: string
  email: string
  specialty: string[]
  schedule: Schedule[]
  role: string
}

export class MongoInstructorRepository implements InstructorRepository {
  async findById(id: string): Promise<Instructor | null> {
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
  async save(instructor: Instructor): Promise<Instructor> {
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
  async update(instructor: Instructor): Promise<void> {
    await instructorModel.updateOne({ _id: instructor.id }, instructor)
  }
  async delete(id: string): Promise<void> {
    await instructorModel.deleteOne().where({ _id: id })
  }
  async findAll(): Promise<Instructor[]> {
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

  async count(): Promise<number> {
    return await instructorModel.countDocuments()
  }

  async comparePassword(id: string, password: string): Promise<boolean> {
    const user = await instructorModel.findById(id)
    if (!user) return false
    return await user?.comparePassword(password)
  }

  whoAmI(): string {
    const user = new Instructor({
      name: '',
      email: '',
      specialty: [],
      schedule: []
    })
    return user.role || 'instructor'
  }
}
