import { Admin } from 'domain/entities/admin'

export interface AdminRepository {
  findAdminById(id: string): Promise<Admin | null>
  findAllAdmins(): Promise<Admin[]>
  saveAdmin(admin: Admin): Promise<Admin>
  updateAdmin(admin: Admin): Promise<void>
  deleteAdmin(id: string): Promise<void>
}
