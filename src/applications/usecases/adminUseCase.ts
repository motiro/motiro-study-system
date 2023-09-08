import { Admin } from 'domain/entities/admin'
import { NotFoundError } from 'domain/entities/error'
import { AdminRepository } from 'domain/repositories/adminRepository'

export class AdminUseCase {
  constructor(private adminRepository: AdminRepository) {}

  async create(req: Admin): Promise<Admin> {
    const admin = new Admin(req)
    const response = await this.adminRepository.save(admin)
    return response
  }

  async listOne(id: string): Promise<Admin> {
    const response = await this.adminRepository.findById(id)
    if (!response) throw new NotFoundError(`User not found`)
    return response
  }

  async listAll(): Promise<Admin[]> {
    const response = await this.adminRepository.findAll()
    return response
  }

  async update(req: Admin): Promise<void> {
    const adminExists = await this.adminRepository.findById(req.id!)

    if (!adminExists) {
      throw new NotFoundError('User not found')
    }

    const admin = new Admin(req, req.id)
    await this.adminRepository.update(admin)
  }

  async delete(id: string): Promise<void> {
    const adminExists = await this.adminRepository.findById(id)

    if (!adminExists) {
      throw new NotFoundError('User not found')
    }

    await this.adminRepository.delete(id)
  }

  async countDocuments(): Promise<number> {
    return await this.adminRepository.counts()
  }

  async comparePassword(id: string, password: string): Promise<boolean> {
    return this.adminRepository.comparePassword(id, password)
  }

  whoAmI(): string {
    return this.adminRepository.whoAmI()
  }
}
