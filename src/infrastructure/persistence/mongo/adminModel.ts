import { Schema, model } from 'mongoose'
import { UserSchema } from '.'
import bcrypt from 'bcrypt'

const AdminSchema = new Schema(
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
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ['admin'],
      default: 'admin'
    }
  },
  {
    toJSON: {
      virtuals: true,
      timestamps: true,
      transform: (
        _,
        ret: { _id?: Schema.Types.ObjectId; password?: string }
      ) => {
        delete ret.password
        return ret
      }
    },
    toObject: { virtuals: true, timestamps: true }
  }
)

AdminSchema.methods.comparePassword = async function (
  canditatePassword: string
) {
  return await bcrypt.compare(canditatePassword, this.password)
}

AdminSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const { BCRYPT_SALT } = process.env
  const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT as string))
  this.password = await bcrypt.hash(this.password, salt)
})

export const adminModel = model<UserSchema>('Admin', AdminSchema)
