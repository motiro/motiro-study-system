import { Schema, model } from 'mongoose'

const StudentSchema = new Schema(
  {
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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

StudentSchema.virtual('classes', {
  ref: 'Class',
  localField: '_id',
  foreignField: 'student',
  justOne: false
})

StudentSchema.pre(/delete/i, async function () {
  try {
    // @ts-ignore
    await model('Class').deleteMany({ student: this._conditions._id })
  } catch (error) {
    console.log(error)
  }
})

export const studentModel = model('Student', StudentSchema)
