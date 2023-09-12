import { InstructorUseCase, StudentUseCase } from '.'
import { MongoLessonRepository } from '@mongo/.'
import { ObjectId } from 'mongoose'
import {
  Instructor,
  Schedule,
  Student,
  Lesson,
  BadRequestError,
  NotFoundError
} from 'domain/entities'

interface LessonProps {
  instructor: Instructor
  student: Student
  date: Schedule
}

interface LessonResponse {
  instructor: { name: string; id: string }
  student: { name: string; id: string }
  lesson_date: { date: Date; id: ObjectId }
  id: string
}

export class LessonUseCase {
  constructor(
    private mongoRepo: MongoLessonRepository,
    private instructorUseCase: InstructorUseCase,
    private studentUseCase: StudentUseCase
  ) {}

  private async getProps(lesson: Lesson): Promise<LessonProps> {
    const instructor = await this.instructorUseCase.listOne(lesson.instructor)
    const student = await this.studentUseCase.listOne(lesson.student)
    const date = instructor.schedule.find(
      s => s._id?.toString() === lesson.date.toString()
    )

    if (!instructor || !student || !date)
      throw new NotFoundError('Could not fetch lesson properties')
    return { instructor, student, date }
  }

  async create(req: Lesson): Promise<LessonResponse> {
    const lesson = new Lesson(req)
    const { instructor, student, date } = await this.getProps(lesson)

    if (date.busy) throw new BadRequestError('A lesson is already booked for the requested schedule')

    const createLesson = await this.mongoRepo.save(lesson)
    date.busy = true
    await this.instructorUseCase.updateSchedule(lesson.instructor, date)

    const response: LessonResponse = {
      instructor: { name: instructor.name, id: instructor.id! },
      student: { name: student.name, id: student.id! },
      lesson_date: { date: date.date!, id: date._id! },
      id: createLesson.id!
    }
    return response
  }

  async listOne(id: string): Promise<LessonResponse> {
    const lesson = await this.mongoRepo.findById(id)
    if (!lesson) throw new NotFoundError(`Lesson not found`)
    const { instructor, student, date } = await this.getProps(lesson)
    if (!instructor || !student || !date) throw new BadRequestError('Not found')

    const response: LessonResponse = {
      instructor: { name: instructor.name, id: instructor.id! },
      student: { name: student.name, id: student.id! },
      lesson_date: { date: date.date!, id: date._id! },
      id: lesson.id!
    }
    return response
  }

  async listAll(): Promise<LessonResponse[]> {
    const lessons = await this.mongoRepo.findAll()
    const response: LessonResponse[] = []
    for (const lesson of lessons) {
      const { instructor, student, date } = await this.getProps(lesson)
      if (!instructor || !student || !date) continue

      const result: LessonResponse = {
        instructor: { name: instructor.name, id: instructor.id! },
        student: { name: student.name, id: student.id! },
        lesson_date: { date: date.date!, id: date._id! },
        id: lesson.id!
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
