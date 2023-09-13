import { MongoLessonRepository } from '@mongo/mongoLessonRepository'
import { Lesson } from 'domain/entities/lessons'
import { NotFoundError } from 'domain/entities/error'
import { instructorModel } from 'infrastructure/persistence/mongo/models'
import { UploadedFile } from 'express-fileupload'
import path from 'path'
export class LessonUseCase {
  constructor(private mongoRepo: MongoLessonRepository) {}

  async create(req: Lesson): Promise<any> {
    const createLesson = new Lesson(req)
    const lesson = await this.mongoRepo.save(createLesson)

    // Just an example
    // Maybe we should create a method to change "busy" value
    // and another method to get date by ID and return it in ISO format
    await instructorModel.findOneAndUpdate(
      {
        _id: lesson.instructor,
        schedule: { $elemMatch: { _id: lesson.date } }
      },
      { $set: { 'schedule.$.busy': true } },
      { new: true, runValidators: true }
    )

    const date = await instructorModel.findOne(
      {
        _id: lesson.instructor,
        schedule: { $elemMatch: { _id: lesson.date } }
      },
      { 'schedule.$': 1 }
    )

    const response = {
      instructor: lesson.instructor,
      student: lesson.student,
      date: {
        // @ts-ignore
        time: date?.schedule[0]?.date,
        id: lesson.date
      },
      id: lesson.id
    }

    return response
  }

  async file(req: { id: string; textFile: UploadedFile }): Promise<void> {
    const lessonExists = await this.mongoRepo.findById(req.id!)
    if (!req.textFile) {
      throw new Error('No file')
    }

    const filePath = path.join(
      __dirname,
      '../../../public/uploads/' + `${req.textFile.name}`
    )
    console.log(__dirname)
    await req.textFile.mv(filePath)
    await this.mongoRepo.update({ ...lessonExists!, file: req.textFile.name })
  }

  async listOne(id: string): Promise<Lesson> {
    const response = await this.mongoRepo.findById(id)
    if (!response) throw new NotFoundError(`Lesson not found`)
    return response
  }

  async listAll(): Promise<Lesson[]> {
    const response = await this.mongoRepo.findAll()
    return response
  }

  // async update(req: Lesson): Promise<void> {
  //   const lessonExists = await this.mongoRepo.findById(req.id!)

  //   if (!lessonExists) {
  //     throw new NotFoundError('Lesson not found')
  //   }

  //   // We must implement some logic to update instructor too
  //   const lesson = new Lesson(req, req.id)
  //   await this.mongoRepo.update(lesson)
  // }

  async delete(id: string): Promise<void> {
    const lessonExists = await this.mongoRepo.findById(id)

    if (!lessonExists) {
      throw new NotFoundError('Lesson not found')
    }

    // We must free instructor schedule
    await this.mongoRepo.delete(id)
  }
}
