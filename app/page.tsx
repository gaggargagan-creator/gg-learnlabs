"use client";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300">
              Practical Learning & Development Tools
            </div>

            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              GG <span className="text-blue-400">LearnLabs</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Practical tools and resources designed to help Learning &
              Development professionals measure, improve and strengthen
              training effectiveness.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/gg-learnlabs/calculator/"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500"
              >
                Open Training Effectiveness Calculator →
              </a>

              <a
                href="#tools"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-4 font-semibold text-slate-200 transition hover:bg-white/5"
              >
                Explore Tools
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            About GG LearnLabs
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Turning learning data into meaningful insights.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            GG LearnLabs is a growing collection of practical tools created to
            support Learning & Development professionals in evaluating training
            impact, identifying improvement areas and making more informed
            decisions.
          </p>
        </div>
      </section>

      {/* Tools Section */}
      <section
        id="tools"
        className="border-y border-white/10 bg-slate-900/50"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Learning Tools
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Explore GG LearnLabs
            </h2>

            <p className="mt-4 max-w-2xl text-slate-400">
              Start with our Training Effectiveness Calculator to measure
              overall training performance across multiple learning metrics.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Calculator Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 transition hover:border-blue-400/50 hover:bg-slate-800">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                📊
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Training Effectiveness Calculator
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                Measure training effectiveness using trainer observation,
                participant feedback, knowledge assessment, learning
                application and attendance.
              </p>

              <a
                href="/gg-learnlabs/calculator/"
                className="mt-8 inline-flex items-center text-sm font-semibold text-blue-400 transition hover:text-blue-300"
              >
                Open Calculator →
              </a>
            </div>

            {/* Coming Soon Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
                🚀
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                More Learning Tools Coming Soon
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                GG LearnLabs will continue to grow with practical tools,
                calculators and resources to support Learning & Development
                professionals.
              </p>

              <div className="mt-8 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-slate-400">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            How It Works
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Simple. Practical. Insightful.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
              1
            </div>

            <h3 className="mt-5 text-xl font-semibold">
              Enter Training Details
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Add the training information, trainer details, department and
              participant count.
            </p>
          </div>

          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
              2
            </div>

            <h3 className="mt-5 text-xl font-semibold">
              Add Effectiveness Scores
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Enter scores for key training effectiveness parameters.
            </p>
          </div>

          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
              3
            </div>

            <h3 className="mt-5 text-xl font-semibold">
              Get Actionable Insights
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Review the overall effectiveness score, performance breakdown and
              improvement opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center md:px-10">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to measure your training effectiveness?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Start using the Training Effectiveness Calculator and turn your
            training data into meaningful insights.
          </p>

          <a
            href="/gg-learnlabs/calculator/"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-500"
          >
            Open Calculator →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-500 md:px-10">
          © {new Date().getFullYear()} GG LearnLabs. Practical tools for
          Learning & Development.
        </div>
      </footer>
    </main>
  );
}
