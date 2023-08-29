import { Admin, showAdmin } from 'domain/entities/admin'
import { Schema } from 'mongoose'

export interface AdminRepository {
  findAdminById(id: string): Promise<Schema<Admin> | null>
  findAllAdmins(): Promise<Schema<Admin>[]>
  saveAdmin(instructor: Admin): Promise<showAdmin>
  updateAdmin(instructor: Admin): Promise<void>
  deleteAdmin(id: string): Promise<void>
}
