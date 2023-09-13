import { LessonRepository } from '@repositories/lessonRepository'
import { Lesson } from '@entities/.'
import { dateId, dateId2 } from './instructorRepoTest'

const lessons: Lesson[] = [
  {
    id: 'testId',
    instructor: 'testId',
    student: 'testId',
    date: dateId.toString(),
  },
  {
    id: 'testId2',
    instructor: 'testId2',
    student: 'testId2',
    date: dateId2.toString(),
  }
]

export class LessonRepoTest implements LessonRepository {
  async findById(id: string): Promise<Lesson | null> {
    for (const lesson of lessons) {
      if (lesson.id === id) return lesson
    }
    return null
  }
  async findAll(): Promise<Lesson[]> {
    const result: Lesson[] = []
    for (const lesson of lessons) {
      result.push(lesson)
    }
    return result
  }
  async save(lesson: Lesson): Promise<Lesson> {
    const result: Lesson = new Lesson(lesson)
    lessons.push(result)
    return result
  }
  async delete(id: string): Promise<void> {
    for (let i = 0; i < lessons.length; i++) {
      if (lessons[i].id === id) {
        lessons.splice(i, 1)
      }
    }
  }
  async count(): Promise<number> {
    return lessons.length
  }
}
