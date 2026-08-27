"use client";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="site-header">
        <div className="site-header-inner">
          <a href="/gg-learnlabs/" className="site-brand" aria-label="GG LearnLabs Home">
            <div className="brand-mark"><span>GG</span></div>
            <div className="brand-copy">
              <span className="brand-name">GG LearnLabs</span>
              <span className="brand-tagline">Learn. Measure. Improve.</span>
            </div>
          </a>
          <nav className="quick-navigation" aria-label="Primary navigation">
            <a href="/gg-learnlabs/" className="quick-nav-link quick-nav-primary">Home</a>
            <a href="/gg-learnlabs/calculator/" className="quick-nav-link">Effectiveness Calculator</a>
            <a href="#tools" className="quick-nav-link">Tools</a>
            <a href="#resources" className="quick-nav-link">Resources</a>
          </nav>
        </div>
      </header>

      <section className="shared-hero">
        <div className="shared-hero-content">
          <span className="shared-hero-label">PRACTICAL LEARNING &amp; DEVELOPMENT TOOLS</span>
          <div>
            <h1>Practical tools for <span>better learning outcomes.</span></h1>
            <p>
              Explore practical Learning &amp; Development tools designed to measure
              effectiveness, support better decisions and drive continuous improvement.
            </p>
          </div>
          <div className="hero-actions">
            <a href="/gg-learnlabs/calculator/" className="hero-primary-button">
              Open Effectiveness Calculator <span>→</span>
            </a>
            <a href="#tools" className="hero-secondary-button">Explore Tools</a>
          </div>
        </div>

        <div className="shared-hero-shortcuts">
          <a href="/gg-learnlabs/calculator/" className="hero-shortcut">
            <span className="shortcut-icon">01</span>
            <div>
              <strong>Calculate</strong>
              <span>Measure training effectiveness</span>
            </div>
            <span className="shortcut-arrow">→</span>
          </a>
          <a href="#tools" className="hero-shortcut">
            <span className="shortcut-icon">02</span>
            <div>
              <strong>Explore Tools</strong>
              <span>Discover practical L&amp;D resources</span>
            </div>
            <span className="shortcut-arrow">→</span>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">About GG LearnLabs</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">Turning learning data into meaningful insights.</h2>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            GG LearnLabs is a growing collection of practical tools created to support Learning &amp;
            Development professionals in evaluating training impact, identifying improvement areas and
            making more informed decisions.
          </p>
        </div>
      </section>

      <section id="tools" className="border-y border-white/10 bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">Learning Tools</p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Explore GG LearnLabs</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-400">
              Start with our Training Effectiveness Calculator to measure overall training performance
              across multiple learning metrics.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <a href="/gg-learnlabs/calculator/" className="tool-card group">
              <div className="tool-icon">📊</div>
              <h3>Training Effectiveness Calculator</h3>
              <p>
                Measure training effectiveness using trainer observation, participant feedback,
                knowledge assessment, learning application and attendance.
              </p>
              <span className="tool-link">Open Calculator <b>→</b></span>
            </a>

            <div className="tool-card">
              <div className="tool-icon">🚀</div>
              <h3>More Learning Tools Coming Soon</h3>
              <p>
                GG LearnLabs will continue to grow with practical tools, calculators and resources
                to support Learning &amp; Development professionals.
              </p>
              <span className="coming-soon">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">How It Works</p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Simple. Practical. Insightful.</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            ["1", "Enter Training Details", "Add the training information, trainer details, department and participant count."],
            ["2", "Add Effectiveness Scores", "Enter scores for key training effectiveness parameters."],
            ["3", "Get Actionable Insights", "Review the overall effectiveness score, performance breakdown and improvement opportunities."],
          ].map(([number, title, text]) => (
            <div key={number} className="how-card">
              <span className="how-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="resources" className="border-t border-white/10 bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center md:px-10 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">Get Started</p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">Ready to measure your training effectiveness?</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
            Turn your training data into a structured effectiveness assessment with actionable insights.
          </p>
          <a href="/gg-learnlabs/calculator/" className="mt-8 inline-flex rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-500">
            Open Calculator →
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-500 md:px-10">
          © {new Date().getFullYear()} GG LearnLabs. Practical tools for Learning &amp; Development.
        </div>
      </footer>
    </main>
  );
}
