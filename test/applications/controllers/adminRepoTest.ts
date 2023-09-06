import { AdminRepository } from 'domain/repository/adminRepository'
import { Admin } from 'domain/entities/admin'

const users: Admin[] = [
  {
    id: 'testId',
    name: 'AdminTest',
    email: 'admintest@mail.com',
    password: 'secret',
    role: 'admin'
  },
  {
    id: 'testId2',
    name: 'AdminTest2',
    email: 'admintest2@mail.com',
    password: 'secret2',
    role: 'admin'
  }
]

export class AdminRepoTest implements AdminRepository {
  async findAdminById(id: string): Promise<Admin | null> {
    for (const user of users) {
      if (user.id === id) return user
    }
    return null
  }
  async findAllAdmins(): Promise<Admin[]> {
    const admins: Admin[] = []
    for (const user of users) {
      admins.push(user)
    }
    return admins
  }
  async saveAdmin(admin: Admin): Promise<Admin> {
    const result: Admin = new Admin(admin)
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
    for (const user of users) {
      if (user.id === admin.id) {
        user.name = admin.name ?? user.name
        user.email = admin.email ?? user.email
        user.password = admin.name ?? user.password
      }
    }
  }
  async deleteAdmin(id: string): Promise<void> {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        delete users[i]
      }
    }
  }
}
