import mongoose, { Schema, Document } from 'mongoose'

export interface IAnswer {
  authorName: string
  authorHandle: string
  avatar?: string
  text: string
  likes: number
  tweetUrl?: string
  upvotes: number
  upvotedBy: mongoose.Types.ObjectId[]
}

export interface IPost extends Document {
  // Question
  question: string
  authorName: string
  authorHandle: string
  authorAvatar?: string

  // Metadata
  tags: string[]
  company?: string
  difficulty: 'easy' | 'medium' | 'hard'

  // Source
  tweetId?: string
  tweetUrl?: string
  savedBy: mongoose.Types.ObjectId   // who first saved it
  savedByList: mongoose.Types.ObjectId[]  // everyone who saved it

  // Answers (imported from X replies)
  answers: IAnswer[]

  // Engagement
  upvotes: number
  upvotedBy: mongoose.Types.ObjectId[]
  saveCount: number
  views: number

  // Moderation
  isRemoved: boolean
  isPinned: boolean

  createdAt: Date
  updatedAt: Date
}

const AnswerSchema = new Schema<IAnswer>({
  authorName: String,
  authorHandle: String,
  avatar: String,
  text: { type: String, required: true, maxlength: 2000 },
  likes: { type: Number, default: 0 },
  tweetUrl: String,
  upvotes: { type: Number, default: 0 },
  upvotedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { _id: true })

const PostSchema = new Schema<IPost>({
  question: { type: String, required: true, maxlength: 500 },
  authorName: { type: String, required: true },
  authorHandle: { type: String, required: true },
  authorAvatar: String,

  tags: [{ type: String, maxlength: 30 }],
  company: { type: String, maxlength: 60 },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },

  tweetId: { type: String, unique: true, sparse: true },
  tweetUrl: String,
  savedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  savedByList: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  answers: [AnswerSchema],

  upvotes: { type: Number, default: 0 },
  upvotedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  saveCount: { type: Number, default: 1 },
  views: { type: Number, default: 0 },

  isRemoved: { type: Boolean, default: false },
  isPinned: { type: Boolean, default: false },
}, { timestamps: true })

PostSchema.index({ createdAt: -1 })
PostSchema.index({ upvotes: -1 })
PostSchema.index({ saveCount: -1 })
PostSchema.index({ tags: 1, createdAt: -1 })
PostSchema.index({ company: 1 })
PostSchema.index({ question: 'text' })

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)
