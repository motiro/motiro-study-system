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
  {
    toJSON: {
      virtuals: true,
      timestamps: true,
      transform: (_, ret: { _id?: Schema.Types.ObjectId }) => {
        delete ret._id
        return ret
      }
    },
    toObject: { virtuals: true, timestamps: true }
  }
)

export const lessonModel = model('Lessons', LessonSchema)
