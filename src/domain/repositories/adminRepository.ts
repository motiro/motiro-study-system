import { Admin } from 'domain/entities/admin'

export interface AdminRepository {
  findById(id: string): Promise<Admin | null>
  findAll(): Promise<Admin[]>
  save(admin: Admin): Promise<Admin>
  update(admin: Admin): Promise<void>
  delete(id: string): Promise<void>
  count(): Promise<number>
  comparePassword(id: string, password: string): Promise<boolean>
  whoAmI(): string
}
