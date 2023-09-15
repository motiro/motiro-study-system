import { InstructorRepository } from 'domain/repositories/instructorRepository'
import { Instructor, Schedule } from 'domain/entities/instructor'
import { NotFoundError } from 'domain/entities/error'

export class InstructorUseCase {
  constructor(private instructorRepository: InstructorRepository) {}

  async create(request: Instructor): Promise<Instructor> {
    const instructor = new Instructor(request)

    const response = await this.instructorRepository.save(instructor)

    return response
  }

  async listAll(): Promise<Instructor[]> {
    const response = await this.instructorRepository.findAll()

    return response
  }

  async listOne(id: string): Promise<Instructor> {
    const instructorExists = await this.instructorRepository.findById(id)

    if (!instructorExists) {
      throw new NotFoundError('User not found')
    }

    return instructorExists
  }

  async update(id: string, request: Instructor): Promise<void> {
    const instructorExists = await this.instructorRepository.findById(id)

    if (!instructorExists) {
      throw new NotFoundError('User not found')
    }

    const instructor = new Instructor(request, id)

    return await this.instructorRepository.update(instructor)
  }

  async updateSchedule(id: string, request: Schedule): Promise<void> {
    const instructorExists = await this.instructorRepository.findById(id)

    if (!instructorExists) {
      throw new NotFoundError('User not found')
    }

    return await this.instructorRepository.updateSchedule(id, request)
  }

  async delete(id: string): Promise<void> {
    const instructorExists = await this.instructorRepository.findById(id)

    if (!instructorExists) {
      throw new NotFoundError('User not found')
    }

    await this.instructorRepository.delete(id)
  }

  async countDocuments(): Promise<number> {
    return await this.instructorRepository.count()
  }

  async comparePassword(id: string, password: string): Promise<boolean> {
    return this.instructorRepository.comparePassword(id, password)
  }

  whoAmI(): string {
    return this.instructorRepository.whoAmI()
  }
}
