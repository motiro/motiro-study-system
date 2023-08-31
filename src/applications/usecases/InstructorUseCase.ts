import { InstructorRepository } from 'domain/repository/instructorRepository'
import { Instructor } from 'domain/entities/instructor'

export class InstructorUseCase {
  constructor(private instructorRepository: InstructorRepository) {}

  async execute(request: Instructor): Promise<Instructor> {
    const instructorExists = await this.instructorRepository.findInstructorById(
      request.id!
    )
    if (instructorExists) {
      throw new Error('Instructor already exists.')
    }

    const instructor = new Instructor(request)

    const response = await this.instructorRepository.saveInstructor(instructor)

    return response
  }

  async list(): Promise<Instructor[]> {
    const response = await this.instructorRepository.getAllInstructors()

    return response
  }

  async listOne(id: string): Promise<Instructor> {
    const instructorExists =
      await this.instructorRepository.findInstructorById(id)

    if (!instructorExists) {
      throw new Error('Tutor does not exists')
    }

    return instructorExists
  }
  async update(id: string, request: Instructor): Promise<void> {
    const instructorExists =
      await this.instructorRepository.findInstructorById(id)

    if (!instructorExists) {
      throw new Error('Tutor does not exists')
    }

    const instructor = new Instructor(request, id)

    return await this.instructorRepository.updateInstructor(instructor)
  }

  async delete(id: string): Promise<void> {
    const instructorExists =
      await this.instructorRepository.findInstructorById(id)

    if (!instructorExists) {
      throw new Error('Tutor does not exists')
    }

    await this.instructorRepository.deleteInstructor(id)
  }
}
