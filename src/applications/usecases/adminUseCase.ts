import { MongoRepository } from '@mongo/mongoRepository'
import { Admin } from 'domain/entities/admin'
import { NotFoundError } from 'domain/entities/error'

export class AdminUseCase {
  constructor(private mongoRepo: MongoRepository) {}

  async create(req: Admin): Promise<Admin> {
    const admin = new Admin(req)
    const response = await this.mongoRepo.saveAdmin(admin)
    return response
  }

  async listOne(id: string): Promise<Admin> {
    const response = await this.mongoRepo.findAdminById(id)
    if (!response) throw new NotFoundError(`Admin not found`)
    return response
  }

  async listAll(): Promise<Admin[]> {
    const response = await this.mongoRepo.findAllAdmins()
    return response
  }

  async update(req: Admin): Promise<void> {
    const adminExists = await this.mongoRepo.findAdminById(req.id!)

    if (!adminExists) {
      throw new NotFoundError('Admin not found')
    }

    const admin = new Admin(req, req.id)
    await this.mongoRepo.updateAdmin(admin)
  }

  async delete(id: string): Promise<void> {
    const adminExists = await this.mongoRepo.findAdminById(id)

    if (!adminExists) {
      throw new NotFoundError('Admin not found')
    }

    await this.mongoRepo.deleteAdmin(id)
  }
}