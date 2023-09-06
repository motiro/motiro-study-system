import { InstructorRepository } from 'domain/repository/instructorRepository'
import { Instructor } from 'domain/entities/instructor'
import { BadRequestError, NotFoundError } from 'domain/entities/error'

export class InstructorUseCase {
  constructor(private instructorRepository: InstructorRepository) {}

  async create(request: Instructor): Promise<Instructor> {
    const instructorExists = await this.instructorRepository.findInstructorById(
      request.id!
    )
    if (instructorExists) {
      throw new BadRequestError('Instructor already exists')
    }

    const instructor = new Instructor(request)

    const response = await this.instructorRepository.saveInstructor(instructor)

    return response
  }

  async listAll(): Promise<Instructor[]> {
    const response = await this.instructorRepository.getAllInstructors()

    return response
  }

  async listOne(id: string): Promise<Instructor> {
    const instructorExists =
      await this.instructorRepository.findInstructorById(id)

    if (!instructorExists) {
      throw new NotFoundError('Instructor does not exist')
    }

    return instructorExists
  }
  async update(id: string, request: Instructor): Promise<void> {
    const instructorExists =
      await this.instructorRepository.findInstructorById(id)

    if (!instructorExists) {
      throw new NotFoundError('Instructor does not exist')
    }

    const instructor = new Instructor(request, id)

    return await this.instructorRepository.updateInstructor(instructor)
  }

  async delete(id: string): Promise<void> {
    const instructorExists =
      await this.instructorRepository.findInstructorById(id)

    if (!instructorExists) {
      throw new NotFoundError('Instructor does not exist')
    }

    await this.instructorRepository.deleteInstructor(id)
  }

  async countDocuments(): Promise<number> {
    return await this.instructorRepository.countInstructors()
  }

  async comparePassword(id: string, password: string): Promise<boolean> {
    return this.instructorRepository.comparePassword(id, password)
  }

  whoAmI(): string {
    return this.instructorRepository.whoAmI()
  }
}
