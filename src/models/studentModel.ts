import { Schema, model } from 'mongoose'
import isEmail from 'validator/lib/isEmail'

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: isEmail
    },
    password: {
      type: String,
      required: true
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

StudentSchema.virtual('lessons', {
  ref: 'Lessons',
  localField: '_id',
  foreignField: 'student',
  justOne: false
})

StudentSchema.pre(/delete/i, async function () {
  // @ts-ignore
  await model('Lessons').deleteMany({ student: this._conditions._id })
})

export const studentModel = model('Student', StudentSchema)
