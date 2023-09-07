import { Student } from 'domain/entities/students'

export interface StudentRepository {
  findById(id: string): Promise<Student | null>
  save(student: Student): Promise<Student>
  update(student: Student): Promise<void>
  delete(id: string): Promise<void>
  findAll(): Promise<Student[]>
  counts(): Promise<number>
  comparePassword(id: string, password: string): Promise<boolean>
  whoAmI(): string
}
