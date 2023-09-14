import { Instructor, Schedule } from 'domain/entities/instructor'

export interface InstructorRepository {
  findById(id: string): Promise<Instructor | null>
  save(instructor: Instructor): Promise<Instructor>
  update(instructor: Instructor): Promise<void>
  updateSchedule(id: string, schedule: Schedule): Promise<void>
  delete(id: string): Promise<void>
  findAll(): Promise<Instructor[]>
  count(): Promise<number>
  comparePassword(id: string, password: string): Promise<boolean>
  whoAmI(): string
}
