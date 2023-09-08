import { StudentRepository } from 'domain/repositories/studentRepository'
import { Student } from 'domain/entities/students'
import { BadRequestError, NotFoundError } from 'domain/entities/error'

export class StudentUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async create(request: Student): Promise<Student> {
    const studentExists = await this.studentRepository.findById(request.id!)
    if (studentExists) {
      throw new BadRequestError('User already exists')
    }

    const student = new Student(request)

    const response = await this.studentRepository.save(student)

    return response
  }

  async listAll(): Promise<Student[]> {
    const response = await this.studentRepository.findAll()

    return response
  }

  async listOne(id: string): Promise<Student> {
    const studentExists = await this.studentRepository.findById(id)

    if (!studentExists) {
      throw new NotFoundError('User not found')
    }

    return studentExists
  }
  async update(id: string, request: Student): Promise<void> {
    const studentExists = await this.studentRepository.findById(id)

    if (!studentExists) {
      throw new NotFoundError('User not found')
    }

    const student = new Student(request, id)

    return await this.studentRepository.update(student)
  }

  async delete(id: string): Promise<void> {
    const studentExists = await this.studentRepository.findById(id)

    if (!studentExists) {
      throw new NotFoundError('User not found')
    }

    await this.studentRepository.delete(id)
  }

  async countDocuments(): Promise<number> {
    return await this.studentRepository.counts()
  }

  async comparePassword(id: string, password: string): Promise<boolean> {
    return this.studentRepository.comparePassword(id, password)
  }

  whoAmI(): string {
    return this.studentRepository.whoAmI()
  }
}
