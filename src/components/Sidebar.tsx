'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/feed',        label: 'Explore',     icon: CompassIcon },
  { href: '/library',     label: 'My Library',  icon: BookmarkIcon },
  // { href: '/leaderboard', label: 'Leaderboard', icon: TrophyIcon },
  { href: '/profile',     label: 'Profile',     icon: UserIcon },
]

const TAGS = ['System Design','DSA','Java','React','Node.js','Git','SQL','Python','DevOps','Security']

const TAG_COLORS: Record<string, string> = {
  'System Design': '#7C3AED', 'DSA': '#0891B2', 'Java': '#B45309',
  'React': '#0EA5E9', 'Node.js': '#16A34A', 'Git': '#DC2626',
  'SQL': '#9333EA', 'Python': '#2563EB', 'DevOps': '#0891B2', 'Security': '#DC2626',
}

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      width: 240, minHeight: '100vh', padding: '0 8px',
      borderRight: '1px solid var(--border-subtle)',
      position: 'sticky', top: 0, height: '100vh',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <Link href="/feed" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '20px 12px 16px', textDecoration: 'none' }}>
        <span style={{ fontSize: 20 }}>🔥</span>
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)' }}>
          grilled<span style={{ color: 'var(--accent)' }}>.dev</span>
        </span>
      </Link>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 24 }}>
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname?.startsWith(href + '/')
          return (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 'var(--radius)',
                background: active ? 'var(--surface-2)' : 'transparent',
                color: active ? 'var(--ink)' : 'var(--ink-2)',
                fontWeight: active ? 600 : 400, fontSize: 14,
                transition: 'all 150ms var(--ease)', cursor: 'pointer',
              }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLDivElement).style.background = 'var(--surface-2)' }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
              >
                <Icon size={17} />
                {label}
                {href === '/library' && (
                  <span style={{
                    marginLeft: 'auto', fontSize: 11, padding: '1px 7px',
                    background: 'var(--accent-muted)', color: 'var(--accent)',
                    borderRadius: 99, border: '1px solid var(--accent-border)',
                  }}>New</span>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Install extension CTA */}
      <div style={{
        margin: '0 4px 20px', padding: '14px',
        background: 'var(--accent-muted)', border: '1px solid var(--accent-border)',
        borderRadius: 'var(--radius-lg)',
      }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', marginBottom: 6 }}>
          🔥 Chrome Extension
        </p>
        <p style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 10 }}>
          Save question threads from X in one click.
        </p>
        <a href="https://chromewebstore.google.com/detail/piaechegdcedalnbbmldpfolgcmljpck?utm_source=item-share-cb" style={{
          display: 'block', textAlign: 'center', padding: '7px',
          background: 'var(--accent)', color: 'white', borderRadius: 'var(--radius)',
          fontSize: 12, fontWeight: 600, textDecoration: 'none',
        }}>
          Install Free →
        </a>
      </div>

      {/* Topics */}
      <div style={{ padding: '0 4px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10, padding: '0 8px' }}>
          Topics
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {TAGS.map(tag => (
            <Link key={tag} href={`/feed?tag=${encodeURIComponent(tag)}`} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 12px', borderRadius: 'var(--radius)',
                fontSize: 13, color: 'var(--ink-2)', cursor: 'pointer',
                transition: 'all 150ms var(--ease)',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--surface-2)'; (e.currentTarget as HTMLDivElement).style.color = 'var(--ink)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.color = 'var(--ink-2)' }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: TAG_COLORS[tag] || '#888', flexShrink: 0 }} />
                {tag}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 'auto', padding: '16px 12px 20px', fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.8 }}>
        <p>grilled.dev © 2025</p>
        <p style={{ color: 'var(--ink-3)' }}>Get grilled. Get hired.</p>
      </div>
    </aside>
  )
}

function CompassIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
}
function BookmarkIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
}
function TrophyIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M6 9H4a2 2 0 01-2-2V5h4m14 4h2a2 2 0 002-2V5h-4m-6 13v-3m0 0a6 6 0 006-6V5H6v8a6 6 0 006 6z"/></svg>
}
function UserIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
