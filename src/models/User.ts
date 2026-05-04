import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  name: string
  email: string
  avatar?: string
  bio?: string
  provider?: string
  role: 'user' | 'admin'
  reputation: number
  weeklyUpvotes: number
  monthlyUpvotes: number
  savedPosts: mongoose.Types.ObjectId[]
  savedCount: number
  createdAt: Date
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  avatar: String,
  bio: { type: String, maxlength: 200 },
  provider: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  reputation: { type: Number, default: 0 },
  weeklyUpvotes: { type: Number, default: 0 },
  monthlyUpvotes: { type: Number, default: 0 },
  savedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  savedCount: { type: Number, default: 0 },
}, { timestamps: true })

UserSchema.index({ weeklyUpvotes: -1 })
UserSchema.index({ monthlyUpvotes: -1 })
UserSchema.index({ reputation: -1 })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
