import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Post from '@/models/Post'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const tag = searchParams.get('tag')
    const sort = searchParams.get('sort') || 'latest'
    const company = searchParams.get('company')
    const difficulty = searchParams.get('difficulty')
    const q = searchParams.get('q')
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = 20

    const query: any = { isRemoved: false }
    if (tag) query.tags = tag
    if (company) query.company = new RegExp(company, 'i')
    if (difficulty) query.difficulty = difficulty
    if (q) query.$text = { $search: q }

    const sortMap: Record<string, any> = {
      latest: { isPinned: -1, createdAt: -1 },
      top: { isPinned: -1, upvotes: -1 },
      trending: { isPinned: -1, saveCount: -1, views: -1 },
      unanswered: { createdAt: -1 },
    }

    if (sort === 'unanswered') query['answers.0'] = { $exists: false }

    const [posts, total] = await Promise.all([
      Post.find(query)
        .sort(sortMap[sort] || sortMap.latest)
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-answers') // Don't send answers in feed, load on detail page
        .lean(),
      Post.countDocuments(query),
    ])

    return NextResponse.json({ posts, total, page, pages: Math.ceil(total / limit) })
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
