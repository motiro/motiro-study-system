import { Schema, model } from 'mongoose'

const InstructorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  specialty: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  }
})

const instructorModel = model('Instructor', InstructorSchema)

export { instructorModel }
