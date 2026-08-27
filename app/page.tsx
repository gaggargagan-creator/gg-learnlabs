export default function Home() {
  return (
    <main className="home-page">
      {/* Background decoration */}
      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />

      {/* Navigation */}
      <nav className="navbar">
        <a href="./" className="logo">
          <span className="logo-mark">GG</span>
          <span>LearnLabs</span>
        </a>

        <div className="nav-links">
          <a href="#tools">Tools</a>
          <a href="#why">Why GG LearnLabs</a>
          <a href="#resources">Resources</a>
        </div>

        <a href="#tools" className="nav-button">
          Explore Tools
          <span>→</span>
        </a>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">
          <span className="badge-dot" />
          Built for Learning & Development Professionals
        </div>

        <h1>
          Build better learning.
          <span>Measure real impact.</span>
        </h1>

        <p className="hero-description">
          Practical tools, calculators and frameworks designed to help
          Learning & Development professionals create meaningful learning
          experiences and measure what truly matters.
        </p>

        <div className="hero-buttons">
          <a href="#tools" className="primary-button">
            Explore Tools
            <span>→</span>
          </a>

          <a href="#why" className="secondary-button">
            Discover GG LearnLabs
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div>
            <strong>01</strong>
            <span>Learning Platform</span>
          </div>

          <div>
            <strong>360°</strong>
            <span>Learning Perspective</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>Possibilities to Explore</span>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section id="why" className="section intro-section">
        <div className="section-label">
          <span />
          WHY GG LEARNLABS
        </div>

        <div className="intro-grid">
          <div>
            <h2>
              L&D should not just
              <br />
              <span>deliver learning.</span>
            </h2>
          </div>

          <div className="intro-content">
            <p>
              GG LearnLabs is a growing space for Learning & Development
              professionals who want to move beyond attendance, completion
              rates and generic feedback scores.
            </p>

            <p>
              Our focus is simple — create practical ways to design better
              learning, identify capability gaps and measure the real impact
              of training.
            </p>

            <div className="feature-list">
              <div>
                <span className="feature-number">01</span>
                <div>
                  <h4>Practical Tools</h4>
                  <p>Simple tools designed for real L&D challenges.</p>
                </div>
              </div>

              <div>
                <span className="feature-number">02</span>
                <div>
                  <h4>Meaningful Measurement</h4>
                  <p>Move beyond basic feedback and measure impact.</p>
                </div>
              </div>

              <div>
                <span className="feature-number">03</span>
                <div>
                  <h4>Built to Grow</h4>
                  <p>A growing collection of resources and frameworks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="section tools-section">
        <div className="tools-header">
          <div>
            <div className="section-label">
              <span />
              EXPLORE THE LAB
            </div>

            <h2>
              Tools built for
              <span> better decisions.</span>
            </h2>
          </div>

          <p>
            Explore practical L&D tools designed to help you understand,
            measure and improve learning effectiveness.
          </p>
        </div>

        <div className="tools-grid">
          {/* Tool 1 */}
          <div className="tool-card featured-tool">
            <div className="tool-top">
              <div className="tool-icon">↗</div>
              <span className="tool-status active">AVAILABLE NOW</span>
            </div>

            <div className="tool-number">01</div>

            <h3>Training Effectiveness Calculator</h3>

            <p>
              Get a complete view of training effectiveness by combining
              trainer performance, participant feedback, knowledge,
              learning application and completion metrics.
            </p>

            <a href="./calculator/" className="tool-button">
              Open Calculator
              <span>→</span>
            </a>
          </div>

          {/* Tool 2 */}
          <div className="tool-card">
            <div className="tool-top">
              <div className="tool-icon muted">◌</div>
              <span className="tool-status">COMING SOON</span>
            </div>

            <div className="tool-number">02</div>

            <h3>Training Needs Analysis</h3>

            <p>
              Identify capability gaps and convert business challenges into
              meaningful learning interventions.
            </p>

            <div className="coming-soon">In development</div>
          </div>

          {/* Tool 3 */}
          <div className="tool-card">
            <div className="tool-top">
              <div className="tool-icon muted">◈</div>
              <span className="tool-status">COMING SOON</span>
            </div>

            <div className="tool-number">03</div>

            <h3>Learning ROI Calculator</h3>

            <p>
              Understand the business value and return generated by your
              learning and development initiatives.
            </p>

            <div className="coming-soon">In development</div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="section resources-section">
        <div className="resources-box">
          <div className="resources-content">
            <div className="section-label">
              <span />
              GROWING WITH YOU
            </div>

            <h2>
              One lab.
              <br />
              <span>Many possibilities.</span>
            </h2>

            <p>
              GG LearnLabs will continue to grow with practical calculators,
              frameworks, templates and resources designed for trainers,
              managers and Learning & Development teams.
            </p>
          </div>

          <div className="resource-orbit">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />

            <div className="orbit-center">
              <span>GG</span>
              <small>LEARNLABS</small>
            </div>

            <div className="orbit-point point-one">+</div>
            <div className="orbit-point point-two">+</div>
            <div className="orbit-point point-three">+</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-glow" />

        <div className="section-label center-label">
          <span />
          START EXPLORING
          <span />
        </div>

        <h2>
          Ready to look beyond
          <span> completion rates?</span>
        </h2>

        <p>
          Start by exploring the Training Effectiveness Calculator and get a
          clearer picture of what is working and where learning needs more
          attention.
        </p>

        <a href="./calculator/" className="primary-button large-button">
          Open Training Effectiveness Calculator
          <span>→</span>
        </a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <span className="logo-mark">GG</span>
          <span>LearnLabs</span>
        </div>

        <p>
          Built for people who build people.
        </p>

        <p className="copyright">
          © 2026 GG LearnLabs
        </p>
      </footer>
    </main>
  );
}
