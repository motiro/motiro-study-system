import { Request } from 'express'
import { AdminRepoTest } from './adminRepoTest'
import { InstructorRepoTest } from './instructorRepoTest'
import { StudentRepoTest } from './studentRepoTest'
import { Admin, Instructor, Student } from '@entities/.'
import {
  AuthUseCase,
  AdminUseCase,
  InstructorUseCase,
  StudentUseCase
} from '@usecases/.'

const adminUseCase = new AdminUseCase(new AdminRepoTest())
const instructorUseCase = new InstructorUseCase(new InstructorRepoTest())
const studentUseCase = new StudentUseCase(new StudentRepoTest())
const authUseCase = new AuthUseCase(
  adminUseCase,
  instructorUseCase,
  studentUseCase
)

const adminObj: Admin = {
  name: 'AdminAuthTest',
  email: 'adminauthtest@mail.com',
  password: 'secret',
  role: 'admin'
}

const instructorObj: Instructor = {
  name: 'InstructorAuthTest',
  email: 'instructorauthtest@mail.com',
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

const studentObj: Student = {
  name: 'StudentAuthTest',
  email: 'studentauthtest@mail.com',
  password: 'secret',
  role: 'student'
}

describe('AuthUseCase', () => {
  it('should fail without usecases', () => {
    expect(() => new AuthUseCase()).toThrow(
      'No usecases provided for authentication'
    )
  })

  it('should be defined', () => {
    expect(authUseCase).toBeDefined()
  })

  // We should mock jwt.decode() to be able to register while having a already registered admin
  describe('Admin Auth', () => {
    describe('Register', () => {
      it('should require role', async () => {
        const newAdmin = async () =>
          await authUseCase.register({ body: {} } as Request)
        expect(() => newAdmin()).rejects.toThrow('Missing role')
      })

      it('should be logged in', async () => {
        const newAdmin = async () =>
          await authUseCase.register({ body: adminObj } as Request)
        expect(() => newAdmin()).rejects.toThrow('Not logged in')
      })

      it('should register first admin', async () => {
        const admins = await adminUseCase.listAll()

        for (const admin of admins) {
          await adminUseCase.delete(admin.id!)
        }

        const newAdmin = await authUseCase.register({
          body: adminObj
        } as Request)
        expect(newAdmin).toEqual({
          id: undefined,
          name: 'AdminAuthTest',
          role: 'admin'
        })

        for (const admin of admins) {
          await adminUseCase.create(admin)
        }
      })
    })

    describe('Login', () => {
      it('should throw not found error', async () => {
        const admObj = { email: 'should@fail.adm', password: 'wrong' }
        const admins = await adminUseCase.listAll()

        for (const admin of admins) {
          if (admin.email === admObj.email)
            throw new Error('There is a problem with this test')
        }

        const newAdmin = async () =>
          await authUseCase.login({ body: admObj } as Request)
        expect(() => newAdmin()).rejects.toThrow('User not found')
      })

      it('should login', async () => {
        const admins = await adminUseCase.listAll()
        const expected = {
          name: admins[0].name,
          role: admins[0].role,
          id: admins[0].id
        }
        const login = await authUseCase.login({
          body: admins[0]
        } as Request)
        expect(login).toEqual(expected)
      })

      it('should throw missing credentials', async () => {
        const login = async () =>
          await authUseCase.login({
            body: { email: '', password: '' }
          } as Request)
        expect(() => login()).rejects.toThrow('Missing credentials')
      })

      it('should throw invalid password', async () => {
        let admin = await adminUseCase.listAll()
        const login = async () =>
          await authUseCase.login({
            body: { email: admin[0].email, password: 'wrong' }
          } as Request)
        expect(() => login()).rejects.toThrow('Invalid password')
      })
    })
  })

  describe('Instructor Auth', () => {
    describe('Register', () => {
      it('should require role', async () => {
        const newInstructor = async () =>
          await authUseCase.register({ body: {} } as Request)
        expect(() => newInstructor()).rejects.toThrow('Missing role')
      })

      it('should create instructor', async () => {
        const expected = {
          name: instructorObj.name,
          role: instructorObj.role,
          id: undefined
        }

        const newInstructor = await authUseCase.register({
          body: instructorObj
        } as Request)

        expect(newInstructor).toEqual(expected)
      })
    })

    describe('Login', () => {
      it('should throw not found error', async () => {
        const insObj = { email: 'should@fail.ins', password: 'wrong' }
        const instructors = await instructorUseCase.listAll()

        for (const instructor of instructors) {
          if (instructor.email === insObj.email)
            throw new Error('There is a problem with this test')
        }
        const newInstructor = async () =>
          await authUseCase.login({ body: insObj } as Request)
        expect(() => newInstructor()).rejects.toThrow('User not found')
      })

      it('should login', async () => {
        const instructors = await instructorUseCase.listAll()
        const expected = {
          name: instructors[0].name,
          role: instructors[0].role,
          id: instructors[0].id
        }
        const login = await authUseCase.login({
          body: instructors[0]
        } as Request)
        expect(login).toEqual(expected)
      })

      it('should throw missing credentials', async () => {
        const login = async () =>
          await authUseCase.login({
            body: { email: '', password: '' }
          } as Request)
        expect(() => login()).rejects.toThrow('Missing credentials')
      })

      it('should throw invalid password', async () => {
        let instructor = await instructorUseCase.listAll()
        const login = async () =>
          await authUseCase.login({
            body: { email: instructor[0].email, password: 'wrong' }
          } as Request)
        expect(() => login()).rejects.toThrow('Invalid password')
      })
    })
  })

  describe('Student Auth', () => {
    describe('Register', () => {
      it('should require role', async () => {
        const newStudent = async () =>
          await authUseCase.register({ body: {} } as Request)
        expect(() => newStudent()).rejects.toThrow('Missing role')
      })

      it('should create student', async () => {
        const expected = {
          name: studentObj.name,
          role: studentObj.role,
          id: undefined
        }

        const newStudent = await authUseCase.register({
          body: studentObj
        } as Request)

        expect(newStudent).toEqual(expected)
      })
    })

    describe('Login', () => {
      it('should throw not found error', async () => {
        const stuObj = { email: 'should@fail.stu', password: 'wrong' }
        const students = await studentUseCase.listAll()

        for (const student of students) {
          if (student.email === stuObj.email)
            throw new Error('There is a problem with this test')
        }

        const newStudent = async () =>
          await authUseCase.login({ body: stuObj } as Request)
        expect(() => newStudent()).rejects.toThrow('User not found')
      })

      it('should login', async () => {
        const students = await studentUseCase.listAll()
        const expected = {
          name: students[0].name,
          role: students[0].role,
          id: students[0].id
        }
        const login = await authUseCase.login({ body: students[0] } as Request)
        expect(login).toEqual(expected)
      })

      it('should throw missing credentials', async () => {
        const login = async () =>
          await authUseCase.login({
            body: { email: '', password: '' }
          } as Request)
        expect(() => login()).rejects.toThrow('Missing credentials')
      })

      it('should throw invalid password', async () => {
        let student = await studentUseCase.listAll()
        const login = async () =>
          await authUseCase.login({
            body: { email: student[0].email, password: 'wrong' }
          } as Request)
        expect(() => login()).rejects.toThrow('Invalid password')
      })
    })
  })
})
