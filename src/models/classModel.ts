import { Schema, model } from 'mongoose'

const ClassSchema = new Schema(
  {
    instructor: {
      type: Schema.ObjectId,
      ref: 'Instructor',
      required: true
    },
    // TODO: decide if it will be one or more students
    student: {
      type: Schema.ObjectId,
      ref: 'Student',
      required: true
    },
    // TODO: find a proper way to store and check date
    startsAt: {
      type: Date,
      required: true
    },
    endsAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
)

const classModel = model('Class', ClassSchema)

export { classModel }
