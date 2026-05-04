'use client'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

const DIFF_CLASS: Record<string, string> = { easy: 'diff-easy', medium: 'diff-medium', hard: 'diff-hard' }

const TAG_COLORS: Record<string, string> = {
  'System Design': '#7C3AED', 'DSA': '#0891B2', 'Java': '#B45309',
  'React': '#0EA5E9', 'Node.js': '#16A34A', 'Git': '#DC2626',
  'SQL': '#9333EA', 'Python': '#2563EB', 'DevOps': '#0891B2', 'Security': '#DC2626',
}

export default function PostCard({ post, inLibrary = false }: { post: any; inLibrary?: boolean }) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
  const answerCount = post.answers?.length ?? 0

  return (
    <Link href={`/post/${post._id}`}>
      <article className="feed-item" style={{ padding: '18px 20px' }}>

        {/* Top row: author + meta */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Avatar */}
            {post.authorAvatar ? (
              <img src={post.authorAvatar} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #E85D2F, #EF4444)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: 'white',
              }}>
                {post.authorName?.[0]?.toUpperCase() || '?'}
              </div>
            )}
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                {post.authorName}
              </span>
              <span style={{ fontSize: 12, color: 'var(--ink-3)', marginLeft: 6 }}>
                @{post.authorHandle}
              </span>
            </div>
          </div>

          {/* Right meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {post.company && (
              <span style={{
                fontSize: 11, padding: '2px 8px', borderRadius: 99,
                background: 'var(--surface-2)', color: 'var(--ink-2)',
                border: '1px solid var(--border)',
              }}>{post.company}</span>
            )}
            <span className={`tag ${DIFF_CLASS[post.difficulty] || 'diff-medium'}`} style={{ fontSize: 11 }}>
              {post.difficulty}
            </span>
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{timeAgo}</span>
          </div>
        </div>

        {/* Question text */}
        <p style={{
          fontSize: 15, lineHeight: 1.65, color: 'var(--ink)',
          marginBottom: 12, fontWeight: 400,
        }}>
          {post.question}
        </p>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
            {post.tags.map((tag: string) => (
              <span key={tag} style={{
                fontSize: 11, padding: '3px 9px', borderRadius: 99,
                background: `${TAG_COLORS[tag] || '#888'}12`,
                color: TAG_COLORS[tag] || 'var(--ink-2)',
                border: `1px solid ${TAG_COLORS[tag] || '#888'}22`,
                fontWeight: 500,
              }}>#{tag}</span>
            ))}
          </div>
        )}

        {/* Stats row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button className="action-btn" onClick={e => e.preventDefault()}>
            <SaveIcon size={13} />
            <span>{post.saveCount ?? 1} saved</span>
          </button>

          <button className="action-btn" onClick={e => e.preventDefault()}>
            <MessageIcon size={13} />
            <span>{answerCount} answers</span>
          </button>

          <button className="action-btn" onClick={e => e.preventDefault()}>
            <EyeIcon size={13} />
            <span>{post.views ?? 0}</span>
          </button>

          {/* Source link */}
          {post.tweetUrl && (
            <a
              href={post.tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ marginLeft: 'auto' }}
            >
              <button className="action-btn" style={{ fontSize: 11, gap: 4 }}>
                <XIcon size={11} />
                <span>Source</span>
              </button>
            </a>
          )}
        </div>
      </article>
    </Link>
  )
}

function SaveIcon({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
}
function MessageIcon({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
}
function EyeIcon({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
}
function XIcon({ size = 13 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
}
