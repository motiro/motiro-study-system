import { StudentRepository } from 'domain/repository/studentRepository'
import { Student } from 'domain/entities/students'
import { BadRequestError, NotFoundError } from 'domain/entities/error'

export class StudentUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async create(request: Student): Promise<Student> {
    const studentExists = await this.studentRepository.findStudentById(
      request.id!
    )
    if (studentExists) {
      throw new BadRequestError('Student already exists')
    }

    const student = new Student(request)

    const response = await this.studentRepository.saveStudent(student)

    return response
  }

  async listAll(): Promise<Student[]> {
    const response = await this.studentRepository.getAllStudents()

    return response
  }

  async listOne(id: string): Promise<Student> {
    const studentExists = await this.studentRepository.findStudentById(id)

    if (!studentExists) {
      throw new NotFoundError('Student does not exist')
    }

    return studentExists
  }
  async update(id: string, request: Student): Promise<void> {
    const studentExists = await this.studentRepository.findStudentById(id)

    if (!studentExists) {
      throw new NotFoundError('Student does not exist')
    }

    const student = new Student(request, id)

    return await this.studentRepository.updateStudent(student)
  }

  async delete(id: string): Promise<void> {
    const studentExists = await this.studentRepository.findStudentById(id)

    if (!studentExists) {
      throw new NotFoundError('Student does not exist')
    }

    await this.studentRepository.deleteStudent(id)
  }
}
