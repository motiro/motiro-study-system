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

// Perhaps this should be moved to a controller
// This was supposed to make it easier to match queries by day or time,
// but maybe it's not necessary to store it in DB
ClassSchema.pre('save', function (next) {
  this.day = this.date!.toISOString().split('T')[0]
  this.time = this.date!.toLocaleTimeString('pt-BR', { timeStyle: 'short' })
  next()
})

export const classModel = model('Class', ClassSchema)
