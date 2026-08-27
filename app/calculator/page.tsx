"use client";

import { useState } from "react";

export default function TrainingEffectivenessCalculator() {
  const [trainerObservation, setTrainerObservation] = useState(80);
  const [participantFeedback, setParticipantFeedback] = useState(80);
  const [knowledgeAssessment, setKnowledgeAssessment] = useState(80);
  const [learningApplication, setLearningApplication] = useState(80);
  const [attendanceCompletion, setAttendanceCompletion] = useState(80);

  const categories = [
    {
      label: "Trainer Observation",
      description:
        "Evaluate how effectively the trainer delivered the session.",
      score: trainerObservation,
      setScore: setTrainerObservation,
      weight: 20,
    },
    {
      label: "Participant Feedback",
      description:
        "Measure how participants perceived the training experience.",
      score: participantFeedback,
      setScore: setParticipantFeedback,
      weight: 20,
    },
    {
      label: "Knowledge Assessment",
      description:
        "Measure knowledge gained through assessments or evaluations.",
      score: knowledgeAssessment,
      setScore: setKnowledgeAssessment,
      weight: 20,
    },
    {
      label: "Learning Application",
      description:
        "Measure how effectively participants apply learning on the job.",
      score: learningApplication,
      setScore: setLearningApplication,
      weight: 30,
    },
    {
      label: "Attendance / Completion",
      description:
        "Measure attendance and successful completion of the program.",
      score: attendanceCompletion,
      setScore: setAttendanceCompletion,
      weight: 10,
    },
  ];

  const overallScore =
    trainerObservation * 0.2 +
    participantFeedback * 0.2 +
    knowledgeAssessment * 0.2 +
    learningApplication * 0.3 +
    attendanceCompletion * 0.1;

  const roundedScore = Math.round(overallScore);

  const getEffectiveness = () => {
    if (roundedScore >= 90) {
      return {
        level: "Excellent",
        description:
          "The training is performing extremely well across the measured indicators.",
      };
    }

    if (roundedScore >= 75) {
      return {
        level: "Effective",
        description:
          "The training is delivering strong results with some opportunities for improvement.",
      };
    }

    if (roundedScore >= 60) {
      return {
        level: "Moderately Effective",
        description:
          "The training is showing positive results, but certain areas need attention.",
      };
    }

    if (roundedScore >= 40) {
      return {
        level: "Needs Improvement",
        description:
          "The training requires focused improvement in one or more key areas.",
      };
    }

    return {
      level: "Critical Attention Needed",
      description:
        "The training requires significant review and intervention.",
    };
  };

  const effectiveness = getEffectiveness();

  const highestCategory = categories.reduce((highest, category) =>
    category.score > highest.score ? category : highest
  );

  const lowestCategory = categories.reduce((lowest, category) =>
    category.score < lowest.score ? category : lowest
  );

  const resetCalculator = () => {
    setTrainerObservation(80);
    setParticipantFeedback(80);
    setKnowledgeAssessment(80);
    setLearningApplication(80);
    setAttendanceCompletion(80);
  };

  const updateScore = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    let score = Number(value);

    if (Number.isNaN(score)) {
      score = 0;
    }

    score = Math.max(0, Math.min(100, score));

    setter(score);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="../"
            className="text-xl font-bold tracking-tight transition hover:text-blue-400"
          >
            GG <span className="text-blue-400">LearnLabs</span>
          </a>

          <a
            href="../"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-400/50 hover:bg-white/5 hover:text-white"
          >
            ← Back to GG LearnLabs
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Training Effectiveness Tool
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Training Effectiveness
            <span className="block text-blue-400">Calculator</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Measure the overall effectiveness of a training program using a
            combination of trainer performance, participant feedback, knowledge
            assessment, learning application and attendance or completion.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Inputs */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold">
                Enter your training scores
              </h2>

              <p className="mt-2 text-slate-400">
                Rate each category from 0 to 100.
              </p>
            </div>

            <div className="space-y-5">
              {categories.map((category) => (
                <div
                  key={category.label}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-blue-400/30"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">
                          {category.label}
                        </h3>

                        <span className="rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-300">
                          Weight: {category.weight}%
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {category.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={category.score}
                        onChange={(event) =>
                          updateScore(
                            event.target.value,
                            category.setScore
                          )
                        }
                        className="w-20 rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-center font-semibold outline-none transition focus:border-blue-400"
                      />

                      <span className="text-sm text-slate-500">
                        / 100
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={category.score}
                      onChange={(event) =>
                        updateScore(
                          event.target.value,
                          category.setScore
                        )
                      }
                      className="w-full accent-blue-500"
                    />

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>0</span>
                      <span className="font-medium text-blue-400">
                        Current Score: {category.score}%
                      </span>
                      <span>100</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={resetCalculator}
                className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Reset Calculator
              </button>

              <button
                onClick={() => window.print()}
                className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold transition hover:bg-blue-400"
              >
                Print Results
              </button>
            </div>
          </div>

          {/* Results */}
          <aside className="lg:sticky lg:top-8 lg:h-fit">
            <div className="overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-slate-900 to-slate-950 p-7">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Overall Result
              </p>

              {/* Score Circle */}
              <div className="mx-auto mt-8 flex h-52 w-52 items-center justify-center rounded-full border-[12px] border-blue-500/30 bg-slate-950 shadow-[0_0_80px_rgba(59,130,246,0.15)]">
                <div className="text-center">
                  <div className="text-6xl font-bold">
                    {roundedScore}
                    <span className="text-3xl text-blue-400">%</span>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Effectiveness Score
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-300">
                  {effectiveness.level}
                </span>

                <p className="mt-5 text-sm leading-7 text-slate-400">
                  {effectiveness.description}
                </p>
              </div>
            </div>

            {/* Insights */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Key Insights
              </p>

              <div className="mt-6 space-y-5">
                <div className="rounded-xl border border-white/5 bg-slate-950/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-400">
                    Strongest Area
                  </p>

                  <h3 className="mt-2 font-semibold">
                    {highestCategory.label}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    This is currently your strongest contributor with a score
                    of {highestCategory.score}%.
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-slate-950/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                    Priority Improvement Area
                  </p>

                  <h3 className="mt-2 font-semibold">
                    {lowestCategory.label}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    This area has the lowest score at {lowestCategory.score}%
                    and may require additional attention or intervention.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Breakdown */}
        <section className="mt-16 border-t border-white/10 pt-12">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Detailed Breakdown
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              How each category contributes
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => {
              const contribution =
                (category.score * category.weight) / 100;

              return (
                <div
                  key={category.label}
                  className="rounded-2xl border border-white/10 bg-slate-900/50 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold">
                      {category.label}
                    </h3>

                    <span className="text-sm font-bold text-blue-400">
                      {category.score}%
                    </span>
                  </div>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${category.score}%` }}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-slate-500">
                        Weight
                      </p>

                      <p className="mt-1 font-semibold">
                        {category.weight}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Contribution
                      </p>

                      <p className="mt-1 font-semibold text-blue-400">
                        {contribution.toFixed(1)} points
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        © 2026 GG LearnLabs · Learning • Measurement • Impact
      </footer>
    </main>
  );
}
