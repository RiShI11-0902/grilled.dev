import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectDB } from '@/lib/db'
import Post from '@/models/Post'
import User from '@/models/User'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const post = await Post.findByIdAndUpdate(
      params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).lean()
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
