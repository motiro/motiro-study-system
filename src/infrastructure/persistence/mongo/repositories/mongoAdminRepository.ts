import { Admin } from 'domain/entities/admin'
import { AdminRepository } from 'domain/repositories/adminRepository'
import { Document, ObjectId } from 'mongoose'

import { adminModel } from '../models'

interface AdminDocument extends Document {
  _id: ObjectId
  id: string
  name: string
  email: string
  role: string
}

export class MongoAdminRepository implements AdminRepository {
  async findById(id: string): Promise<Admin | null> {
    const result: AdminDocument = await adminModel
      .findById(id)
      .select('-password')
    if (result) {
      return new Admin(result, id)
    }
    return null
  }
  async findAll(): Promise<Admin[]> {
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
  async save(admin: Admin): Promise<Admin> {
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
  async update(admin: Admin): Promise<void> {
    await adminModel.updateOne({ _id: admin.id }, admin)
  }
  async delete(id: string): Promise<void> {
    await adminModel.deleteOne().where({ _id: id })
  }

  async count(): Promise<number> {
    return await adminModel.countDocuments()
  }

  async comparePassword(id: string, password: string): Promise<boolean> {
    const user = await adminModel.findById(id)
    if (!user) return false
    return await user?.comparePassword(password)
  }

  whoAmI(): string {
    const user = new Admin({ name: '', email: '' })
    return user.role || 'admin'
  }
}
