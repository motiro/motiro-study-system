import { InstructorRepository } from 'domain/repositories/instructorRepository'
import { Instructor } from 'domain/entities/instructor'
import { BadRequestError, NotFoundError } from 'domain/entities/error'

export class InstructorUseCase {
  constructor(private instructorRepository: InstructorRepository) {}

  async create(request: Instructor): Promise<Instructor> {
    const instructorExists = await this.instructorRepository.findByEmail(
      request.email
    )
    if (instructorExists) {
      throw new BadRequestError('User already exists')
    }

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
