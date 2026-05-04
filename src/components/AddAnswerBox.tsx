"use client"
import { useState } from "react";

 export function AddAnswerBox({ postId, onAnswerAdded }: { postId: string; onAnswerAdded: (ans: any) => void }) {
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [open, setOpen] = useState(false)

  async function handleSubmit() {
    if (!text.trim() || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/posts/${postId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      })
      if (res.status === 401) { alert('Please sign in to answer'); return }
      const data = await res.json()
      onAnswerAdded(data)
      setText('')
      setOpen(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="btn btn-secondary"
          style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--ink-3)', fontWeight: 400 }}
        >
          ✍️ Write your answer...
        </button>
      ) : (
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Share your answer. Be clear and structured..."
            rows={5}
            maxLength={2000}
            style={{ width: '100%', fontSize: 14, lineHeight: 1.7, color: 'var(--ink)' }}
            autoFocus
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{2000 - text.length} chars left</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setOpen(false)} className="btn btn-ghost btn-sm">Cancel</button>
              <button
                onClick={handleSubmit}
                disabled={!text.trim() || submitting}
                className="btn btn-primary btn-sm"
              >
                {submitting ? 'Posting...' : 'Post Answer 🔥'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}