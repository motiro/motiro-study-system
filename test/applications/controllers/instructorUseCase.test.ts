import { InstructorRepoTest } from './instructorRepoTest'
import { InstructorUseCase } from '@usecases/InstructorUseCase'
import { MongoRepository } from '@mongo/mongoRepository'
import { Instructor } from 'domain/entities/instructor'

const instructorUseCase = new InstructorUseCase(new InstructorRepoTest() as MongoRepository)
let instructorRepo: InstructorRepoTest

const instructorObj: Instructor = {
  name: 'InstructorTest',
  email: 'instructortest@mail.com',
  password: 'secret',
  specialty: ['math'],
  schedule: [
    {
      date: new Date('2023-09-29'),
      busy: true
    },
    {
      date: new Date('2023-09-29'),
      busy: true
    }
  ],
  role: 'instructor'
}

beforeEach(() => {
  instructorRepo = new InstructorRepoTest()
})

describe('InstructorController', () => {
  it('should be defined', () => {
    expect(instructorUseCase).toBeDefined()
  })

  it('should be object', () => {
    const newInstructor = instructorUseCase.execute(instructorObj)
    expect(newInstructor).toBeInstanceOf(Object)
  })

  it('should be created', async () => {
    const newInstructor = instructorObj

    const createdInstructor = await instructorUseCase.execute(newInstructor)

    expect(createdInstructor).toBeDefined()
  })

  it('should list one', async () => {
    const instructorId = 'testId'

    const findInstructor = await instructorUseCase.listOne(instructorId)

    expect(findInstructor).toBeDefined()
  })

  it('should list all', async () => {
    const instructors = await instructorUseCase.list()

    expect(instructors).toBeDefined()
  })

  it('should be updated', async () => {
    const updateInstructor: Instructor = {
      id: 'testId',
      name: 'UpdatedInstructor',
      email: 'updatedinstructor@mail.com',
      password: 'updatedsecret',
      specialty: ['math', "filosofy"],
      schedule: [
        {
          date: new Date('2023-09-30'),
          busy: false
        },
        {
          date: new Date('2023-09-14'),
          busy: true
        }
      ],
      role: 'instructor'
    }

    await instructorUseCase.update("testId", updateInstructor)

    const findInstructor = await instructorRepo.findInstructorById('testId')

    expect(findInstructor).toEqual(updateInstructor)
  })

  it('should be deleted', async () => {
    const instructorId = 'testId'

    await instructorUseCase.delete(instructorId)

    const deletedInstructor = await instructorRepo.findInstructorById(instructorId)

    expect(deletedInstructor).toBeNull()
  })
})
