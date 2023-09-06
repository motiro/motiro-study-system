import { AdminRepoTest } from './adminRepoTest'
import { AdminUseCase } from '@usecases/adminUseCase'
import { MongoRepository } from '@mongo/mongoRepository'

const adminUseCase = new AdminUseCase(new AdminRepoTest() as MongoRepository) // will be fixed in #49

const adminObj = {
  name: 'AdminTest',
  email: 'admintest@mail.com',
  password: 'secret',
  role: 'admin'
}

describe('AdminController', () => {
  it('should be defined', () => {
    expect(adminUseCase).toBeDefined()
  })

  it('should be object', () => {
    const newAdmin = adminUseCase.create(adminObj)
    expect(newAdmin).toBeInstanceOf(Object)
  })
})
