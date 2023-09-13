import 'dotenv/config'
import { LessonRepoTest } from './lessonRepoTest'
import { InstructorRepoTest, dateId } from './instructorRepoTest'
import { StudentRepoTest } from './studentRepoTest'
import { Lesson } from '@entities/lessons'
import { LessonUseCase, InstructorUseCase, StudentUseCase } from '@usecases/.'

const instructorUseCase = new InstructorUseCase(new InstructorRepoTest())
const studentUseCase = new StudentUseCase(new StudentRepoTest())

const lessonRepoTest = new LessonRepoTest()
const lessonUseCase = new LessonUseCase(
  lessonRepoTest,
  instructorUseCase,
  studentUseCase
)

const lessonObj: Lesson = {
  instructor: 'testId',
  student: 'testId',
  date: dateId.toString()
}

describe('Lesson', () => {
  it('should throw not found error', async () => {
    const newLesson = async () =>
      await lessonUseCase.create({ ...lessonObj, instructor: 'notFound' })
    expect(() => newLesson()).rejects.toThrow('User not found')
  })

  it('should create lesson', async () => {
    const expected = {
      id: undefined,
      instructor: { id: 'testId', name: 'InstructorTest' },
      lesson_date: {
        date: new Date('2023-09-20T00:00:00.000Z'),
        id: dateId
      },
      student: { id: 'testId', name: 'StudentTest' }
    }

    const newLesson = await lessonUseCase.create(lessonObj)
    expect(newLesson).toEqual(expected)
  })
})
