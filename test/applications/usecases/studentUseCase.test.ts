import { StudentRepoTest } from './studentRepoTest'
import { StudentUseCase } from '@usecases/.'
import { Student } from '@entities/.'

const studentUseCase = new StudentUseCase(new StudentRepoTest())
let studentRepo: StudentRepoTest

const studentObj: Student = {
  name: 'StudentTest',
  email: 'studenttest@mail.com',
  password: 'secret',
  role: 'student'
}

beforeEach(() => {
  studentRepo = new StudentRepoTest()
})

describe('StudentController', () => {
  it('should be defined', () => {
    expect(studentUseCase).toBeDefined()
  })

  it('should be object', () => {
    const newStudent = studentUseCase.create(studentObj)
    expect(newStudent).toBeInstanceOf(Object)
  })

  it('should be created', async () => {
    const newStudent = studentObj

    const createdStudent = async () => await studentUseCase.create(newStudent)

    expect(() => createdStudent()).toBeDefined()
  })

  it('should list one', async () => {
    const studentId = 'testId'

    const findStudent = await studentUseCase.listOne(studentId)

    expect(findStudent).toBeDefined()
  })

  it('should list all', async () => {
    const students = await studentUseCase.listAll()

    expect(students).toBeDefined()
  })

  it('should be updated', async () => {
    const updateStudent: Student = {
      id: 'testId',
      name: 'UpdatedStudent',
      email: 'updatedstudent@mail.com',
      password: 'updatedsecret',
      role: 'student'
    }

    await studentUseCase.update('testId', updateStudent)

    const findStudent = await studentRepo.findById('testId')

    expect(findStudent).toEqual(updateStudent)
  })

  it('should be deleted', async () => {
    const studentId = 'testId'

    await studentUseCase.delete(studentId)

    const deletedStudent = await studentRepo.findById(studentId)

    expect(deletedStudent).toBeNull()
  })

  it('should return a message when student ID does not exist', async () => {
    const nonExistentId = 'falseId'
    const findStudent = async () => await studentUseCase.listOne(nonExistentId)
    expect(() => findStudent()).rejects.toThrow('User not found')
  })

  it('should throw an error if the id does not exist when listOne', async () => {
    const nonExistentId = 'falseId'

    await expect(studentUseCase.listOne(nonExistentId)).rejects.toThrow(
      'User not found'
    )
  })

  it('should throw an error if the id does not exist when update', async () => {
    const nonExistentId = 'falseId'
    const existingStudent = studentObj

    if (!(await studentRepo.findById(nonExistentId))) {
      await expect(
        studentUseCase.update(nonExistentId, existingStudent)
      ).rejects.toThrow('User not found')
    }
  })

  it('should throw an error if the id does not exist when delete', async () => {
    const nonExistentId = 'falseId'

    if (!(await studentRepo.findById(nonExistentId))) {
      await expect(studentUseCase.delete(nonExistentId)).rejects.toThrow(
        'User not found'
      )
    }
  })

  it('should throw an error if student already exists', async () => {
    const existingStudent = studentObj

    if (await studentRepo.findById('testId')) {
      await expect(studentUseCase.create(existingStudent)).rejects.toThrow(
        'User already exists'
      )
    }
  })
})
