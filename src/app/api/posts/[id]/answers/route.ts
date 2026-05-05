import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { connectDB } from '@/lib/db'
import Post from '@/models/Post'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const { content } = await req.json()
    if (!content?.trim()) return NextResponse.json({ error: 'Content required' }, { status: 400 })

    const post = await Post.findById(params.id)
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const newAnswer = {
      authorName: session.user.name || 'Anonymous',
      authorHandle: session.user.username || 'user',
      avatar: session.user.image || '',
      text: content.trim(),
      likes: 0,
      upvotes: 0,
      upvotedBy: [],
    }

    post.answers.push(newAnswer)
    await post.save()

    const saved = post.answers[post.answers.length - 1]
    return NextResponse.json(saved, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}