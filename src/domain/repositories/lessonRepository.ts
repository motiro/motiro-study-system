import { Lesson } from 'domain/entities/lessons'

export interface LessonRepository {
  findById(id: string): Promise<Lesson | null>
  findAll(): Promise<Lesson[]>
  save(lesson: Lesson): Promise<Lesson>
  delete(id: string): Promise<void>
  count(): Promise<number>
}
