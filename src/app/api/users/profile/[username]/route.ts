import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import Post from '@/models/Post'

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  try {
    await connectDB()

    const user = await User.findOne({ username: params.username })
      .select('username name avatar bio reputation weeklyUpvotes monthlyUpvotes savedCount savedPosts createdAt')
      .lean()

    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Get their saved posts
    const posts = await Post.find({
      _id: { $in: (user as any).savedPosts || [] },
      isRemoved: false,
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('-answers')
      .lean()

    return NextResponse.json({ user, posts })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
