import { Suspense } from 'react'
export default function FeedLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: '#555' }}>Loading...</div>}>{children}</Suspense>
}
