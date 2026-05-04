import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { connectDB } from '@/lib/db'
import User from '@/models/User'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB()
        const existing = await User.findOne({ email: user.email })
        if (!existing) {
          const base = (user.name || 'user').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 15)
          const username = `${base}${Math.floor(Math.random() * 9999)}`
          await User.create({ email: user.email, name: user.name, username, avatar: user.image })
        } else if (user.image && existing.avatar !== user.image) {
          await User.findByIdAndUpdate(existing._id, { avatar: user.image })
        }
        return true
      } catch { return false }
    },
    async session({ session }) {
      if (session.user?.email) {
        await connectDB()
        const u = await User.findOne({ email: session.user.email }).lean() as any
        if (u) {
          session.user.id = u._id.toString()
          session.user.username = u.username
          session.user.reputation = u.reputation
          session.user.savedCount = u.savedCount
          session.user.weeklyUpvotes = u.weeklyUpvotes
        }
      }
      return session
    },
  },
  pages: { signIn: '/auth/signin' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
