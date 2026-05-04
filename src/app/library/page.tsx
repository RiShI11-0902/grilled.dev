'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import PostCard from '@/components/PostCard'

const TAGS = ['System Design','DSA','Java','React','Node.js','Git','SQL','Python','DevOps','Security']
const COMPANIES = ['Google','Amazon','Meta','Microsoft','Apple','Netflix','Uber','Flipkart']
const DIFFS = ['easy','medium','hard']

export default function LibraryPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [tag, setTag] = useState('')
  const [company, setCompany] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [search, setSearch] = useState('')

  async function fetchLibrary() {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (tag) params.set('tag', tag)
      if (company) params.set('company', company)
      if (difficulty) params.set('difficulty', difficulty)
      if (search) params.set('q', search)
      const res = await fetch(`/api/library?${params}`)
      const data = await res.json()
      setPosts(data.posts || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLibrary() }, [tag, company, difficulty])

  function handleSearch(e: React.KeyboardEvent) {
    if (e.key === 'Enter') fetchLibrary()
  }

  const activeFilters = [tag, company, difficulty].filter(Boolean).length

  return (
    <div style={{ display: 'flex', minHeight: '100vh', maxWidth: 1280, margin: '0 auto' }}>
      <Sidebar />

      <main style={{ flex: 1, minWidth: 0 }}>
        {/* Header */}
        <div className="header-blur" style={{
          position: 'sticky', top: 0, zIndex: 10,
          borderBottom: '1px solid var(--border-subtle)',
          padding: '16px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>My Library</h1>
              <p style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>
                {posts.length} saved question{posts.length !== 1 ? 's' : ''}
              </p>
            </div>
            {activeFilters > 0 && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => { setTag(''); setCompany(''); setDifficulty(''); setSearch('') }}
              >
                Clear filters ({activeFilters})
              </button>
            )}
          </div>

          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 14px', marginBottom: 12,
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 99,
          }}>
            <SearchIcon />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search your library..."
              style={{ flex: 1, fontSize: 13 }}
            />
            {search && (
              <button onClick={() => { setSearch(''); fetchLibrary() }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-3)', fontSize: 16 }}>×</button>
            )}
          </div>

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
            {/* Tags */}
            <select
              value={tag}
              onChange={e => setTag(e.target.value)}
              style={{
                padding: '5px 10px', borderRadius: 99, fontSize: 12, fontWeight: 500,
                background: tag ? 'var(--accent-muted)' : 'var(--surface-2)',
                border: `1px solid ${tag ? 'var(--accent-border)' : 'var(--border)'}`,
                color: tag ? 'var(--accent)' : 'var(--ink-2)', cursor: 'pointer',
                fontFamily: 'var(--font)',
              }}
            >
              <option value="">All Topics</option>
              {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {/* Company */}
            <select
              value={company}
              onChange={e => setCompany(e.target.value)}
              style={{
                padding: '5px 10px', borderRadius: 99, fontSize: 12, fontWeight: 500,
                background: company ? 'var(--accent-muted)' : 'var(--surface-2)',
                border: `1px solid ${company ? 'var(--accent-border)' : 'var(--border)'}`,
                color: company ? 'var(--accent)' : 'var(--ink-2)', cursor: 'pointer',
                fontFamily: 'var(--font)',
              }}
            >
              <option value="">All Companies</option>
              {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Difficulty */}
            <div style={{ display: 'flex', gap: 4 }}>
              {DIFFS.map(d => (
                <button key={d} onClick={() => setDifficulty(difficulty === d ? '' : d)} style={{
                  padding: '5px 12px', borderRadius: 99, fontSize: 12, fontWeight: 500,
                  background: difficulty === d ? 'var(--surface-3)' : 'var(--surface-2)',
                  border: `1px solid ${difficulty === d ? 'var(--border-strong)' : 'var(--border)'}`,
                  color: difficulty === d ? 'var(--ink)' : 'var(--ink-2)',
                  cursor: 'pointer', fontFamily: 'var(--font)', textTransform: 'capitalize',
                }}>{d}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Not logged in */}
        {!loading && posts.length === 0 && !tag && !company && !difficulty && !search && (
          <div className="empty-state fade-up">
            <div className="empty-state-icon">📚</div>
            <h3>Your library is empty</h3>
            <p>
              Install the Chrome extension and open any<br />
              interview question tweet on X.<br />
              Click <strong style={{ color: 'var(--accent)' }}>🔥 Save to Grilled.dev</strong> and it appears here.
            </p>
            <div style={{ marginTop: 24 }}>
              <a href="/extension" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
                Get the Extension — Free
              </a>
            </div>
          </div>
        )}

        {/* No results */}
        {!loading && posts.length === 0 && (tag || company || difficulty || search) && (
          <div className="empty-state fade-up">
            <div className="empty-state-icon">🔍</div>
            <h3>No questions found</h3>
            <p>Try different filters or save more questions from X.</p>
          </div>
        )}

        {/* Skeleton */}
        {loading && (
          <div>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ padding: '20px', borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="skeleton" style={{ height: 14, width: '80%', marginBottom: 10 }} />
                <div className="skeleton" style={{ height: 14, width: '60%', marginBottom: 14 }} />
                <div style={{ display: 'flex', gap: 6 }}>
                  <div className="skeleton" style={{ height: 22, width: 70, borderRadius: 99 }} />
                  <div className="skeleton" style={{ height: 22, width: 70, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Posts */}
        {!loading && posts.map((post, i) => (
          <div key={post._id} className="fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
            <PostCard post={post} inLibrary />
          </div>
        ))}
      </main>

      {/* Study sidebar */}
      <aside style={{
        width: 280, flexShrink: 0,
        padding: '24px 16px',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>
        <div className="card" style={{ padding: '16px', marginBottom: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>📊 Library Stats</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'Total saved', value: posts.length },
              { label: 'Topics covered', value: new Set(posts.flatMap(p => p.tags)).size },
              { label: 'Companies', value: new Set(posts.map(p => p.company).filter(Boolean)).size },
              { label: 'Answers', value: posts.reduce((s, p) => s + (p.answers?.length || 0), 0) },
            ].map(stat => (
              <div key={stat.label} style={{
                padding: '12px', background: 'var(--surface-2)',
                borderRadius: 'var(--radius)', textAlign: 'center',
              }}>
                <p style={{ fontSize: 22, fontWeight: 700 }}>{stat.value}</p>
                <p style={{ fontSize: 11, color: 'var(--ink-2)', marginTop: 2 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>💡 Interview Prep Tips</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Filter by the company you\'re interviewing at',
              'Start with Easy, then Medium, then Hard',
              'Read the top-upvoted answer first',
              'Save new questions from X daily',
            ].map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', fontSize: 13, flexShrink: 0, marginTop: 1 }}>→</span>
                <p style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}

function SearchIcon() {
  return <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
}
