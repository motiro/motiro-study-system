import { Schema, model } from 'mongoose'

const InstructorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    specialty: [
      {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
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
        },
        day: String,
        time: String
      }
    ]
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

InstructorSchema.virtual('classes', {
  ref: 'Class',
  localField: '_id',
  foreignField: 'instructor',
  justOne: false
})

// Perhaps this should be moved to a controller
// This was supposed to make it easier to match queries by day or time,
// but maybe it's not necessary to store it in DB
InstructorSchema.pre('save', function (next) {
  try {
    this.schedule.forEach(e => {
      e.day = e.date!.toISOString().split('T')[0]
      e.time = e.date!.toLocaleTimeString('pt-BR', { timeStyle: 'short' })
    })
  } catch (error) {
    console.log(error)
  } finally {
    next()
  }
})

const instructorModel = model('Instructor', InstructorSchema)

export { instructorModel }
