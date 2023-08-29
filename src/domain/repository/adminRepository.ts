import { Admin, showAdmin } from 'domain/entities/admin'
import { Schema } from 'mongoose'

export interface AdminRepository {
  findAdminById(id: string): Promise<Schema | null>
  findAllAdmins(): Promise<Schema[]>
  saveAdmin(instructor: Admin): Promise<showAdmin>
  updateAdmin(instructor: Admin): Promise<void>
  deleteAdmin(id: string): Promise<void>
}
