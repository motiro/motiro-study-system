import { LessonRepoTest } from './lessonRepoTest'
import { InstructorRepoTest, dateId } from './instructorRepoTest'
import { StudentRepoTest } from './studentRepoTest'
import { Lesson } from '@entities/.'
import { LessonUseCase, InstructorUseCase, StudentUseCase } from '@usecases/.'
import { UploadedFile } from 'express-fileupload'

const instructorUseCase = new InstructorUseCase(new InstructorRepoTest())
const studentUseCase = new StudentUseCase(new StudentRepoTest())

const lessonRepoTest = new LessonRepoTest()
const lessonUseCase = new LessonUseCase(
  lessonRepoTest,
  instructorUseCase,
  studentUseCase
)

const lessonObj: Lesson = {
  instructorId: 'testId',
  studentId: 'testId',
  dateId: dateId.toString(),
  files: []
}

describe('LessonUseCase', () => {
  it('should throw not found error', async () => {
    const newLesson = async () =>
      await lessonUseCase.create({ ...lessonObj, instructorId: 'notFound' })
    expect(() => newLesson()).rejects.toThrow('Instructor not found')
  })

  it('should create lesson', async () => {
    const expected = {
      id: undefined,
      instructor: { id: 'testId', name: 'InstructorTest' },
      lesson_date: {
        date: new Date('2023-09-20T00:00:00.000Z'),
        id: dateId
      },
      student: { id: 'testId', name: 'StudentTest' },
      files: []
    }

    const newLesson = await lessonUseCase.create(lessonObj)
    expect(newLesson).toEqual(expected)
  })

  it('should list one', async () => {
    const lessonId = 'testId'

    const findLesson = await lessonUseCase.listOne(lessonId)

    expect(findLesson).toBeDefined()
  })

  it('should list all', async () => {
    const lessons = await lessonUseCase.listAll()

    expect(lessons).toBeDefined()
  })

  it('should be deleted', async () => {
    const lessonId = 'testId'

    await lessonUseCase.delete(lessonId)

    const deletedLesson = await lessonRepoTest.findById(lessonId)

    expect(deletedLesson).toBeNull()
  })

  it('should count documents when there are lessons', async () => {
    const count = await lessonRepoTest.count()
    expect(count).toBeGreaterThan(0)
  })

  it('should throw an error if the lesson does not exist when list one', async () => {
    const nonExistentId = 'falseId'

    await expect(lessonUseCase.listOne(nonExistentId)).rejects.toThrow(
      'Lesson not found'
    )
  })

  it('should throw an error if the lesson does not exist when delete', async () => {
    const nonExistentId = 'falseId'

    await expect(lessonUseCase.delete(nonExistentId)).rejects.toThrow(
      'Lesson not found'
    )
  })

  it('should throw error ', async () => {
    const req = {
    lessonId: 'testId',
    userId: 'testId',
    textFile: { mimetype: '' } as unknown as UploadedFile
  }
    const newFile = async () => await lessonUseCase.uploadFile(req)
    expect(() => newFile()).rejects.toThrow('Not a text file')
  })
})
