import { Schema, model } from 'mongoose'

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  // TODO: check if email is valid
  email: {
    type: String,
    required: true,
    trim: true
  }
})

const studentModel = model('Student', StudentSchema)

export { studentModel }
