import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import Post from '@/models/Post'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const { searchParams } = new URL(req.url)
    const tag = searchParams.get('tag')
    const company = searchParams.get('company')
    const difficulty = searchParams.get('difficulty')
    const q = searchParams.get('q')

    const user = await User.findById(session.user.id).select('savedPosts').lean() as any
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const query: any = { _id: { $in: user.savedPosts }, isRemoved: false }
    if (tag) query.tags = tag
    if (company) query.company = new RegExp(company, 'i')
    if (difficulty) query.difficulty = difficulty
    if (q) query.$text = { $search: q }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .select('-answers')
      .lean()

    return NextResponse.json({ posts })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
