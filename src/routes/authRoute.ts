import { Router } from 'express'
import { AuthController } from 'applications/controllers'
import { AuthUseCase } from 'applications/usecases'
import {
  AdminUseCase,
  InstructorUseCase,
  StudentUseCase
} from 'applications/usecases'

import { MongoAdminRepository } from '@mongo/mongoAdminRepository'
const mongoAdmRepository = new MongoAdminRepository()
const adminUseCase = new AdminUseCase(mongoAdmRepository)

import { MongoInstructorRepository } from '@mongo/mongoInstructorRepository'
const mongoInstRepository = new MongoInstructorRepository()
const instructorUseCase = new InstructorUseCase(mongoInstRepository)

import { MongoStudentRepository } from '@mongo/mongoStudentRepository'
const mongoStuRepository = new MongoStudentRepository()
const studentUseCase = new StudentUseCase(mongoStuRepository)

const authUseCase = new AuthUseCase(
  adminUseCase,
  instructorUseCase,
  studentUseCase
)

const authController = new AuthController(authUseCase)
const router = Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.get('/auth/logout', authController.logout)

export default router
