'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfileRedirect() {
  const router = useRouter()

  useEffect(() => {
    fetch('/api/users/me')
      .then(r => r.json())
      .then(user => {
        if (user?.username) router.push(`/profile/${user.username}`)
        else router.push('/auth/signin')
      })
      .catch(() => router.push('/auth/signin'))
  }, [])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      color: 'var(--ink-2)', fontFamily: 'var(--font)',
      background: 'var(--canvas)',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🔥</div>
        <p>Loading your profile...</p>
      </div>
    </div>
  )
}
