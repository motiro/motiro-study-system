import { Schema, model } from 'mongoose'
import isEmail from 'validator/lib/isEmail'

const InstructorSchema = new Schema(
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
    specialty: [
      {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 20
      }
    ],
    schedule: [
      {
        date: {
          type: Date,
          required: [true, 'YYYY-MM-DD HH:mm']
        },
        busy: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

InstructorSchema.virtual('lessons', {
  ref: 'Lessons',
  localField: '_id',
  foreignField: 'instructor',
  justOne: false
})

InstructorSchema.pre(/delete/i, async function () {
  // @ts-ignore
  await model('Lessons').deleteMany({ instructor: this._conditions._id })
})

export const instructorModel = model('Instructor', InstructorSchema)
