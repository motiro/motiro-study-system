import { Schema } from 'mongoose'
import { adminModel } from '.'
import { Admin, showAdmin } from 'domain/entities/admin'
import { AdminRepository } from 'domain/repository/adminRepository'

export class MongoRepository implements AdminRepository {
  // Admin methods

  async findAdminById(id: string): Promise<Schema<Admin> | null> {
    const result = await adminModel.findById(id)
    return result
  }
  async findAllAdmins(): Promise<Schema<Admin>[]> {
    const result = await adminModel.find()
    return result
  }
  async saveAdmin(admin: Admin): Promise<showAdmin> {
    const result = await adminModel.create(admin)
    const id = result._id.toString()
    const adminObj: showAdmin = new Admin(result as unknown as Admin, id)
    delete adminObj.password
    return adminObj
  }
  async updateAdmin(admin: Admin): Promise<void> {
    await adminModel.updateOne({ _id: admin.id }, admin)
  }
  async deleteAdmin(id: string): Promise<void> {
    await adminModel.deleteOne().where({ _id: id })
  }
}
