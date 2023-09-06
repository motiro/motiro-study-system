import { Admin } from 'domain/entities/admin'
import { NotFoundError } from 'domain/entities/error'
import { AdminRepository } from 'domain/repository/adminRepository'

export class AdminUseCase {
  constructor(private adminRepository: AdminRepository) {}

  async create(req: Admin): Promise<Admin> {
    const admin = new Admin(req)
    const response = await this.adminRepository.saveAdmin(admin)
    return response
  }

  async listOne(id: string): Promise<Admin> {
    const response = await this.adminRepository.findAdminById(id)
    if (!response) throw new NotFoundError(`Admin not found`)
    return response
  }

  async listAll(): Promise<Admin[]> {
    const response = await this.adminRepository.findAllAdmins()
    return response
  }

  async update(req: Admin): Promise<void> {
    const adminExists = await this.adminRepository.findAdminById(req.id!)

    if (!adminExists) {
      throw new NotFoundError('User not found')
    }

    const admin = new Admin(req, req.id)
    await this.adminRepository.updateAdmin(admin)
  }

  async delete(id: string): Promise<void> {
    const adminExists = await this.adminRepository.findAdminById(id)

    if (!adminExists) {
      throw new NotFoundError('User not found')
    }

    await this.adminRepository.deleteAdmin(id)
  }
}
