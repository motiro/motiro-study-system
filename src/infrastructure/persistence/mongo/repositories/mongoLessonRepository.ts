import { LessonRepository } from 'domain/repositories/lessonRepository'
import { Lesson } from 'domain/entities/lessons'
import { lessonModel } from '../models'
import { Document, ObjectId } from 'mongoose'

interface LessonDocument extends Document {
  _id: ObjectId
  id: string
  instructorId: string
  studentId: string
  dateId: string
  files: []
}

export class MongoLessonRepository implements LessonRepository {
  async findById(id: string): Promise<Lesson | null> {
    const result: LessonDocument | null = await lessonModel.findById(id)

    if (result) {
      return new Lesson(result, id)
    }

    return null
  }
  async save(lesson: Lesson): Promise<Lesson> {
    const result: LessonDocument = (await lessonModel.create(lesson)).toObject()

    return new Lesson(
      {
        instructorId: result.instructorId,
        studentId: result.studentId,
        dateId: result.dateId,
        files: result.files,
      },
      result.id
    )
  }
  async uploadFile(id: string, file: LessonFile): Promise<void> {
    await lessonModel.findOneAndUpdate(
      { _id: id },
      { $push: { files: file } },
      { new: true, runValidators: true }
    )
  }
  async delete(id: string): Promise<void> {
    await lessonModel.deleteOne().where({ _id: id })
  }
  async findAll(): Promise<Lesson[]> {
    const result: LessonDocument[] = await lessonModel.find()

    const lessons: Lesson[] = []

    for (let item of result) {
      const lesson: Lesson = {
        id: item._id.toString(),
        instructorId: item.instructorId,
        studentId: item.studentId,
        dateId: item.dateId,
        files: item.files
      }

      lessons.push(lesson)
    }

    return lessons
  }
  async count(): Promise<number> {
    return await lessonModel.countDocuments()
  }
}
