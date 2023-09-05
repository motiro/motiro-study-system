import { MongoRepository } from '@mongo/mongoRepository'
import { AdminUseCase } from 'applications/usecases'
import { AdminController } from 'applications/controllers'

describe("test", () => {
  it("should also pass", () => {
    const mongoRepository = new MongoRepository()
    const adminUseCase = new AdminUseCase(mongoRepository)
    const adminController = new AdminController(adminUseCase)
    expect(adminController).toBeDefined()
  })
})
