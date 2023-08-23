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

  }
})

const instructorModel = model('Instructor', InstructorSchema)

export { instructorModel }
