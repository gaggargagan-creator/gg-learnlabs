import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GG LearnLabs",
  description:
    "Practical tools and resources for Learning & Development professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Shared Top Navigation */}
        <header className="site-header">
          <div className="site-header-inner">
            {/* Logo and Brand */}
            <a
              href="/gg-learnlabs/"
              className="site-brand"
              aria-label="Go to GG LearnLabs Home"
            >
              <div className="brand-mark">
                <span>GG</span>
              </div>

              <div className="brand-copy">
                <span className="brand-name">GG LearnLabs</span>
                <span className="brand-tagline">
                  Learn. Measure. Improve.
                </span>
              </div>
            </a>

            {/* Quick Navigation */}
            <nav className="quick-navigation" aria-label="Main navigation">
              <a
                href="/gg-learnlabs/"
                className="quick-nav-link"
              >
                Home
              </a>

              <a
                href="/gg-learnlabs/calculator/"
                className="quick-nav-link quick-nav-primary"
              >
                Effectiveness Calculator
              </a>

              <a
                href="/gg-learnlabs/#tools"
                className="quick-nav-link"
              >
                Tools
              </a>

              <a
                href="/gg-learnlabs/#resources"
                className="quick-nav-link"
              >
                Resources
              </a>
            </nav>
          </div>

          {/* Shared Hero Strip */}
          <div className="shared-hero">
            <div className="shared-hero-content">
              <span className="shared-hero-label">
                GG LEARNLABS
              </span>

              <div>
                <h2>
                  Practical tools for
                  <span> better learning outcomes.</span>
                </h2>

                <p>
                  Explore practical Learning & Development tools designed to
                  measure effectiveness, support better decisions and drive
                  continuous improvement.
                </p>
              </div>
            </div>

            <div className="shared-hero-shortcuts">
              <a
                href="/gg-learnlabs/calculator/"
                className="hero-shortcut"
              >
                <span className="shortcut-icon">01</span>

                <div>
                  <strong>Calculate</strong>
                  <span>Measure training effectiveness</span>
                </div>

                <span className="shortcut-arrow">→</span>
              </a>

              <a
                href="/gg-learnlabs/#tools"
                className="hero-shortcut"
              >
                <span className="shortcut-icon">02</span>

                <div>
                  <strong>Explore Tools</strong>
                  <span>Discover L&amp;D resources</span>
                </div>

                <span className="shortcut-arrow">→</span>
              </a>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
