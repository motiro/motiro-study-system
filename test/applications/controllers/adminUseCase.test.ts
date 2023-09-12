import { AdminRepoTest } from './adminRepoTest'
import { AdminUseCase } from '@usecases/adminUseCase'
import { Admin } from '@entities/admin'

const adminUseCase = new AdminUseCase(new AdminRepoTest())
let adminRepo: AdminRepoTest

const adminObj: Admin = {
  name: 'AdminTest',
  email: 'admintest@mail.com',
  password: 'secret',
  role: 'admin'
}

beforeEach(() => {
  adminRepo = new AdminRepoTest()
})

describe('AdminController', () => {
  it('should be defined', () => {
    expect(adminUseCase).toBeDefined()
  })

  it('should be object', () => {
    const newAdmin = adminUseCase.create(adminObj)
    expect(newAdmin).toBeInstanceOf(Object)
  })

  it('should be created', async () => {
    const newAdmin = adminObj

    const createdAdmin = await adminUseCase.create(newAdmin)

    expect(createdAdmin).toBeDefined()
  })

  it('should list one', async () => {
    const adminId = 'testId'

    const findAdmin = await adminUseCase.listOne(adminId)

    expect(findAdmin).toBeDefined()
  })

  it('should list all', async () => {
    const admins = await adminUseCase.listAll()

    expect(admins).toBeDefined()
  })

  it('should be updated', async () => {
    const updateAdmin: Admin = {
      id: 'testId',
      name: 'UpdatedAdmin',
      email: 'updatedadmin@mail.com',
      password: 'updatedsecret',
      role: 'admin'
    }

    await adminUseCase.update(updateAdmin)

    const findAdmin = await adminRepo.findById('testId')

    expect(findAdmin).toEqual(updateAdmin)
  })

  it('should be deleted', async () => {
    const adminId = 'testId'

    await adminUseCase.delete(adminId)

    const deletedAdim = await adminRepo.findById(adminId)

    expect(deletedAdim).toBeNull()
  })

})
