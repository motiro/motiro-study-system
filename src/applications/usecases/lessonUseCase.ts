import path from 'path'
import { UploadedFile } from 'express-fileupload'
import { InstructorUseCase, StudentUseCase } from '.'
import { MongoLessonRepository } from '@mongo/.'
import { ObjectId } from 'mongoose'
import {
  Instructor,
  Schedule,
  Student,
  Lesson,
  LessonFile,
  BadRequestError,
  NotFoundError
} from 'domain/entities'

interface LessonProps {
  instructor: Instructor
  student: Student
  date: Schedule
}

interface LessonResponse {
  id: string
  instructor: { name: string; id: string }
  student: { name: string; id: string }
  lesson_date: { date: Date; id: ObjectId }
  files: LessonFile[]
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
    return { instructor, student, date: date as Schedule }
  }

  private async handleFile(
    textFile: UploadedFile,
    userId: string
  ): Promise<LessonFile> {
    if (!textFile.mimetype.startsWith('text'))
      throw new BadRequestError('Not a text file')

    const maxSize = 1024 * 1024 * 5
    if (textFile.size > maxSize) throw new BadRequestError('File exceeds 5MB')

    const fileName = new Date().getTime() + '-' + textFile.name
    const filePath = path.join(
      __dirname,
      '../../../public/uploads/' + `${fileName}`
    )
    const file = {
      name: fileName,
      path: '/uploads/' + fileName,
      uploadedBy: userId
    }
    await textFile.mv(filePath)
    return file
  }

  async create(req: Lesson): Promise<LessonResponse> {
    const lesson = new Lesson(req)
    const { instructor, student, date } = await this.getProps(lesson)
    if (!instructor || !student || !date)
      throw new BadRequestError('Mismatch in provided IDs')

    if (date.busy)
      throw new BadRequestError(
        'A lesson is already booked for the requested schedule'
      )

    const createLesson = await this.mongoRepo.save(lesson)
    date.busy = true
    await this.instructorUseCase.updateSchedule(lesson.instructor, date)

    const response: LessonResponse = {
      id: createLesson.id!,
      instructor: { name: instructor.name, id: instructor.id! },
      student: { name: student.name, id: student.id! },
      lesson_date: { date: date.date!, id: date._id! },
      files: createLesson.files
    }
    return response
  }

  async uploadFile(req: {
    lessonId: string
    userId: string
    textFile: UploadedFile | UploadedFile[]
  }): Promise<void> {
    if (!req.textFile) throw new Error('No file was uploaded')

    if (Object.keys(req.textFile)[0] === '0') {
      for (const doc of Object.values(req.textFile)) {
        const file = await this.handleFile(doc, req.userId)
        await this.mongoRepo.uploadFile(req.lessonId, file)
      }
      return
    }
    const file = await this.handleFile(req.textFile as UploadedFile, req.userId)
    await this.mongoRepo.uploadFile(req.lessonId, file)
  }

  async listOne(id: string): Promise<LessonResponse> {
    const lesson = await this.mongoRepo.findById(id)
    if (!lesson) throw new NotFoundError(`Lesson not found`)
    const { instructor, student, date } = await this.getProps(lesson)

    const response: LessonResponse = {
      id: lesson.id!,
      instructor: { name: instructor.name, id: instructor.id! },
      student: { name: student.name, id: student.id! },
      lesson_date: { date: date.date!, id: date._id! },
      files: lesson.files
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
        id: lesson.id!,
        instructor: { name: instructor.name, id: instructor.id! },
        student: { name: student.name, id: student.id! },
        lesson_date: { date: date.date!, id: date._id! },
        files: lesson.files
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
