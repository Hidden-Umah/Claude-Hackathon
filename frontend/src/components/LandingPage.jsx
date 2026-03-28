const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    sub: 'forever',
    description: 'Perfect for curious learners exploring new concepts.',
    highlight: false,
    cta: 'Get started free',
    features: ['5 explanations / month', 'Web Speech narration', 'Whiteboard animations', 'Transcript view', 'Session history (last 5)'],
  },
  {
    name: 'Pro',
    price: '$12',
    sub: '/ month',
    description: 'For students and professionals who learn every day.',
    highlight: true,
    badge: 'Most popular',
    cta: 'Start free trial',
    features: ['Unlimited explanations', 'Premium ElevenLabs voice', 'Unlimited history', 'Priority generation', 'Early feature access'],
  },
  {
    name: 'Team',
    price: '$49',
    sub: '/ month',
    description: 'For teams who want to learn and teach together.',
    highlight: false,
    cta: 'Contact us',
    features: ['Everything in Pro', 'Up to 10 members', 'Shared team history', 'Custom AI voice', 'REST API access'],
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Type any concept',
    description: 'Enter anything — "How does DNS work?", "Explain machine learning", "What is an API?" — in plain English.',
  },
  {
    number: '02',
    title: 'AI builds the scenes',
    description: 'Claude breaks your concept into clear, structured scenes with a script and whiteboard drawing plan.',
  },
  {
    number: '03',
    title: 'Watch & listen',
    description: 'A whiteboard animation draws itself in real time while a voice narrates each scene, just like a great teacher.',
  },
];

const FEATURES = [
  {
    icon: '🎨',
    title: 'Whiteboard animations',
    description: 'Every concept is visualised with hand-drawn style animations — stick figures, arrows, boxes, and more.',
  },
  {
    icon: '🔊',
    title: 'Voice narration',
    description: 'A natural voice narrates each scene so you can sit back and absorb the explanation.',
  },
  {
    icon: '📄',
    title: 'Full transcript',
    description: 'Every word of the explanation is shown as a scrollable transcript below the video.',
  },
  {
    icon: '🕘',
    title: 'Session history',
    description: 'Every explanation you generate is saved locally so you can revisit any concept instantly.',
  },
];

const EXAMPLES = ['How does DNS work?', 'Explain machine learning', 'What is an API?', 'How does TCP/IP work?', 'Explain blockchain'];

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="7.5" cy="7.5" r="7.5" fill="rgba(99,102,241,0.15)" />
    <path d="M4 7.5l2.5 2.5 4.5-4.5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="landing">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="landing-hero">
        <div className="hero-tag">Powered by Claude AI</div>
        <h1 className="hero-headline">
          Learn anything.<br />
          <span className="hero-gradient">In minutes.</span>
        </h1>
        <p className="hero-sub">
          Type any concept. ConceptFlow turns it into a narrated whiteboard
          explainer video — instantly, with no setup required.
        </p>
        <div className="hero-actions">
          <button className="hero-cta" onClick={onGetStarted}>
            Start learning for free →
          </button>
          <button className="hero-cta-ghost" onClick={onGetStarted}>
            See an example
          </button>
        </div>

        {/* Mock video preview */}
        <div className="hero-preview">
          <div className="preview-bar">
            <span className="preview-dot red" />
            <span className="preview-dot yellow" />
            <span className="preview-dot green" />
            <span className="preview-title">ConceptFlow — What is an API?</span>
          </div>
          <div className="preview-canvas">
            <svg viewBox="0 0 680 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Stick figure - client */}
              <circle cx="110" cy="85" r="18" stroke="#1e293b" strokeWidth="2.5" />
              <line x1="110" y1="103" x2="110" y2="155" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="110" y1="120" x2="82" y2="138" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="110" y1="120" x2="138" y2="138" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="110" y1="155" x2="88" y2="190" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="110" y1="155" x2="132" y2="190" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              <text x="110" y="212" textAnchor="middle" fill="#4f46e5" fontFamily="Caveat" fontSize="15" fontWeight="600">Client App</text>

              {/* Arrow right - request */}
              <line x1="165" y1="128" x2="268" y2="128" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              <polyline points="258,120 268,128 258,136" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <text x="216" y="118" textAnchor="middle" fill="#4f46e5" fontFamily="Caveat" fontSize="13">Request</text>

              {/* API box */}
              <rect x="275" y="98" width="120" height="60" rx="6" stroke="#1e293b" strokeWidth="2.5" />
              <text x="335" y="134" textAnchor="middle" fill="#4f46e5" fontFamily="Caveat" fontSize="18" fontWeight="700">API</text>

              {/* Arrow right - to server */}
              <line x1="396" y1="128" x2="498" y2="128" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              <polyline points="488,120 498,128 488,136" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* Database - server */}
              <ellipse cx="556" cy="100" rx="42" ry="13" stroke="#1e293b" strokeWidth="2.5" />
              <line x1="514" y1="100" x2="514" y2="155" stroke="#1e293b" strokeWidth="2.5" />
              <line x1="598" y1="100" x2="598" y2="155" stroke="#1e293b" strokeWidth="2.5" />
              <ellipse cx="556" cy="155" rx="42" ry="13" stroke="#1e293b" strokeWidth="2.5" />
              <text x="556" y="184" textAnchor="middle" fill="#4f46e5" fontFamily="Caveat" fontSize="15" fontWeight="600">Server</text>

              {/* Return arrow */}
              <line x1="395" y1="148" x2="165" y2="148" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 4" />
              <polyline points="175,140 165,148 175,156" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <text x="280" y="168" textAnchor="middle" fill="#94a3b8" fontFamily="Caveat" fontSize="13">Response</text>
            </svg>
            <div className="preview-scene-badge">Scene 1: The Restaurant Analogy</div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="landing-section">
        <h2 className="section-title">How it works</h2>
        <div className="steps-grid">
          {STEPS.map((step) => (
            <div key={step.number} className="step-card">
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="landing-section">
        <h2 className="section-title">Everything you need to understand anything</h2>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Example concepts ─────────────────────────────────────────────── */}
      <section className="landing-section landing-examples">
        <h2 className="section-title">Try it on any concept</h2>
        <div className="example-pills">
          {EXAMPLES.map((ex) => (
            <button key={ex} className="example-pill" onClick={onGetStarted}>{ex}</button>
          ))}
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section className="landing-section" id="pricing">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-sub">Start free. Upgrade when you need more.</p>
        <div className="landing-pricing-grid">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`landing-plan-card ${plan.highlight ? 'highlighted' : ''}`}>
              {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
              <div className="landing-plan-header">
                <h3>{plan.name}</h3>
                <div className="pricing-price">
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-sub">{plan.sub}</span>
                </div>
                <p className="pricing-description">{plan.description}</p>
              </div>
              <button
                className={`pricing-cta ${plan.highlight ? 'cta-primary' : 'cta-secondary'}`}
                onClick={onGetStarted}
              >
                {plan.cta}
              </button>
              <div className="landing-plan-features">
                {plan.features.map((f) => (
                  <div key={f} className="landing-plan-feature">
                    <Check />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="landing-cta-section">
        <h2>Ready to learn something new?</h2>
        <p>Free to start. No credit card required.</p>
        <button className="hero-cta" onClick={onGetStarted}>
          Get started for free →
        </button>
      </section>

    </div>
  );
}
