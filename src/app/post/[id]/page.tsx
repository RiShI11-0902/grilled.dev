'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { formatDistanceToNow } from 'date-fns'
import { AddAnswerBox } from '@/components/AddAnswerBox'

const DIFF_CLASS: Record<string, string> = { easy: 'diff-easy', medium: 'diff-medium', hard: 'diff-hard' }

export default function PostPage() {
  const { id } = useParams()
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState<any[]>([])

  useEffect(() => {
    if (!id) return
    fetch(`/api/posts/${id}`)
      .then(r => r.json())
      .then(data => {
        setPost(data)
        setAnswers((data.answers || []).sort((a: any, b: any) => b.upvotes - a.upvotes))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  async function upvoteAnswer(answerId: string, idx: number) {
    const res = await fetch(`/api/posts/${id}/answers/${answerId}/upvote`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) {
      const data = await res.json()
      setAnswers(prev => prev.map((a, i) => i === idx ? { ...a, upvotes: data.upvotes } : a))
    }
  }

  if (loading) return (
    <div style={{ display: 'flex', minHeight: '100vh', maxWidth: 1280, margin: '0 auto' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--ink-2)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔥</div>
          <p>Loading...</p>
        </div>
      </main>
    </div>
  )

  if (!post) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh', maxWidth: 1280, margin: '0 auto' }}>
      <Sidebar />

      <main style={{ flex: 1, borderRight: '1px solid var(--border-subtle)', minWidth: 0 }}>
        {/* Header */}
        <div className="header-blur" style={{
          position: 'sticky', top: 0, zIndex: 10,
          borderBottom: '1px solid var(--border-subtle)',
          padding: '14px 20px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <button onClick={() => router.back()} className="btn btn-ghost btn-sm" style={{ padding: '0 10px' }}>
            ← Back
          </button>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600 }}>Question</p>
            <p style={{ fontSize: 12, color: 'var(--ink-2)' }}>{answers.length} answers · {post.views} views</p>
          </div>
          {post.tweetUrl && (
            <a href={post.tweetUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto' }}>
              <button className="btn btn-secondary btn-sm" style={{ gap: 6 }}>
                <XIcon size={11} /> View on X
              </button>
            </a>
          )}
        </div>

        {/* Question */}
        <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            {post.authorAvatar ? (
              <img src={post.authorAvatar} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(135deg,#E85D2F,#EF4444)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: 'white',
              }}>{post.authorName?.[0]}</div>
            )}
            <div>
              <p style={{ fontWeight: 600, fontSize: 14 }}>{post.authorName}</p>
              <p style={{ fontSize: 12, color: 'var(--ink-2)' }}>
                @{post.authorHandle} · {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
              {post.company && (
                <span style={{
                  padding: '3px 10px', borderRadius: 99, fontSize: 12,
                  background: 'var(--surface-2)', border: '1px solid var(--border)',
                  color: 'var(--ink-2)',
                }}>{post.company}</span>
              )}
              <span className={`tag ${DIFF_CLASS[post.difficulty]}`}>{post.difficulty}</span>
            </div>
          </div>

          {/* Question text */}
          <p style={{ fontSize: 18, lineHeight: 1.7, fontWeight: 400, marginBottom: 16, color: 'var(--ink)' }}>
            {post.question}
          </p>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {post.tags.map((tag: string) => (
                <span key={tag} className="tag tag-default" style={{ fontSize: 12 }}>#{tag}</span>
              ))}
            </div>
          )}

          {/* Stats */}
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--ink-3)' }}>
            <span>💾 {post.saveCount} saved</span>
            <span>💬 {answers.length} answers</span>
            <span>👁 {post.views} views</span>
          </div>
        </div>

        {/* Add answer box */}
        <AddAnswerBox postId={id as string} onAnswerAdded={(ans) => setAnswers(prev => [ans, ...prev])} />

        {/* Answers header */}
        <div style={{
          padding: '14px 24px', borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <p style={{ fontWeight: 600, fontSize: 14 }}>
            {answers.length} Answers
            <span style={{ fontWeight: 400, color: 'var(--ink-2)', fontSize: 13, marginLeft: 8 }}>
              ranked by upvotes
            </span>
          </p>
          <span style={{ fontSize: 12, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <XIcon size={11} /> Imported from X replies
          </span>
        </div>

        {/* Answers list */}
        {answers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💭</div>
            <h3>No answers yet</h3>
            <p>This question has no replies on X yet.</p>
          </div>
        ) : (
          answers.map((answer, i) => (
            <AnswerCard
              key={answer._id}
              answer={answer}
              index={i}
              onUpvote={() => upvoteAnswer(answer._id, i)}
              isTop={i === 0}
            />
          ))
        )}
      </main>

      {/* Question sidebar */}
      <aside style={{ width: 280, flexShrink: 0, padding: '24px 16px', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div className="card" style={{ padding: '16px', marginBottom: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>About this question</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Saved by', value: `${post.saveCount} people` },
              { label: 'Answers', value: answers.length },
              { label: 'Views', value: post.views },
              { label: 'Difficulty', value: post.difficulty },
              ...(post.company ? [{ label: 'Company', value: post.company }] : []),
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 500, textTransform: 'capitalize' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {post.tags?.length > 0 && (
          <div className="card" style={{ padding: '16px' }}>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Topics</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {post.tags.map((tag: string) => (
                <a key={tag} href={`/feed?tag=${encodeURIComponent(tag)}`}>
                  <span className="tag tag-default" style={{ fontSize: 12, cursor: 'pointer' }}>#{tag}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}

function AnswerCard({ answer, index, onUpvote, isTop }: any) {
  const [upvotes, setUpvotes] = useState(answer.upvotes)
  const [upvoted, setUpvoted] = useState(false)

  async function handleUpvote(e: React.MouseEvent) {
    e.preventDefault()
    const res = await onUpvote()
    setUpvoted(v => !v)
    setUpvotes((v: number) => upvoted ? v - 1 : v + 1)
  }

  const initials = answer.authorName?.[0]?.toUpperCase() || '?'

  return (
    <div style={{
      padding: '20px 24px',
      borderBottom: '1px solid var(--border-subtle)',
      background: isTop ? 'rgba(232,93,47,0.02)' : 'transparent',
    }} className="fade-up">
      {isTop && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
          background: 'var(--accent-muted)', color: 'var(--accent)',
          border: '1px solid var(--accent-border)', marginBottom: 12,
        }}>
          🏆 Top Answer
        </div>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        {/* Avatar */}
        {answer.avatar ? (
          <img src={answer.avatar} style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'var(--surface-3)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: 'var(--ink-2)',
          }}>{initials}</div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{answer.authorName}</span>
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>@{answer.authorHandle}</span>
            <span style={{ fontSize: 12, color: 'var(--ink-3)', marginLeft: 'auto' }}>
              ❤️ {answer.likes?.toLocaleString() || 0} on X
            </span>
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 12, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {answer.text}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={handleUpvote}
              className={`action-btn ${upvoted ? 'active' : ''}`}
            >
              🔥 {upvotes} upvotes
            </button>

            {answer.tweetUrl && (
              <a href={answer.tweetUrl} target="_blank" rel="noopener noreferrer">
                <button className="action-btn" style={{ fontSize: 12 }}>
                  <XIcon size={11} /> View reply
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function XIcon({ size = 13 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
}
