"use client";

import { useState, type Dispatch, type SetStateAction } from "react";

type Metric = {
  name: string;
  score: number;
  weight: number;
};

type TextField = [
  string,
  string,
  Dispatch<SetStateAction<string>>,
  string,
  string
];

type ScoreField = [
  string,
  string,
  Dispatch<SetStateAction<string>>
];

export default function Calculator() {
  // Training Details
  const [programName, setProgramName] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [trainingDate, setTrainingDate] = useState("");
  const [department, setDepartment] = useState("");
  const [participants, setParticipants] = useState("");

  // Effectiveness Scores
  const [trainerObservation, setTrainerObservation] = useState("");
  const [participantFeedback, setParticipantFeedback] = useState("");
  const [knowledgeAssessment, setKnowledgeAssessment] = useState("");
  const [learningApplication, setLearningApplication] = useState("");
  const [attendanceCompletion, setAttendanceCompletion] = useState("");

  const [showResults, setShowResults] = useState(false);

  const trainerScore = Number(trainerObservation) || 0;
  const feedbackScore = Number(participantFeedback) || 0;
  const knowledgeScore = Number(knowledgeAssessment) || 0;
  const applicationScore = Number(learningApplication) || 0;
  const attendanceScore = Number(attendanceCompletion) || 0;

  const metrics: Metric[] = [
    {
      name: "Trainer Observation",
      score: trainerScore,
      weight: 35,
    },
    {
      name: "Participant Feedback",
      score: feedbackScore,
      weight: 20,
    },
    {
      name: "Knowledge Assessment",
      score: knowledgeScore,
      weight: 15,
    },
    {
      name: "Learning Application",
      score: applicationScore,
      weight: 20,
    },
    {
      name: "Attendance / Completion",
      score: attendanceScore,
      weight: 10,
    },
  ];

  const overallScore =
    trainerScore * 0.35 +
    feedbackScore * 0.2 +
    knowledgeScore * 0.15 +
    applicationScore * 0.2 +
    attendanceScore * 0.1;

  const getStatus = (score: number) => {
    if (score >= 90) return "Strong";
    if (score >= 85) return "Good";
    if (score >= 75) return "Needs Focus";
    return "Critical";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-emerald-500";
    if (score >= 85) return "bg-blue-500";
    if (score >= 75) return "bg-amber-500";
    return "bg-red-500";
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 85) return "text-blue-400";
    if (score >= 75) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) {
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
    }

    if (score >= 85) {
      return "border-blue-500/30 bg-blue-500/10 text-blue-400";
    }

    if (score >= 75) {
      return "border-amber-500/30 bg-amber-500/10 text-amber-400";
    }

    return "border-red-500/30 bg-red-500/10 text-red-400";
  };

  const hasMetricBelow75 = metrics.some(
    (metric) => metric.score < 75
  );

  const getRating = () => {
    if (
      overallScore < 85 ||
      trainerScore < 80 ||
      applicationScore < 70
    ) {
      return "Needs Improvement";
    }

    if (overallScore >= 90 && !hasMetricBelow75) {
      return "Effective";
    }

    return "Satisfactory";
  };

  const rating = getRating();

  const strongestMetric = metrics.reduce((highest, metric) =>
    metric.score > highest.score ? metric : highest
  );

  const weakestMetric = metrics.reduce((lowest, metric) =>
    metric.score < lowest.score ? metric : lowest
  );

  const improvementAreas = metrics.filter(
    (metric) => metric.score < 85
  );

  const getRecommendation = () => {
    if (trainerScore < 80) {
      return "Trainer Observation is below the required threshold. Focus on strengthening facilitation skills, session structure, learner engagement, communication and trainer effectiveness.";
    }

    if (applicationScore < 70) {
      return "Learning Application is critically low. Strengthen learning transfer through manager involvement, post-training follow-ups, on-the-job assignments, reinforcement and coaching.";
    }

    if (weakestMetric.name === "Participant Feedback") {
      return "Review participant feedback to identify opportunities to improve facilitation, learner engagement, content relevance and the overall learning experience.";
    }

    if (weakestMetric.name === "Knowledge Assessment") {
      return "Review the training content and assessment approach. Include more practice, activities, knowledge checks and opportunities for learners to apply concepts.";
    }

    if (weakestMetric.name === "Learning Application") {
      return "Strengthen learning transfer through post-training reinforcement, manager follow-ups, practical assignments and on-the-job coaching.";
    }

    if (weakestMetric.name === "Attendance / Completion") {
      return "Review learner availability, scheduling, communication and manager support to improve training attendance and completion.";
    }

    if (rating === "Effective") {
      return "Training effectiveness is strong. Continue the current approach while maintaining consistency across all performance metrics.";
    }

    return "Focus on improving the lower-performing metrics while maintaining performance in the strongest areas.";
  };

  const handleCalculate = () => {
    const scoreValues = [
      trainerObservation,
      participantFeedback,
      knowledgeAssessment,
      learningApplication,
      attendanceCompletion,
    ];

    if (
      programName.trim() === "" ||
      trainerName.trim() === "" ||
      trainingDate === "" ||
      department.trim() === "" ||
      participants === ""
    ) {
      alert("Please complete all Training / Program Details.");
      return;
    }

    if (
      scoreValues.some((value) => value === "") ||
      metrics.some(
        (metric) => metric.score < 0 || metric.score > 100
      )
    ) {
      alert("Please enter valid scores between 0 and 100.");
      return;
    }

    setShowResults(true);

    setTimeout(() => {
      document
        .getElementById("training-report")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  const handleReset = () => {
    setProgramName("");
    setTrainerName("");
    setTrainingDate("");
    setDepartment("");
    setParticipants("");
    setTrainerObservation("");
    setParticipantFeedback("");
    setKnowledgeAssessment("");
    setLearningApplication("");
    setAttendanceCompletion("");
    setShowResults(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDownloadReport = () => {
    window.print();
  };

  const fields: TextField[] = [
    [
      "Training / Program Name",
      programName,
      setProgramName,
      "Example: Leadership Development Program",
      "text",
    ],
    [
      "Trainer Name",
      trainerName,
      setTrainerName,
      "Enter trainer name",
      "text",
    ],
    [
      "Training Date",
      trainingDate,
      setTrainingDate,
      "",
      "date",
    ],
    [
      "Department / Business Unit",
      department,
      setDepartment,
      "Example: Operations",
      "text",
    ],
    [
      "Number of Participants",
      participants,
      setParticipants,
      "Enter number of participants",
      "number",
    ],
  ];

  const scores: ScoreField[] = [
    [
      "Trainer Observation Score (%)",
      trainerObservation,
      setTrainerObservation,
    ],
    [
      "Participant Feedback / L1 Score (%)",
      participantFeedback,
      setParticipantFeedback,
    ],
    [
      "Knowledge Assessment Score (%)",
      knowledgeAssessment,
      setKnowledgeAssessment,
    ],
    [
      "Learning Application / Transfer Score (%)",
      learningApplication,
      setLearningApplication,
    ],
    [
      "Training Attendance / Completion Score (%)",
      attendanceCompletion,
      setAttendanceCompletion,
    ],
  ];

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 7mm;
          }

          body {
            background: white !important;
          }

          main {
            background: white !important;
            padding: 0 !important;
          }

          #training-report {
            display: block !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .report-card,
          .report-section,
          .report-grid-item {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .print-hidden {
            display: none !important;
          }

          .print-report-title {
            font-size: 22px !important;
          }

          .print-compact {
            padding: 10px !important;
          }

          .print-text-small {
            font-size: 10px !important;
          }
        }
      `}</style>

      <main className="min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-6 sm:py-10">
        <div className="mx-auto max-w-6xl">

          {/* Back to Home */}
          <div className="print-hidden">
            <a
              href="/gg-learnlabs/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-blue-300 hover:underline"
            >
              ← Go Back to Home Page
            </a>
          </div>

          {/* Header */}
          <div className="mb-8 print-hidden">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Training Effectiveness Calculator
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Measure training effectiveness across trainer performance,
              participant feedback, knowledge, learning application and
              attendance.
            </p>
          </div>

          {/* Training Details */}
          <div className="print-hidden rounded-2xl border border-white/10 bg-slate-900 p-5 sm:p-6">
            <h2 className="text-xl font-bold sm:text-2xl">
              Training / Program Details
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {fields.map(
                ([label, value, setValue, placeholder, type], index) => (
                  <div
                    key={label}
                    className={index === 4 ? "md:col-span-2" : ""}
                  >
                    <label className="mb-2 block text-sm font-medium">
                      {label}
                    </label>

                    <input
                      type={type}
                      value={value}
                      onChange={(event) =>
                        setValue(event.target.value)
                      }
                      placeholder={placeholder}
                      min={type === "number" ? "1" : undefined}
                      className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Score Input */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900 p-5 sm:p-6 print-hidden">
            <h2 className="text-xl font-bold sm:text-2xl">
              Effectiveness Scores
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {scores.map(([label, value, setValue], index) => (
                <div
                  key={label}
                  className={index === 4 ? "md:col-span-2" : ""}
                >
                  <label className="mb-2 block text-sm font-medium">
                    {label}
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(event) =>
                      setValue(event.target.value)
                    }
                    placeholder="Enter score"
                    className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleCalculate}
                className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
              >
                Calculate Effectiveness →
              </button>

              <button
                onClick={handleReset}
                className="rounded-lg border border-white/10 px-6 py-3 text-slate-300 transition hover:bg-white/5"
              >
                Reset
              </button>
            </div>
          </div>

          {/* RESULTS */}
          {showResults && (
            <div
              id="training-report"
              className="mt-8 overflow-hidden rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl"
            >
              {/* Report Header */}
              <div className="border-b border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-5 py-5 sm:px-8 sm:py-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                      GG LearnLabs
                    </p>

                    <h2 className="print-report-title mt-2 text-2xl font-bold sm:text-3xl">
                      Training Effectiveness Report
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Comprehensive training performance summary
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-left sm:text-right">
                    <p className="text-xs uppercase tracking-wider text-blue-300">
                      Overall Effectiveness
                    </p>

                    <p className="mt-1 text-3xl font-bold text-blue-400">
                      {overallScore.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-4 sm:p-6 print-compact">

                {/* Training Details */}
                <div className="report-section rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-bold">
                      Training Details
                    </h3>

                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                      {rating}
                    </span>
                  </div>

                  <div className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-5">
                    <div>
                      <p className="text-xs text-slate-500">
                        Program
                      </p>
                      <p className="mt-1 font-medium">
                        {programName}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Trainer
                      </p>
                      <p className="mt-1 font-medium">
                        {trainerName}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Training Date
                      </p>
                      <p className="mt-1 font-medium">
                        {trainingDate}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Department
                      </p>
                      <p className="mt-1 font-medium">
                        {department}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Participants
                      </p>
                      <p className="mt-1 font-medium">
                        {participants}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Performance Overview */}
                <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">

                  {/* Performance Breakdown */}
                  <div className="report-section rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Performance Analysis
                        </p>

                        <h3 className="mt-1 text-lg font-bold">
                          Metric Breakdown
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {metrics.map((metric) => (
                        <div
                          key={metric.name}
                          className="rounded-xl border border-white/5 bg-slate-950/60 p-3"
                        >
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {metric.name}
                              </p>

                              <p className="text-xs text-slate-500">
                                Weight: {metric.weight}% · Contribution:{" "}
                                {(
                                  (metric.score * metric.weight) /
                                  100
                                ).toFixed(2)}
                              </p>
                            </div>

                            <div
                              className={`shrink-0 rounded-lg border px-2.5 py-1 text-sm font-bold ${getScoreBadgeColor(
                                metric.score
                              )}`}
                            >
                              {metric.score}%
                            </div>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                            <div
                              className={`h-full rounded-full transition-all ${getScoreColor(
                                metric.score
                              )}`}
                              style={{
                                width: `${metric.score}%`,
                              }}
                            />
                          </div>

                          <p
                            className={`mt-1.5 text-right text-xs font-medium ${getScoreTextColor(
                              metric.score
                            )}`}
                          >
                            {getStatus(metric.score)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Panel */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">

                    {/* Strongest */}
                    <div className="report-grid-item rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-lg">
                          🏆
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                            Strongest Area
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Highest performing measure
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-end justify-between gap-3">
                        <h3 className="text-lg font-bold">
                          {strongestMetric.name}
                        </h3>

                        <p className="text-3xl font-bold text-emerald-400">
                          {strongestMetric.score}%
                        </p>
                      </div>
                    </div>

                    {/* Weakest */}
                    <div className="report-grid-item rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-lg">
                          ⚠️
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-red-400">
                            Weakest Area
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Primary area requiring attention
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-end justify-between gap-3">
                        <h3 className="text-lg font-bold">
                          {weakestMetric.name}
                        </h3>

                        <p className="text-3xl font-bold text-red-400">
                          {weakestMetric.score}%
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="report-grid-item rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 sm:col-span-2 lg:col-span-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                        Final Assessment
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold">
                            {rating}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Based on weighted effectiveness performance
                          </p>
                        </div>

                        <div className="rounded-xl bg-blue-500/10 px-4 py-3 text-2xl font-bold text-blue-400">
                          {overallScore.toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="grid gap-4 lg:grid-cols-2">

                  {/* Improvement Areas */}
                  <div className="report-section rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                        🎯
                      </div>

                      <div>
                        <h3 className="font-bold">
                          Priority Areas to Improve
                        </h3>

                        <p className="text-xs text-slate-400">
                          Focus areas identified from current scores
                        </p>
                      </div>
                    </div>

                    {improvementAreas.length > 0 ? (
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {improvementAreas.map((metric) => (
                          <div
                            key={metric.name}
                            className="flex items-center justify-between rounded-lg border border-white/5 bg-slate-950/60 px-3 py-2"
                          >
                            <span className="text-sm">
                              {metric.name}
                            </span>

                            <span
                              className={`ml-3 text-sm font-bold ${getScoreTextColor(
                                metric.score
                              )}`}
                            >
                              {metric.score}%
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm text-emerald-300">
                        Excellent! No priority improvement areas have been identified.
                      </div>
                    )}
                  </div>

                  {/* Recommendation */}
                  <div className="report-section rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                        💡
                      </div>

                      <div>
                        <h3 className="font-bold text-blue-300">
                          Smart Recommendation
                        </h3>

                        <p className="text-xs text-slate-400">
                          Recommended next steps
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      {getRecommendation()}
                    </p>
                  </div>
                </div>

                {/* Score Guide */}
                <div className="report-section rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <p className="font-semibold text-slate-400">
                      Score Interpretation
                    </p>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-slate-400">
                      <span>
                        <span className="font-bold text-emerald-400">
                          90–100
                        </span>{" "}
                        Strong
                      </span>

                      <span>
                        <span className="font-bold text-blue-400">
                          85–89
                        </span>{" "}
                        Good
                      </span>

                      <span>
                        <span className="font-bold text-amber-400">
                          75–84
                        </span>{" "}
                        Needs Focus
                      </span>

                      <span>
                        <span className="font-bold text-red-400">
                          Below 75
                        </span>{" "}
                        Critical
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Footer */}
              <div className="border-t border-white/10 bg-slate-900/80 px-5 py-3 text-center text-xs text-slate-500">
                GG LearnLabs · Training Effectiveness Assessment
              </div>
            </div>
          )}

          {/* Download */}
          {showResults && (
            <div className="mt-6 flex justify-center print-hidden">
              <button
                onClick={handleDownloadReport}
                className="rounded-xl bg-green-600 px-8 py-4 font-semibold transition hover:bg-green-500"
              >
                Download Training Effectiveness Report
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
