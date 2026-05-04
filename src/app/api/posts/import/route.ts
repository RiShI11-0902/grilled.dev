import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import User from "@/models/User";

const CORS = {
  "Access-Control-Allow-Origin": "https://x.com",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: CORS });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const userId = session?.user?.id || body.savedBy || null;

    const { tweetId, tweetUrl, question, answers, tags, difficulty, company } =
      body;

    if (!question?.text) {
      return NextResponse.json(
        { error: "Question text required" },
        { status: 400, headers: CORS },
      );
    }

    const existing = await Post.findOne({ tweetId });

    if (existing) {
      if (
        userId &&
        !existing.savedByList.map((id: any) => id.toString()).includes(userId)
      ) {
        existing.savedByList.push(userId);
        existing.saveCount = existing.savedByList.length;
        await existing.save();
        await User.findByIdAndUpdate(userId, {
          $addToSet: { savedPosts: existing._id },
          $inc: { savedCount: 1 },
        });
      }
      return NextResponse.json(existing, { headers: CORS });
    }

    const formattedAnswers = (answers || [])
      .filter((a: any) => a.text?.trim())
      .slice(0, 50)
      .map((a: any) => ({
        authorName: a.authorName || "Unknown",
        authorHandle: a.authorHandle || "unknown",
        avatar: a.avatar,
        text: a.text.trim(),
        likes: a.likes || 0,
        tweetUrl: a.tweetUrl,
        upvotes: a.likes || 0,
        upvotedBy: [],
      }))
      .sort((a: any, b: any) => b.likes - a.likes);

    const post = await Post.create({
      question: question.text.trim(),
      authorName: question.authorName || "Unknown",
      authorHandle: question.authorHandle || "unknown",
      authorAvatar: question.avatar,
      tweetId,
      tweetUrl,
      tags: (tags || []).slice(0, 5),
      difficulty: difficulty || "medium",
      company: company || "",
      answers: formattedAnswers,
      savedBy: userId,
      savedByList: userId ? [userId] : [],
      saveCount: 1,
    });

    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { savedPosts: post._id },
        $inc: { savedCount: 1 },
      });
    }

    return NextResponse.json(post, { status: 201, headers: CORS });
  } catch (error: any) {
    console.error("[Import API]", error);
    if (error.code === 11000) {
      const body = await req.json().catch(() => ({}));
      const existing = await Post.findOne({ tweetId: body.tweetId });
      return NextResponse.json(existing, { headers: CORS });
    }
    return NextResponse.json(
      { error: "Failed to import" },
      { status: 500, headers: CORS },
    );
  }
}

// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import { connectDB } from '@/lib/db'
// import Post from '@/models/Post'
// import User from '@/models/User'

// export async function POST(req: NextRequest) {
//   try {
//     await connectDB()
//     const session = await getServerSession(authOptions)
//     const userId = session?.user?.id || null

//     const {
//       tweetId,
//       tweetUrl,
//       question,
//       answers,
//       tags,
//       difficulty,
//       company,
//     } = await req.json()

//     if (!question?.text) {
//       return NextResponse.json({ error: 'Question text required' }, { status: 400 })
//     }

//     // Check if this tweet was already saved
//     const existing = await Post.findOne({ tweetId })

//     if (existing) {
//       // Already exists — just add this user to savedByList if logged in
//       if (userId && !existing.savedByList.map((id: any) => id.toString()).includes(userId)) {
//         existing.savedByList.push(userId)
//         existing.saveCount = existing.savedByList.length
//         await existing.save()

//         // Add to user's saved posts
//         await User.findByIdAndUpdate(userId, {
//           $addToSet: { savedPosts: existing._id },
//           $inc: { savedCount: 1 },
//         })
//       }

//       return NextResponse.json(existing)
//     }

//     // New post — create it
//     const formattedAnswers = (answers || [])
//       .filter((a: any) => a.text?.trim())
//       .slice(0, 50) // max 50 answers
//       .map((a: any) => ({
//         authorName: a.authorName || 'Unknown',
//         authorHandle: a.authorHandle || 'unknown',
//         avatar: a.avatar,
//         text: a.text.trim(),
//         likes: a.likes || 0,
//         tweetUrl: a.tweetUrl,
//         upvotes: a.likes || 0, // seed upvotes from X likes
//         upvotedBy: [],
//       }))
//       .sort((a: any, b: any) => b.likes - a.likes) // ranked by X likes

//     const post = await Post.create({
//       question: question.text.trim(),
//       authorName: question.authorName || 'Unknown',
//       authorHandle: question.authorHandle || 'unknown',
//       authorAvatar: question.avatar,
//       tweetId,
//       tweetUrl,
//       tags: (tags || []).slice(0, 5),
//       difficulty: difficulty || 'medium',
//       company: company || '',
//       answers: formattedAnswers,
//       savedBy: userId,
//       savedByList: userId ? [userId] : [],
//       saveCount: 1,
//     })

//     // Add to user's saved posts
//     if (userId) {
//       await User.findByIdAndUpdate(userId, {
//         $addToSet: { savedPosts: post._id },
//         $inc: { savedCount: 1 },
//       })
//     }

//     return NextResponse.json(post, { status: 201 })
//   } catch (error: any) {
//     console.error('[Import API]', error)
//     // Handle duplicate tweetId race condition
//     if (error.code === 11000) {
//       const existing = await Post.findOne({ tweetId: (await req.json()).tweetId })
//       return NextResponse.json(existing)
//     }
//     return NextResponse.json({ error: 'Failed to import' }, { status: 500 })
//   }
// }
