'use client'
import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<any[]>([])
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/leaderboard?period=${period}`)
      .then(r => r.json())
      .then(d => { setLeaders(d.leaders || []); setLoading(false) })
  }, [period])

  const MEDALS = ['🥇', '🥈', '🥉']
  const PODIUM_GRADS = [
    'linear-gradient(135deg,#9CA3AF,#6B7280)',
    'linear-gradient(135deg,#E85D2F,#EF4444)',
    'linear-gradient(135deg,#B45309,#D97706)',
  ]
  const PODIUM_ORDER = [1, 0, 2] // silver, gold, bronze

  return (
    <div style={{ display: 'flex', minHeight: '100vh', maxWidth: 1280, margin: '0 auto' }}>
      <Sidebar />

      <main style={{ flex: 1, maxWidth: 760, minWidth: 0 }}>
        {/* Header */}
        <div className="header-blur" style={{
          position: 'sticky', top: 0, zIndex: 10,
          borderBottom: '1px solid var(--border-subtle)',
          padding: '20px 24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>
                Leaderboard
              </h1>
              <p style={{ fontSize: 13, color: 'var(--ink-2)' }}>
                Ranked by answer upvotes from the community
              </p>
            </div>

            {/* Period toggle */}
            <div style={{
              display: 'flex', background: 'var(--surface-2)',
              border: '1px solid var(--border)', borderRadius: 99, padding: 3,
            }}>
              {(['weekly', 'monthly'] as const).map(p => (
                <button key={p} onClick={() => setPeriod(p)} style={{
                  padding: '6px 16px', borderRadius: 99, border: 'none', cursor: 'pointer',
                  background: period === p ? 'var(--accent)' : 'transparent',
                  color: period === p ? 'white' : 'var(--ink-2)',
                  fontSize: 13, fontWeight: 500, fontFamily: 'var(--font)',
                  transition: 'all 150ms',
                }}>
                  {p === 'weekly' ? 'This Week' : 'This Month'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Podium - top 3 */}
        {!loading && leaders.length >= 3 && (
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            gap: 16, padding: '40px 24px 32px',
            borderBottom: '1px solid var(--border-subtle)',
          }}>
            {PODIUM_ORDER.map((rankIdx, podiumPos) => {
              const user = leaders[rankIdx]
              if (!user) return null
              const score = period === 'weekly' ? user.weeklyUpvotes : user.monthlyUpvotes
              const initials = user.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
              const heights = [140, 180, 130]
              const isGold = rankIdx === 0

              return (
                <a key={user._id} href={`/profile/${user.username}`} style={{ textDecoration: 'none', flex: 1, maxWidth: 180 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>{MEDALS[rankIdx]}</div>

                    <div style={{
                      width: isGold ? 68 : 56, height: isGold ? 68 : 56,
                      borderRadius: '50%', margin: '0 auto 10px',
                      background: PODIUM_GRADS[rankIdx],
                      border: isGold ? '3px solid rgba(232,93,47,0.4)' : '2px solid var(--border)',
                      boxShadow: isGold ? '0 0 24px rgba(232,93,47,0.2)' : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: isGold ? 22 : 16, fontWeight: 700, color: 'white',
                    }}>{initials}</div>

                    <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, color: 'var(--ink)' }}>
                      {user.name?.split(' ')[0]}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 8 }}>@{user.username}</p>

                    <div style={{
                      padding: '6px 14px', borderRadius: 99, display: 'inline-block',
                      background: isGold ? 'var(--accent-muted)' : 'var(--surface-2)',
                      border: `1px solid ${isGold ? 'var(--accent-border)' : 'var(--border)'}`,
                    }}>
                      <span style={{ fontWeight: 800, fontSize: 16, color: isGold ? 'var(--accent)' : 'var(--ink)' }}>
                        {score}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--ink-3)', marginLeft: 4 }}>pts</span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        )}

        {/* Full list */}
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--ink-2)' }}>
            <p>Loading leaderboard...</p>
          </div>
        ) : leaders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🏆</div>
            <h3>No rankings yet</h3>
            <p>Upvote answers to help the best ones rise to the top.</p>
          </div>
        ) : (
          <div>
            {leaders.map((user, i) => {
              const score = period === 'weekly' ? user.weeklyUpvotes : user.monthlyUpvotes
              const initials = user.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()

              return (
                <a key={user._id} href={`/profile/${user.username}`} style={{ textDecoration: 'none' }}>
                  <div className="feed-item" style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '16px 24px',
                    background: i === 0 ? 'rgba(232,93,47,0.03)' : 'transparent',
                  }}>
                    <div style={{
                      width: 36, textAlign: 'center', flexShrink: 0,
                      fontSize: i < 3 ? 22 : 15, fontWeight: 700,
                      color: i >= 3 ? 'var(--ink-3)' : undefined,
                    }}>
                      {i < 3 ? MEDALS[i] : `#${i + 1}`}
                    </div>

                    <div style={{
                      width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                      background: i === 0 ? 'linear-gradient(135deg,#E85D2F,#EF4444)' : 'var(--surface-3)',
                      border: `1px solid ${i === 0 ? 'rgba(232,93,47,0.3)' : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 15, fontWeight: 700,
                      color: i === 0 ? 'white' : 'var(--ink-2)',
                    }}>{initials}</div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{user.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                        @{user.username} · ⭐ {user.reputation} reputation · 💾 {user.savedCount} saved
                      </p>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{
                        fontSize: 22, fontWeight: 800,
                        color: i === 0 ? 'var(--accent)' : 'var(--ink)',
                      }}>{score}</p>
                      <p style={{ fontSize: 11, color: 'var(--ink-3)' }}>🔥 upvotes</p>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
