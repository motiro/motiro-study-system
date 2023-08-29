import { MongoRepository } from '@mongo/mongoRepository'
import { Admin, showAdmin } from 'domain/entities/admin'
import { Schema } from 'mongoose'

export class AdminUseCase {
  constructor(private mongoRepo: MongoRepository) {}

  async create(req: Admin): Promise<showAdmin> {
    const admin = new Admin(req)
    const response = await this.mongoRepo.saveAdmin(admin)
    return response
  }

  async listOne(id: string): Promise<Schema<Admin>> {
    const response = await this.mongoRepo.findAdminById(id)
    if (!response) throw new Error(`No admin with id: ${id}`)
    return response
  }

  async listAll(): Promise<Schema<Admin>[]> {
    const response = await this.mongoRepo.findAllAdmins()
    return response
  }

  async update(req: Admin): Promise<void> {
    const adminExists = await this.mongoRepo.findAdminById(req.id!)

    if (!adminExists) {
      throw new Error('Admin not found')
    }

    const admin = new Admin(req, req.id)
    await this.mongoRepo.updateAdmin(admin)
  }

  async delete(id: string): Promise<void> {
    const adminExists = await this.mongoRepo.findAdminById(id)

    if (!adminExists) {
      throw new Error('Admin does not exist')
    }

    await this.mongoRepo.deleteAdmin(id)
  }
}
