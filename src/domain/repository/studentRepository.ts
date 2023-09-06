import { Student } from 'domain/entities/students'

export interface StudentRepository {
  findStudentById(id: string): Promise<Student | null>
  saveStudent(student: Student): Promise<Student>
  updateStudent(student: Student): Promise<void>
  deleteStudent(id: string): Promise<void>
  getAllStudents(): Promise<Student[]>
  countStudents(): Promise<number>
  comparePassword(id: string, password: string): Promise<boolean>
  whoAmI(): string
}
