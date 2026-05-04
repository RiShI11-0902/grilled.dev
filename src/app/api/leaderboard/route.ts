import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import User from '@/models/User'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const period = searchParams.get('period') || 'weekly'
    const sortField = period === 'weekly' ? 'weeklyUpvotes' : 'monthlyUpvotes'
    const leaders = await User.find({})
      .sort({ [sortField]: -1 })
      .limit(20)
      .select('username name avatar reputation weeklyUpvotes monthlyUpvotes savedCount')
      .lean()
    return NextResponse.json({ leaders })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
