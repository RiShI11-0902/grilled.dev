'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function SignInPage() {
  const [loading, setLoading] = useState<string | null>(null)

  async function handleSignIn(provider: string) {
    setLoading(provider)
    await signIn(provider, { callbackUrl: '/feed' })
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--canvas)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔥</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 8 }}>
            grilled<span style={{ color: 'var(--accent)' }}>.dev</span>
          </h1>
          <p style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.5 }}>
            Save interview threads from X.<br />
            Study them when it matters.
          </p>
        </div>

        {/* Auth card */}
        <div className="card" style={{ padding: '28px' }}>
          <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 20, textAlign: 'center' }}>
            Sign in to get started
          </p>

          <button
            onClick={() => handleSignIn('github')}
            disabled={!!loading}
            style={{
              width: '100%', padding: '12px', borderRadius: 'var(--radius)',
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              color: 'var(--ink)', fontSize: 14, fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, fontFamily: 'var(--font)', marginBottom: 10,
              transition: 'all 150ms',
            }}
            onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-strong)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)' }}
          >
            <GitHubIcon />
            {loading === 'github' ? 'Signing in...' : 'Continue with GitHub'}
          </button>

          {/* <button
            onClick={() => handleSignIn('google')}
            disabled={!!loading}
            style={{
              width: '100%', padding: '12px', borderRadius: 'var(--radius)',
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              color: 'var(--ink)', fontSize: 14, fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, fontFamily: 'var(--font)',
              transition: 'all 150ms',
            }}
            onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-strong)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)' }}
          >
            <GoogleIcon />
            {loading === 'google' ? 'Signing in...' : 'Continue with Google'}
          </button> */}

          <p style={{ marginTop: 20, fontSize: 12, color: 'var(--ink-3)', textAlign: 'center', lineHeight: 1.6 }}>
            By signing in you agree to our terms of service.<br />
            No spam. Ever.
          </p>
        </div>

        {/* Features */}
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            ['🔥', 'Save question threads from X in one click'],
            ['📚', 'Personal library filtered by topic, company, difficulty'],
            ['🏆', 'Earn reputation when your answers get upvoted'],
          ].map(([icon, text]) => (
            <div key={text as string} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18 }}>{icon}</span>
              <p style={{ fontSize: 13, color: 'var(--ink-2)' }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function GitHubIcon() {
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
}

function GoogleIcon() {
  return <svg width={18} height={18} viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
}
