'use client'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div style={{
      background: 'var(--canvas)', color: 'var(--ink)',
      fontFamily: 'var(--font)', minHeight: '100vh',
    }}>
      {/* Nav */}
      <nav style={{
        padding: '0 40px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ fontSize: 18 }}>🔥</span>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.03em' }}>
            grilled<span style={{ color: 'var(--accent)' }}>.dev</span>
          </span>
        </Link>
        <Link href="/feed">
          <button className="btn btn-ghost btn-sm">Back to app</button>
        </Link>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px 100px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
            Legal
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 14, color: 'var(--ink-3)' }}>
            Last updated: May 2025
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <Section title="Overview">
            Grilled.dev is a platform for saving and studying interview question threads from X (Twitter). 
            We take your privacy seriously. This policy explains what data we collect, why we collect it, 
            and how we use it. We do not sell your data. Ever.
          </Section>

          <Section title="What we collect">
            <SubItem title="Account information">
              When you sign in with GitHub or Google we receive your name, email address, 
              and profile picture from that provider. We store this to create and identify your account.
            </SubItem>
            <SubItem title="Saved content">
              When you save a tweet thread using the Chrome extension, we store the question text, 
              selected reply text, tags, and difficulty you chose. This is the core function of the product.
            </SubItem>
            <SubItem title="Usage data">
              We track basic usage like which questions you viewed and how many questions you saved. 
              This helps us improve the product. We do not track your browsing activity outside of Grilled.dev.
            </SubItem>
            <SubItem title="Answers and upvotes">
              If you write an answer on Grilled.dev or upvote content, we store that to calculate 
              your reputation score and power the leaderboard.
            </SubItem>
          </Section>

          <Section title="What we do NOT collect">
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.7 }}>
              {[
                'We do not collect your X/Twitter credentials or password',
                'We do not read your X timeline, DMs, or any content beyond the tweet page you have open',
                'We do not track your activity on X or any other website',
                'We do not collect payment card details — payments are handled by Razorpay',
                'We do not sell or share your personal data with third parties for advertising',
                'We do not use your data to train AI models',
              ].map(item => (
                <li key={item} style={{ display: 'flex', gap: 8, listStyle: 'none', marginLeft: -20 }}>
                  <span style={{ color: 'var(--success)', flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Chrome Extension">
            The Grilled.dev Chrome extension only activates on x.com and twitter.com tweet pages. 
            It reads tweet content only when you explicitly click the Save button. 
            It does not run in the background, does not monitor your browsing, 
            and does not collect any data passively. The extension stores your login 
            session locally in Chrome storage so you stay logged in between sessions.
          </Section>

          <Section title="How we use your data">
            <SubItem title="To provide the service">
              Your saved questions appear in your personal library. Your answers and upvotes 
              power the leaderboard and reputation system.
            </SubItem>
            <SubItem title="To improve the product">
              Aggregated usage data helps us understand which features are useful and which 
              questions are most popular.
            </SubItem>
            <SubItem title="To show relevant ads">
              Free users see ads served by Google AdSense. AdSense may use cookies to show 
              relevant ads. You can opt out of personalised ads at 
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--accent)', marginLeft: 4 }}>
                adssettings.google.com
              </a>.
            </SubItem>
          </Section>

          <Section title="Ads">
            Free users of Grilled.dev see advertisements served by Google AdSense. 
            Supporters who pay the annual subscription see no ads. 
            We do not allow advertisers to target users based on their saved questions or 
            any personal data we hold. Ad targeting is handled entirely by Google based on 
            their own policies.
          </Section>

          <Section title="Data sharing">
            We do not sell your personal data. We share data only in these limited cases:
            <ul style={{ paddingLeft: 20, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.7 }}>
              <li><strong style={{ color: 'var(--ink)' }}>Service providers</strong> — MongoDB Atlas stores our database. Vercel hosts the application. These providers have their own privacy policies.</li>
              <li><strong style={{ color: 'var(--ink)' }}>Authentication</strong> — GitHub and Google handle sign-in. We receive only your basic profile info from them.</li>
              <li><strong style={{ color: 'var(--ink)' }}>Legal requirements</strong> — If required by law we may disclose information to authorities.</li>
            </ul>
          </Section>

          <Section title="Public content">
            Questions you save appear on the public Grilled.dev feed visible to all users. 
            Answers you write on Grilled.dev are public. Your username and reputation score 
            appear on the public leaderboard. If you want your saved questions to be private, 
            do not use this service — all saved content is currently public by design.
          </Section>

          <Section title="Data retention">
            We keep your account data as long as your account exists. If you delete your account, 
            we delete your personal information within 30 days. Public questions you saved may 
            remain in the database as they are part of the shared community knowledge base, 
            but will no longer be associated with your account.
          </Section>

          <Section title="Your rights">
            You have the right to:
            <ul style={{ paddingLeft: 20, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.7 }}>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and personal data</li>
              <li>Export your saved questions</li>
            </ul>
            <p style={{ marginTop: 12, fontSize: 14, color: 'var(--ink-2)' }}>
              To exercise any of these rights, email us at{' '}
              <a href="mailto:privacy@grilled.dev" style={{ color: 'var(--accent)' }}>
                privacy@grilled.dev
              </a>
            </p>
          </Section>

          <Section title="Cookies">
            We use cookies for authentication (to keep you logged in) and for Google AdSense. 
            We do not use tracking cookies for analytics beyond what AdSense provides. 
            You can clear cookies at any time through your browser settings.
          </Section>

          <Section title="Children">
            Grilled.dev is not directed at children under 13. We do not knowingly collect 
            personal information from children under 13. If you believe a child has provided 
            us with personal information, please contact us and we will delete it.
          </Section>

          <Section title="Changes to this policy">
            We may update this privacy policy from time to time. We will notify users of 
            significant changes by updating the date at the top of this page. Continued use 
            of Grilled.dev after changes means you accept the updated policy.
          </Section>

          <Section title="Contact">
            If you have any questions about this privacy policy or how we handle your data:
            <div style={{
              marginTop: 14, padding: '14px 16px',
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', fontSize: 14, color: 'var(--ink-2)',
              lineHeight: 1.8,
            }}>
              <p>📧 <a href="mailto:rbagade911@gmail.com" style={{ color: 'var(--accent)' }}>privacy@grilled.dev</a></p>
              <p>🌐 <a href="https://grilled.dev" style={{ color: 'var(--accent)' }}>grilled.dev</a></p>
            </div>
          </Section>

        </div>
      </div>

      {/* Footer */}
      <footer style={{
        padding: '20px 40px', borderTop: '1px solid var(--border-subtle)',
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
          {[['Privacy', '/privacy'], ['Feed', '/feed'], ['Leaderboard', '/leaderboard']].map(([label, href]) => (
            <Link key={href} href={href} style={{ fontSize: 13, color: 'var(--ink-3)', textDecoration: 'none' }}>
              {label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ paddingBottom: 32, borderBottom: '1px solid var(--border-subtle)' }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, letterSpacing: '-0.02em' }}>
        {title}
      </h2>
      <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  )
}

function SubItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: 4, fontSize: 14 }}>{title}</p>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7 }}>{children}</p>
    </div>
  )
}
