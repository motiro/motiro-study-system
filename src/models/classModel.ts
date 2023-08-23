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
    date: {
      type: Date,
      required: [true, 'YYYY-MM-DD HH:mm']
    },
    day: String,
    time: String
  },
  { timestamps: true }
)

const classModel = model('Class', ClassSchema)

export const classModel = model('Class', ClassSchema)
