import { Lesson } from '@entities'

export interface LessonRepository {
  findById(id: string): Promise<Lesson | null>
  findAll(): Promise<Lesson[]>
  save(lesson: Lesson): Promise<Lesson>
  uploadFile(id: string, file: object): Promise<void>
  delete(id: string): Promise<void>
  count(): Promise<number>
}
