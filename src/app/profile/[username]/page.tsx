'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import PostCard from '@/components/PostCard'
import { formatDistanceToNow } from 'date-fns'

export default function ProfilePage() {
  const { username } = useParams()
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [tab, setTab] = useState<'saved' | 'answers'>('saved')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!username) return
    fetch(`/api/users/profile/${username}`)
      .then(r => r.json())
      .then(async data => {
        setUser(data.user)
        setPosts(data.posts || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [username])

  if (loading) return (
    <div style={{ display: 'flex', minHeight: '100vh', maxWidth: 1280, margin: '0 auto' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--ink-2)' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔥</div>
          <p>Loading profile...</p>
        </div>
      </main>
    </div>
  )

  if (!user) return (
    <div style={{ display: 'flex', minHeight: '100vh', maxWidth: 1280, margin: '0 auto' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 60, textAlign: 'center', color: 'var(--ink-2)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🤷</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>User not found</h2>
        <p>@{username} doesn't exist on Grilled.dev yet.</p>
      </main>
    </div>
  )

  const initials = user.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || '?'
  const joinedDate = formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', maxWidth: 1280, margin: '0 auto' }}>
      <Sidebar />

      <main style={{ flex: 1, borderRight: '1px solid var(--border-subtle)', minWidth: 0 }}>

        {/* Cover */}
        <div style={{
          height: 120,
          background: 'linear-gradient(135deg, #0E0E0E 0%, #1a0a00 50%, #0E0E0E 100%)',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* subtle grid */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />
          {/* glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 300, height: 100,
            background: 'radial-gradient(ellipse, rgba(232,93,47,0.15) 0%, transparent 70%)',
          }} />
        </div>

        {/* Avatar + info */}
        <div style={{ padding: '0 24px 24px', position: 'relative' }}>
          {/* Avatar */}
          <div style={{
            width: 76, height: 76, borderRadius: '50%',
            background: 'linear-gradient(135deg, #E85D2F, #EF4444)',
            border: '3px solid var(--canvas)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 700, color: 'white',
            position: 'relative', top: -38,
            marginBottom: -16,
          }}>
            {user.avatar
              ? <img src={user.avatar} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              : initials
            }
          </div>

          {/* Name row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 2, letterSpacing: '-0.02em' }}>
                {user.name}
              </h1>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 6 }}>@{user.username}</p>
              {user.bio && (
                <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 8, maxWidth: 480 }}>
                  {user.bio}
                </p>
              )}
              <p style={{ fontSize: 12, color: 'var(--ink-3)' }}>Joined {joinedDate}</p>
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: 0,
            margin: '20px 0 0',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
          }}>
            {[
              { label: 'Saved', value: user.savedCount || 0 },
              { label: 'Reputation', value: user.reputation || 0 },
              { label: 'This week', value: `${user.weeklyUpvotes || 0} 🔥` },
              { label: 'This month', value: `${user.monthlyUpvotes || 0} 🔥` },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1, padding: '16px 0', textAlign: 'center',
                borderRight: i < 3 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <p style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="tab-bar" style={{ margin: '0 -24px', padding: '0 24px' }}>
            <button
              className={`tab ${tab === 'saved' ? 'active' : ''}`}
              onClick={() => setTab('saved')}
            >
              Saved Questions
            </button>
            <button
              className={`tab ${tab === 'answers' ? 'active' : ''}`}
              onClick={() => setTab('answers')}
            >
              Answers
            </button>
          </div>
        </div>

        {/* Content */}
        {tab === 'saved' && (
          <div>
            {posts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📚</div>
                <h3>No saved questions yet</h3>
                <p>Install the extension and save interview threads from X.</p>
              </div>
            ) : (
              posts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))
            )}
          </div>
        )}

        {tab === 'answers' && (
          <div style={{ padding: '20px 24px' }}>
            <div className="empty-state">
              <div className="empty-state-icon">✍️</div>
              <h3>No answers yet</h3>
              <p>Answer questions on Grilled.dev to build your reputation.</p>
            </div>
          </div>
        )}
      </main>

      {/* Right sidebar */}
      <aside style={{
        width: 280, flexShrink: 0,
        padding: '24px 16px',
        position: 'sticky', top: 0,
        height: '100vh', overflowY: 'auto',
      }}>
        {/* Reputation card */}
        <div className="card" style={{ padding: '16px', marginBottom: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 14 }}>⭐ Reputation</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Total reputation', value: user.reputation || 0, accent: true },
              { label: 'Weekly upvotes', value: user.weeklyUpvotes || 0 },
              { label: 'Monthly upvotes', value: user.monthlyUpvotes || 0 },
              { label: 'Questions saved', value: user.savedCount || 0 },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}>
                <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{item.label}</span>
                <span style={{
                  fontSize: 14, fontWeight: 700,
                  color: item.accent ? 'var(--accent)' : 'var(--ink)',
                }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Badge */}
        {user.weeklyUpvotes > 0 && (
          <div style={{
            padding: '14px 16px',
            background: 'var(--accent-muted)',
            border: '1px solid var(--accent-border)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🏆</div>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
              Active this week
            </p>
            <p style={{ fontSize: 12, color: 'var(--ink-2)' }}>
              {user.weeklyUpvotes} upvotes earned
            </p>
          </div>
        )}
      </aside>
    </div>
  )
}
