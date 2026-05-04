'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import PostCard from '@/components/PostCard'

const SORTS = [
  { key: 'latest',     label: 'Latest' },
  { key: 'top',        label: 'Top' },
  { key: 'trending',   label: 'Most Saved' },
  { key: 'unanswered', label: 'Unanswered' },
]

export default function FeedPage() {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')
  const [sort, setSort] = useState('latest')
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [total, setTotal] = useState(0)

  const fetchPosts = useCallback(async (reset = false) => {
    setLoading(true)
    try {
      const p = reset ? 1 : page
      const params = new URLSearchParams({ sort, page: String(p) })
      if (tag) params.set('tag', tag)
      const res = await fetch(`/api/posts?${params}`)
      const data = await res.json()
      const newPosts = data.posts || []
      setPosts(prev => reset ? newPosts : [...prev, ...newPosts])
      setPage(reset ? 2 : p + 1)
      setHasMore(newPosts.length === 20)
      setTotal(data.total || 0)
    } finally {
      setLoading(false)
    }
  }, [sort, tag, page])

  useEffect(() => { fetchPosts(true) }, [sort, tag])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', maxWidth: 1280, margin: '0 auto' }}>
      <Sidebar />

      <main style={{ flex: 1, borderRight: '1px solid var(--border-subtle)', minWidth: 0 }}>
        {/* Sticky header */}
        <div className="header-blur" style={{
          position: 'sticky', top: 0, zIndex: 10,
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
              {tag ? <><span style={{ color: 'var(--ink-2)' }}>#</span>{tag}</> : 'Explore'}
            </h1>
            {total > 0 && (
              <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>{total.toLocaleString()} questions</span>
            )}
          </div>
          <div className="tab-bar" style={{ padding: '0 20px', gap: 0 }}>
            {SORTS.map(s => (
              <button key={s.key} className={`tab ${sort === s.key ? 'active' : ''}`} onClick={() => setSort(s.key)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {!loading && posts.length === 0 && (
          <div className="empty-state fade-up">
            <div className="empty-state-icon">🔥</div>
            <h3>No questions yet</h3>
            <p>Install the Chrome extension and save<br />interview threads from X to get started.</p>
          </div>
        )}

        {/* Posts */}
        {posts.map((post, i) => (
          <div key={post._id} className="fade-up" style={{ animationDelay: `${Math.min(i, 5) * 0.04}s` }}>
            <PostCard post={post} />
          </div>
        ))}

        {/* Skeleton */}
        {loading && posts.length === 0 && (
          <div style={{ padding: '0' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ padding: '20px', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                  <div className="skeleton" style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="skeleton" style={{ height: 12, width: '30%', marginBottom: 6 }} />
                    <div className="skeleton" style={{ height: 12, width: '20%' }} />
                  </div>
                </div>
                <div className="skeleton" style={{ height: 14, width: '90%', marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 14, width: '70%', marginBottom: 12 }} />
                <div style={{ display: 'flex', gap: 6 }}>
                  <div className="skeleton" style={{ height: 22, width: 60, borderRadius: 99 }} />
                  <div className="skeleton" style={{ height: 22, width: 60, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <button
              onClick={() => fetchPosts()}
              disabled={loading}
              className="btn btn-secondary"
              style={{ minWidth: 140 }}
            >
              {loading ? 'Loading...' : 'Load more'}
            </button>
          </div>
        )}
      </main>

      {/* Right panel */}
      <RightPanel />
    </div>
  )
}

function RightPanel() {
  const [leaders, setLeaders] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/leaderboard?period=weekly')
      .then(r => r.json())
      .then(d => setLeaders(d.leaders?.slice(0, 5) || []))
      .catch(() => {})
  }, [])

  return (
    <aside style={{
      width: 300, flexShrink: 0,
      padding: '20px 16px',
      position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
    }}>
      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '9px 14px', marginBottom: 20,
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 99,
      }}>
        <SearchIcon />
        <input
          placeholder="Search questions..."
          style={{ flex: 1, fontSize: 13, color: 'var(--ink)' }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              const q = (e.target as HTMLInputElement).value.trim()
              if (q) window.location.href = `/feed?q=${encodeURIComponent(q)}`
            }
          }}
        />
      </div>

      {/* Leaderboard */}
      {/* <div className="card" style={{ overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14 }}>🏆 This Week</p>
            <p style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>Top by upvotes</p>
          </div>
          <a href="/leaderboard" style={{ fontSize: 12, color: 'var(--accent)' }}>View all →</a>
        </div>

        {leaders.length === 0 ? (
          <div style={{ padding: '20px 16px', textAlign: 'center', color: 'var(--ink-3)', fontSize: 13 }}>
            No data yet
          </div>
        ) : leaders.map((u, i) => {
          const initials = u.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
          const MEDALS = ['🥇','🥈','🥉']
          return (
            <a key={u._id} href={`/profile/${u.username}`} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 16px', borderBottom: i < 4 ? '1px solid var(--border-subtle)' : 'none',
                transition: 'background 120ms', cursor: 'pointer',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontSize: 16, width: 22, textAlign: 'center' }}>
                  {i < 3 ? MEDALS[i] : `${i + 1}`}
                </span>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                  background: i === 0 ? 'linear-gradient(135deg,#E85D2F,#EF4444)' : 'var(--surface-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: 'white',
                }}>{initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--ink-3)' }}>@{u.username}</p>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>
                  {u.weeklyUpvotes}🔥
                </span>
              </div>
            </a>
          )
        })}
      </div> */}

      {/* Extension CTA */}
      {/* <div style={{
        padding: '16px', background: 'var(--surface-2)',
        border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>🔥 Get the Extension</p>
        <p style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 12 }}>
          See an interview question on X? Save the whole thread in one click.
        </p>
        <a href="/extension" className="btn btn-primary btn-sm" style={{ width: '100%', textDecoration: 'none' }}>
          Install for Chrome — Free
        </a>
      </div> */}
    </aside>
  )
}

function SearchIcon() {
  return <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
}
