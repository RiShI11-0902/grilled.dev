'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const QUESTIONS = [
  { q: 'What happens when you type a URL in a browser?', tag: 'Networking', company: 'Google', saves: 1247, answers: 89 },
  { q: 'Design a rate limiter for an API with 1M requests/day.', tag: 'System Design', company: 'Meta', saves: 934, answers: 62 },
  { q: 'What is the difference between authentication and authorization?', tag: 'Security', company: 'Amazon', saves: 821, answers: 74 },
  { q: 'How does HashMap work internally in Java?', tag: 'Java', company: 'Flipkart', saves: 743, answers: 51 },
  { q: 'Explain the event loop in Node.js with an example.', tag: 'Node.js', company: 'Uber', saves: 689, answers: 43 },
  { q: 'You have a system working at 1k users. It dies at 50k. Where do you look first?', tag: 'System Design', company: 'Netflix', saves: 1102, answers: 97 },
]

const TAG_COLORS: Record<string, string> = {
  'Networking': '#0891B2', 'System Design': '#7C3AED', 'Security': '#DC2626',
  'Java': '#B45309', 'Node.js': '#16A34A', 'DSA': '#0EA5E9',
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ background: 'var(--canvas)', color: 'var(--ink)', fontFamily: 'var(--font)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── Nav ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 40px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 250ms',
        background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>🔥</span>
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.03em' }}>
            grilled<span style={{ color: 'var(--accent)' }}>.dev</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/feed">
            <button className="btn btn-ghost btn-sm">Explore</button>
          </Link>
          {/* <Link href="/leaderboard">
            <button className="btn btn-ghost btn-sm">Leaderboard</button>
          </Link> */}
          <Link href="/auth/signin">
            <button className="btn btn-primary btn-sm">Get Started</button>
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px 80px',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(232,93,47,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }} />

        {/* Badge */}
        <div className="fade-up" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 14px', borderRadius: 99, marginBottom: 28,
          background: 'var(--accent-muted)', border: '1px solid var(--accent-border)',
          fontSize: 12, fontWeight: 600, color: 'var(--accent)',
        }}>
          <span>🔥</span> Now with Chrome Extension
        </div>

        {/* Headline */}
        <h1 className="fade-up delay-1" style={{
          fontSize: 'clamp(40px, 7vw, 80px)',
          fontWeight: 800, letterSpacing: '-0.04em',
          lineHeight: 1.08, marginBottom: 24,
          maxWidth: 820,
        }}>
          Interview questions<br />
          <span style={{
            background: 'linear-gradient(135deg, #E85D2F, #EF4444)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>finally structured.</span>
        </h1>

        {/* Subheadline */}
        <p className="fade-up delay-2" style={{
          fontSize: 18, color: 'var(--ink-2)', lineHeight: 1.65,
          maxWidth: 520, marginBottom: 40,
        }}>
          Save interview question threads from X in one click.
          Ranked answers. Personal library. Study when it matters.
        </p>

        {/* CTAs */}
        <div className="fade-up delay-3" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 60 }}>
          <Link href="/auth/signin">
            <button className="btn btn-primary btn-lg">
              Start for free →
            </button>
          </Link>
          <Link href="/feed">
            <button className="btn btn-secondary btn-lg">
              Browse questions
            </button>
          </Link>
        </div>

        {/* Social proof */}
        <div className="fade-up" style={{
          display: 'flex', gap: 32, color: 'var(--ink-3)', fontSize: 13,
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {[['12,400+', 'Questions saved'], ['89,000+', 'Answers imported'], ['$0', 'Cost to use']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.03em' }}>{num}</p>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{
        padding: '100px 24px',
        borderTop: '1px solid var(--border-subtle)',
        maxWidth: 1100, margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
            How it works
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
            Three users. One product.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            {
              icon: '📤',
              title: 'The Questioner',
              subtitle: 'Posted on X, lost in replies',
              desc: 'You tweeted an interview question. Got 200 random replies. Best answer buried. Question dies in 6 hours. With Grilled.dev — one click saves it forever, structured and ranked.',
              color: '#E85D2F',
            },
            {
              icon: '✍️',
              title: 'The Answerer',
              subtitle: 'Knows the answer, gets nothing',
              desc: 'You write a great answer on X and get 3 likes. On Grilled.dev, every upvote builds your public reputation. Top answerers appear on the weekly leaderboard — real career value.',
              color: '#7C3AED',
            },
            {
              icon: '📚',
              title: 'The Learner',
              subtitle: 'Saved 400 tweets, found nothing',
              desc: 'X bookmarks are a graveyard. Your Grilled.dev library is filtered by topic, company, and difficulty. Open it before any interview and find exactly what you need.',
              color: '#0891B2',
            },
          ].map((card, i) => (
            <div key={card.title} className="card fade-up" style={{
              padding: '28px', animationDelay: `${i * 0.1}s`,
              borderColor: `${card.color}22`,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 'var(--radius)',
                background: `${card.color}18`, border: `1px solid ${card.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, marginBottom: 16,
              }}>{card.icon}</div>
              <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{card.title}</p>
              <p style={{ fontSize: 12, color: card.color, fontWeight: 500, marginBottom: 12 }}>{card.subtitle}</p>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Live question feed preview ── */}
      <section style={{
        padding: '100px 24px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--surface)',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              Live questions
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Real questions. From real interviews.
            </h2>
          </div>

          {/* Question cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            {QUESTIONS.map((q, i) => (
              <Link key={i} href="/feed" style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '18px 20px',
                  borderBottom: i < QUESTIONS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  background: 'var(--canvas)',
                  transition: 'background 150ms',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--canvas)')}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink)', flex: 1 }}>{q.q}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                      <span style={{
                        fontSize: 11, padding: '2px 8px', borderRadius: 99,
                        background: 'var(--surface-2)', color: 'var(--ink-2)',
                        border: '1px solid var(--border)',
                      }}>{q.company}</span>
                      <span style={{
                        fontSize: 11, padding: '2px 8px', borderRadius: 99,
                        background: `${TAG_COLORS[q.tag] || '#888'}14`,
                        color: TAG_COLORS[q.tag] || 'var(--ink-2)',
                        border: `1px solid ${TAG_COLORS[q.tag] || '#888'}25`,
                      }}>#{q.tag}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12, color: 'var(--ink-3)' }}>
                    <span>💾 {q.saves.toLocaleString()} saved</span>
                    <span>💬 {q.answers} answers</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link href="/feed">
              <button className="btn btn-secondary">Browse all questions →</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Extension section ── */}
      <section style={{ padding: '100px 24px', borderTop: '1px solid var(--border-subtle)', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Chrome Extension
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.2 }}>
              Never leave X.<br />Never lose a question.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 28 }}>
              Open any interview question thread. The extension detects it automatically. One click saves the entire thread — question and all replies — structured and ranked to Grilled.dev.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {[
                'Scrapes full thread — question + all replies',
                'Ranked by X likes automatically',
                'Add tags, company, difficulty in 3 clicks',
                'Goes to your library AND the public feed',
                'Zero API cost — completely free',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: 'var(--success)', fontSize: 14 }}>✓</span>
                  <p style={{ fontSize: 14, color: 'var(--ink-2)' }}>{item}</p>
                </div>
              ))}
            </div>
            <Link href="/auth/signin">
              <button className="btn btn-primary btn-lg">Install Extension — Free</button>
            </Link>
          </div>

          {/* Extension mockup */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            }}>
              {/* Fake X tweet */}
              <div style={{ padding: '16px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--canvas)' }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#E85D2F,#EF4444)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>javarevisited</p>
                    <p style={{ fontSize: 12, color: 'var(--ink-3)' }}>@javarevisited · 2h</p>
                  </div>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>
                  Interviewer: "What happens when you type a URL in a browser?" — How do you answer this?
                </p>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--ink-3)' }}>
                  <span>💬 89</span><span>🔁 234</span><span>❤️ 1.2K</span>
                </div>
              </div>

              {/* Extension injected button */}
              <div style={{
                padding: '12px 16px',
                background: 'linear-gradient(135deg, rgba(232,93,47,0.08), rgba(232,93,47,0.04))',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>🔥</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>grilled.dev</span>
                </div>
                <div style={{
                  padding: '6px 14px', borderRadius: 99,
                  background: 'var(--accent)', color: 'white',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}>
                  Save thread
                </div>
              </div>

              {/* Fake replies */}
              {[
                { name: 'Rahul S', text: '1. DNS lookup 2. TCP handshake 3. HTTP request 4. Server response 5. DOM render', likes: 847 },
                { name: 'Priya K', text: 'Browser checks cache first, then DNS resolver, then TLD server...', likes: 423 },
              ].map((reply, i) => (
                <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--canvas)' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--surface-3)', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{reply.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5 }}>{reply.text}</p>
                      <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 6 }}>❤️ {reply.likes}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Leaderboard teaser ── */}
      <section style={{
        padding: '100px 24px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--surface)',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
            Leaderboard
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Your answers build your reputation.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 40 }}>
            Every upvote on your answer adds to your score. Top answerers get featured weekly — something real to put on your resume or LinkedIn.
          </p>

          {/* Fake leaderboard */}
          <div className="card" style={{ overflow: 'hidden', marginBottom: 24 }}>
            {[
              { rank: '🥇', name: 'Rahul Sharma', handle: 'rahul_codes', score: 1247 },
              { rank: '🥈', name: 'Priya Singh', handle: 'priya_dev', score: 934 },
              { rank: '🥉', name: 'Arjun Mehta', handle: 'arjun_m', score: 821 },
              { rank: '#4', name: 'Sneha Patel', handle: 'sneha_p', score: 743 },
              { rank: '#5', name: 'Vikram Nair', handle: 'vikram_n', score: 689 },
            ].map((user, i) => (
              <div key={user.handle} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 20px',
                borderBottom: i < 4 ? '1px solid var(--border-subtle)' : 'none',
                background: i === 0 ? 'rgba(232,93,47,0.04)' : 'transparent',
              }}>
                <span style={{ fontSize: i < 3 ? 20 : 14, width: 28, textAlign: 'center', color: i >= 3 ? 'var(--ink-3)' : undefined }}>{user.rank}</span>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                  background: i === 0 ? 'linear-gradient(135deg,#E85D2F,#EF4444)' : 'var(--surface-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: 'white',
                }}>{user.name[0]}</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{user.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--ink-3)' }}>@{user.handle}</p>
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: i === 0 ? 'var(--accent)' : 'var(--ink)' }}>
                  {user.score.toLocaleString()}
                  <span style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 400, marginLeft: 3 }}>pts</span>
                </span>
              </div>
            ))}
          </div>
          <Link href="/leaderboard">
            <button className="btn btn-secondary">View full leaderboard →</button>
          </Link>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{
        padding: '120px 24px',
        borderTop: '1px solid var(--border-subtle)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500, height: 300,
          background: 'radial-gradient(ellipse, rgba(232,93,47,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ fontSize: 48, marginBottom: 24 }}>🔥</div>
        <h2 style={{ fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16, maxWidth: 600, margin: '0 auto 16px' }}>
          Get grilled.<br />Get hired.
        </h2>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', marginBottom: 36, lineHeight: 1.6 }}>
          Free forever. No credit card. Just install and start saving.
        </p>
        <Link href="/auth/signin">
          <button className="btn btn-primary btn-lg">Start for free →</button>
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: '24px 40px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>🔥</span>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em' }}>
            grilled<span style={{ color: 'var(--accent)' }}>.dev</span>
          </span>
          <span style={{ color: 'var(--ink-3)', fontSize: 13 }}>© 2025</span>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[['Explore', '/feed'], ['Library', '/library'], ['Sign in', '/auth/signin'], ['Privacy', '/privacy']].map(([label, href]) => (
            <Link key={href} href={href} style={{ fontSize: 13, color: 'var(--ink-3)', textDecoration: 'none', transition: 'color 150ms' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
            >{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  )
}
