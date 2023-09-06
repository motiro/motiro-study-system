import { Admin } from 'domain/entities/admin'
import { AdminRepository } from 'domain/repository/adminRepository'
import { Document, ObjectId } from 'mongoose'

import { adminModel } from '.'

interface AdminDocument extends Document {
  _id: ObjectId
  id: string
  name: string
  email: string
  role: string
}

export class MongoAdminRepository implements AdminRepository {
  async findAdminById(id: string): Promise<Admin | null> {
    const result: AdminDocument = await adminModel
      .findById(id)
      .select('-password')
    if (result) {
      return new Admin(result)
    }
    return null
  }
  async findAllAdmins(): Promise<Admin[]> {
    const result: AdminDocument[] = await adminModel.find().select('-password')

    const admins: Admin[] = []

    for (const item of result) {
      const admin: Admin = {
        id: item._id.toString(),
        name: item.name,
        email: item.email,
        role: item.role
      }

      admins.push(admin)
    }
    return admins
  }
  async saveAdmin(admin: Admin): Promise<Admin> {
    const result: AdminDocument = (await adminModel.create(admin)).toObject()

    return new Admin(
      {
        name: result.name,
        email: result.email,
        role: result.role
      },
      result.id
    )
  }
  async updateAdmin(admin: Admin): Promise<void> {
    await adminModel.updateOne({ _id: admin.id }, admin)
  }
  async deleteAdmin(id: string): Promise<void> {
    await adminModel.deleteOne().where({ _id: id })
  }
}
