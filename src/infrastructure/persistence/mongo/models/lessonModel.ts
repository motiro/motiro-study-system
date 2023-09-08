import { Schema, model } from 'mongoose'

const LessonSchema = new Schema(
  {
    instructor: {
      type: Schema.ObjectId,
      ref: 'Instructor',
      required: true
    },
    student: {
      type: Schema.ObjectId,
      ref: 'Student',
      required: true
    },
    date: {
      type: Schema.ObjectId,
      ref: 'Date',
      required: true
    }
  },
  { timestamps: true }
)

export const lessonModel = model('Lessons', LessonSchema)
