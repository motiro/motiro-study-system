import { Schema } from 'mongoose'
import { instructorModel } from './instructorModel'
import { studentModel } from './studentModel'
import { lessonModel } from './lessonModel'

export interface UserSchema extends Schema {
  comparePassword(password: string): boolean
}

export { instructorModel, studentModel, lessonModel }
