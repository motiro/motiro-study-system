import { MongoLessonRepository } from '@mongo/mongoLessonRepository'
import { Lesson } from 'domain/entities/lessons'
import { NotFoundError } from 'domain/entities/error'
import { instructorModel } from 'infrastructure/persistence/mongo/models'

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

  async listOne(id: string): Promise<Lesson> {
    const response = await this.mongoRepo.findById(id)
    if (!response) throw new NotFoundError(`Lesson not found`)
    return response
  }

  async listAll(): Promise<Lesson[]> {
    const response = await this.mongoRepo.findAll()
    return response
  }

  async listAll(): Promise<object[]> {
    const lessons = await this.mongoRepo.findAll()
    const response = []
    for (const lesson of lessons) {
      const { instructor, student, date } = await this.getProps(lesson)
      if (!instructor || !student || !date)
        throw new BadRequestError('Not found')

      const result = {
        instructor: { name: instructor.name, id: instructor.id },
        student: { name: student.name, id: student.id },
        lesson_date: { date: date?.date, id: date?._id },
        id: lesson.id
      }
      response.push(result)
    }

    // We must implement some logic to update instructor too
    const lesson = new Lesson(req, req.id)
    await this.mongoRepo.update(lesson)
  }

  async delete(id: string): Promise<void> {
    const lessonExists = await this.mongoRepo.findById(id)

    if (!lessonExists) {
      throw new NotFoundError('Lesson not found')
    }

    // We must free instructor schedule
    await this.mongoRepo.delete(id)
  }
}
