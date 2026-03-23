'use client';

import { useEffect, useRef, useState } from 'react';

/* ────────────────────────────
   SVG Icons (inline)
   ──────────────────────────── */
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
  </svg>
);

const FilmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" /><line x1="17" y1="17" x2="22" y2="17" />
  </svg>
);

const ArrowDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ActivityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/* ────────────────────────────
   Video Placeholder Component
   ──────────────────────────── */
function VideoPlaceholder({ title, videoFile }) {
  return (
    <div className="video-placeholder" role="button" tabIndex={0} aria-label={`Play video: ${title}`}>
      <div className="video-play-btn"><PlayIcon /></div>
      <div className="video-label">
        <FilmIcon />
        <span>{videoFile}</span>
      </div>
    </div>
  );
}

/* ────────────────────────────
   Module Data
   ──────────────────────────── */
const modules = [
  {
    id: 'welcome',
    num: 'Module 1',
    title: 'Welcome & Keypoints',
    slide: '/slides/2.jpg',
    video: '1. Welcome & Keypoints.mp4',
    content: (
      <>
        <div className="content-card">
          <h3>Welcome to Your GLP-1 Journey</h3>
          <p>
            Whether you&rsquo;re just starting your GLP-1 journey with medications like semaglutide or tirzepatide,
            or you&rsquo;re already a few weeks in, this coaching program is designed to support you every step of the way.
          </p>
        </div>
        <div className="keypoints-grid" style={{ marginTop: '1.5rem' }}>
          <div className="keypoint-card">
            <div className="keypoint-icon"><HeartIcon /></div>
            <h4>Feel Better</h4>
            <p>Reduce discomfort and support healthy digestion as your body adjusts.</p>
          </div>
          <div className="keypoint-card">
            <div className="keypoint-icon"><ZapIcon /></div>
            <h4>Reclaim Energy</h4>
            <p>Manage fatigue and stay active throughout your journey.</p>
          </div>
          <div className="keypoint-card">
            <div className="keypoint-icon"><ShieldIcon /></div>
            <h4>Build Confidence</h4>
            <p>Learn what works for your body and trust the process.</p>
          </div>
          <div className="keypoint-card">
            <div className="keypoint-icon"><ActivityIcon /></div>
            <h4>Work with Your Medication</h4>
            <p>Understand how it affects appetite, digestion, and metabolism.</p>
          </div>
        </div>
        <div className="highlight-box">
          <h3>Key Points to Remember</h3>
          <p>
            Your experience may be different from others — that&rsquo;s normal. Side effects are usually temporary.
            Tracking your symptoms and wins helps your care team make informed adjustments.
            Small, consistent actions matter more than perfection.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'how-glp1-works',
    num: 'Module 2',
    title: 'What GLP-1 Medications Do in the Body',
    slide: '/slides/frame.jpg',
    video: '2. What GLP-1 Medications Do in the Body.mp4',
    content: (
      <>
        <div className="content-card">
          <h3>How GLP-1 Medications Work</h3>
          <p>
            GLP-1 medications like semaglutide and tirzepatide mimic a hormone your body naturally produces
            called glucagon-like peptide-1. Understanding how this works helps you see why these medications
            are so effective — and why your body may feel different as it adjusts.
          </p>
        </div>
        <div className="keypoints-grid" style={{ marginTop: '1.5rem' }}>
          <div className="keypoint-card">
            <h4>Slow Gastric Emptying</h4>
            <p>Food stays in your stomach longer, helping you feel fuller sooner and reducing overeating. This also helps regulate blood sugar.</p>
          </div>
          <div className="keypoint-card">
            <h4>Regulate Appetite</h4>
            <p>GLP-1 acts on your brain&rsquo;s appetite centers to signal fullness and reduce cravings — working with your body&rsquo;s natural systems.</p>
          </div>
          <div className="keypoint-card">
            <h4>Blood Sugar Control</h4>
            <p>Stimulates insulin release when blood sugar rises and reduces glucose released by the liver, supporting stable energy levels.</p>
          </div>
          <div className="keypoint-card">
            <h4>Adjustment Period</h4>
            <p>Nausea, appetite changes, and energy shifts are normal early on and usually improve as your body adapts over time.</p>
          </div>
        </div>
        <div className="highlight-box">
          <h3>Takeaway</h3>
          <p>
            GLP-1 medications are powerful tools for appetite control, digestion, and metabolic health.
            Understanding how they interact with your body helps you set realistic expectations and maximize benefits.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'side-effects',
    num: 'Module 3',
    title: 'Side Effects Are Normal — and Manageable',
    slide: '/slides/3.jpg',
    video: '3. Side Effects Are Normal — and Manageable.mp4',
    content: (
      <>
        <div className="content-card">
          <h3>Early Side Effects: What&rsquo;s Normal</h3>
          <p>
            When starting a GLP-1 medication or increasing your dose, it&rsquo;s completely normal to notice some
            side effects in the first few weeks. Your body is adjusting to a new way of processing food,
            regulating appetite, and managing blood sugar.
          </p>
        </div>
        <div className="content-card" style={{ marginTop: '1.5rem' }}>
          <h3>Common Early Side Effects</h3>
          <ul>
            <li>Nausea or upset stomach — feeling queasy, especially after meals</li>
            <li>Bloating or fullness — stomach may feel heavier or more distended</li>
            <li>Constipation or diarrhea — changes in gut motility and digestion</li>
            <li>Fatigue or low energy — your body is adapting to lower calorie intake and shifting metabolism</li>
          </ul>
        </div>
        <div className="highlight-box">
          <h3>Why This Happens</h3>
          <p>
            These symptoms are signs that your body is learning to work with the medication.
            They are generally temporary and can be managed effectively with the right strategies.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'program-support',
    num: 'Module 4',
    title: 'How This Program Supports You',
    slide: '/slides/4.jpg',
    video: '4. How This Program Supports You.mp4',
    content: (
      <>
        <div className="content-card">
          <h3>What You&rsquo;ll Receive</h3>
          <ul className="checklist">
            <li>
              <span className="check-icon"><CheckIcon /></span>
              <span><strong>Clear, expert-backed guidance</strong> — Learn how to manage side effects, understand your body&rsquo;s responses, and feel confident with each step.</span>
            </li>
            <li>
              <span className="check-icon"><CheckIcon /></span>
              <span><strong>Coaching prompts</strong> — Reflect, track your habits, and uncover patterns that help you build long-lasting healthy routines.</span>
            </li>
            <li>
              <span className="check-icon"><CheckIcon /></span>
              <span><strong>Nutrition, movement &amp; mindset strategies</strong> — Tailored specifically for GLP-1 users to support energy, digestion, and overall wellbeing.</span>
            </li>
            <li>
              <span className="check-icon"><CheckIcon /></span>
              <span><strong>Tools &amp; trackers</strong> — Access grocery lists, meal ideas, workouts, and more to keep your journey organized.</span>
            </li>
            <li>
              <span className="check-icon"><CheckIcon /></span>
              <span><strong>A supportive space</strong> — Build habits that stick, celebrate progress, and feel empowered every step of the way.</span>
            </li>
          </ul>
        </div>
        <div className="highlight-box">
          <h3>Progress, Not Perfection</h3>
          <p>
            You don&rsquo;t need to do everything at once — start where you are, move at your own pace,
            and trust that small, consistent steps lead to lasting results.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'daily-tracking',
    num: 'Module 5',
    title: 'Your First Step: Daily Tracking',
    slide: '/slides/5.jpg',
    video: '5. Your First Step Daily Tracking.mp4',
    content: (
      <>
        <div className="content-card">
          <h3>Start Building Awareness</h3>
          <p>
            Before diving into the next lesson, take a moment to tune in to your body.
            Awareness is the first step toward lasting results. Spend just 2–3 minutes checking in with yourself today.
          </p>
        </div>
        <div className="keypoints-grid" style={{ marginTop: '1.5rem' }}>
          <div className="keypoint-card">
            <div className="keypoint-icon"><ActivityIcon /></div>
            <h4>Symptoms</h4>
            <p>Nausea, fatigue, bloating, appetite changes, and more.</p>
          </div>
          <div className="keypoint-card">
            <div className="keypoint-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24, color: 'var(--rewaken-teal)' }}>
                <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
              </svg>
            </div>
            <h4>Water Intake</h4>
            <p>How much you drink throughout the day.</p>
          </div>
          <div className="keypoint-card">
            <div className="keypoint-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24, color: 'var(--rewaken-teal)' }}>
                <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
              </svg>
            </div>
            <h4>Meals &amp; Movement</h4>
            <p>What you eat, when you eat, and your daily activity.</p>
          </div>
          <div className="keypoint-card">
            <div className="keypoint-icon"><StarIcon /></div>
            <h4>Wins</h4>
            <p>Celebrate small or big victories — even noticing progress counts!</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'final-thought',
    num: 'Module 6',
    title: 'Final Thought',
    slide: '/slides/6.jpg',
    video: '6. Final Thought.mp4',
    content: (
      <div className="highlight-box" style={{ marginTop: 0 }}>
        <h3>You&rsquo;ve Already Taken a Powerful First Step</h3>
        <p>
          Remember: this medication is a tool — you are the one doing the work.
          You don&rsquo;t have to navigate this journey alone. By being here, tracking, and paying attention to your body,
          you&rsquo;ve already taken a powerful first step — and that&rsquo;s something to celebrate.
          Every small action adds up. Keep going, stay curious, and trust the process.
        </p>
      </div>
    ),
  },
];

/* ────────────────────────────
   Main Page Component
   ──────────────────────────── */
export default function Home() {
  const [activeModule, setActiveModule] = useState(0);
  const sectionRefs = useRef([]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Track active module on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target);
            if (idx !== -1) setActiveModule(idx);
          }
        });
      },
      { threshold: 0.3 }
    );
    sectionRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollToModule = (idx) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <img src="/slides/1.jpg" alt="Rewaken" className="hero-logo" />
        <h1>GLP-1 <em>Coaching</em></h1>
        <p className="hero-sub">
          Your guided program for navigating GLP-1 medications with confidence — empowered, informed, and supported every step of the way.
        </p>

        {/* Overview video placeholder */}
        <div style={{ width: '100%', maxWidth: 640, position: 'relative', zIndex: 2, marginBottom: '1rem' }}>
          <VideoPlaceholder title="GLP-1 Coaching Overview" videoFile="0. GLP-1 Coaching.mp4" />
        </div>

        <a href="#welcome" className="hero-cta" onClick={(e) => { e.preventDefault(); scrollToModule(0); }}>
          Begin Your Journey <ArrowDown />
        </a>
      </section>

      {/* ── Progress Nav ── */}
      <nav className="progress-nav">
        <div className="progress-track">
          {modules.map((mod, i) => (
            <div
              key={mod.id}
              className={`progress-step ${i === activeModule ? 'active' : ''} ${i < activeModule ? 'completed' : ''}`}
              onClick={() => scrollToModule(i)}
            >
              <div className="progress-dot" />
              <span className="progress-label">{mod.num}</span>
              {i < modules.length - 1 && (
                <div className="progress-line">
                  <div className="progress-line-fill" />
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* ── Modules ── */}
      {modules.map((mod, i) => (
        <section
          key={mod.id}
          id={mod.id}
          className="module-section"
          ref={(el) => { sectionRefs.current[i] = el; }}
        >
          <div className="module-inner">
            <div className="module-header reveal">
              <span className="module-number">{mod.num}</span>
              <h2 className="module-title">{mod.title}</h2>
            </div>

            <div className="reveal">
              <div className="slide-image-wrap">
                <img src={mod.slide} alt={mod.title} loading="lazy" />
              </div>
            </div>

            <div className="reveal">
              <VideoPlaceholder title={mod.title} videoFile={mod.video} />
            </div>

            <div className="content-area reveal">
              {mod.content}
            </div>
          </div>
        </section>
      ))}

      {/* ── Footer ── */}
      <footer className="site-footer">
        <img src="/slides/1.jpg" alt="Rewaken" className="footer-logo" />
        <p>&copy; {new Date().getFullYear()} Rewaken. All rights reserved.</p>
      </footer>
    </>
  );
}
