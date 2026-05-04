import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectDB } from '@/lib/db'
import Post from '@/models/Post'
import User from '@/models/User'

export async function POST(req: NextRequest, { params }: { params: { id: string; answerId: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?._id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const post = await Post.findById(params.id)
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const answer = post.answers.id(params.answerId)
    if (!answer) return NextResponse.json({ error: 'Answer not found' }, { status: 404 })

    const userId = session.user.id
    const alreadyUpvoted = answer.upvotedBy.map((id: any) => id.toString()).includes(userId)

    if (alreadyUpvoted) {
      answer.upvotes = Math.max(0, answer.upvotes - 1)
      answer.upvotedBy = answer.upvotedBy.filter((id: any) => id.toString() !== userId)
    } else {
      answer.upvotes += 1
      answer.upvotedBy.push(userId)
      // Give reputation to the answer author
      await User.findOneAndUpdate(
        { username: answer.authorHandle },
        { $inc: { reputation: 5, weeklyUpvotes: 1, monthlyUpvotes: 1 } }
      )
    }

    await post.save()
    return NextResponse.json({ upvotes: answer.upvotes, upvoted: !alreadyUpvoted })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
