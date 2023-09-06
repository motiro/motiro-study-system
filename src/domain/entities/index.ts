import { Admin } from './admin'
import { Instructor } from './instructor'
import { Student } from './students'
import { Lesson } from './lessons'
import {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ForbiddenError
} from './error'

export enum ENTITIES {
  ADMIN = 'admin',
  INSTRUCTOR = 'instructor',
  STUDENT = 'student'
}

export {
  Admin,
  Instructor,
  Student,
  Lesson,
  ApiError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ForbiddenError
}
