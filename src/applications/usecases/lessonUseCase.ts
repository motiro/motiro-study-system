import { Lesson } from 'domain/entities/lessons'
import { Schedule } from 'domain/entities/instructor'
import { InstructorUseCase, StudentUseCase } from '.'
import { BadRequestError, NotFoundError } from 'domain/entities/error'
import { MongoLessonRepository } from '@mongo/.'

export class LessonUseCase {
  constructor(
    private mongoRepo: MongoLessonRepository,
    private instructorUseCase: InstructorUseCase,
    private studentUseCase: StudentUseCase
  ) {}

  private async getProps(lesson: Lesson) {
    const instructor = await this.instructorUseCase.listOne(lesson.instructor)
    const student = await this.studentUseCase.listOne(lesson.student)

    const getDate = () => {
      const schedule: Schedule[] = instructor.schedule
      for (const s of schedule) {
        if (s._id?.toString() === lesson.date.toString()) return s
      }
    }
    const date = getDate()

    return { instructor, student, date }
  }

  async create(req: Lesson): Promise<any> {
    const lesson = new Lesson(req)
    const { instructor, student, date } = await this.getProps(lesson)

    if (!instructor || !student || !date) throw new BadRequestError('Not found')
    if (date.busy === true) throw new BadRequestError('Busy')

    const createLesson = await this.mongoRepo.save(lesson)
    date.busy = true
    await this.instructorUseCase.updateSchedule(lesson.instructor, date)

    const response = {
      instructor: { name: instructor.name, id: instructor.id },
      student: { name: student.name, id: student.id },
      lesson_date: { date: date?.date, id: date?._id },
      id: createLesson.id
    }
    return response
  }

  async listOne(id: string): Promise<object> {
    const lesson = await this.mongoRepo.findById(id)
    if (!lesson) throw new NotFoundError(`Lesson not found`)
    const { instructor, student, date } = await this.getProps(lesson)
    if (!instructor || !student || !date) throw new BadRequestError('Not found')

    const response = {
      instructor: { name: instructor.name, id: instructor.id },
      student: { name: student.name, id: student.id },
      lesson_date: { date: date?.date, id: date?._id },
      id: lesson.id
    }
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
    return response
  }

  async delete(id: string): Promise<void> {
    const lesson = await this.mongoRepo.findById(id)

    if (!lesson) {
      throw new NotFoundError('Lesson not found')
    }

    const { date } = await this.getProps(lesson)
    if (date) {
      date.busy = false
      await this.instructorUseCase.updateSchedule(lesson.instructor, date)
    }
    await this.mongoRepo.delete(id)
  }
}
