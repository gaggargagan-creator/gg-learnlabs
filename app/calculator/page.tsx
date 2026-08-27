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
    return "Critical Improvement Required";
  };

  /*
    This only controls the visual colour of the existing
    performance sliders and score indicators.
    It does NOT change any calculation or functionality.
  */
  const getScoreTheme = (score: number) => {
    if (score >= 85) {
      return {
        gradient: "linear-gradient(90deg, #22c55e, #4ade80)",
        text: "text-green-400",
        badge:
          "border border-green-400/20 bg-green-400/10 text-green-300",
        glow: "shadow-[0_0_18px_rgba(34,197,94,0.22)]",
        accent: "bg-green-400",
      };
    }

    if (score >= 70) {
      return {
        gradient: "linear-gradient(90deg, #3b82f6, #60a5fa)",
        text: "text-blue-400",
        badge:
          "border border-blue-400/20 bg-blue-400/10 text-blue-300",
        glow: "shadow-[0_0_18px_rgba(59,130,246,0.22)]",
        accent: "bg-blue-400",
      };
    }

    if (score >= 50) {
      return {
        gradient: "linear-gradient(90deg, #f59e0b, #fbbf24)",
        text: "text-amber-400",
        badge:
          "border border-amber-400/20 bg-amber-400/10 text-amber-300",
        glow: "shadow-[0_0_18px_rgba(245,158,11,0.22)]",
        accent: "bg-amber-400",
      };
    }

    return {
      gradient: "linear-gradient(90deg, #ef4444, #fb7185)",
      text: "text-red-400",
      badge: "border border-red-400/20 bg-red-400/10 text-red-300",
      glow: "shadow-[0_0_18px_rgba(239,68,68,0.22)]",
      accent: "bg-red-400",
    };
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

  const overallTheme = getScoreTheme(overallScore);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">

        {/* Back to Home */}
        <a
          href="/gg-learnlabs/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-blue-300 hover:underline print:hidden"
        >
          ← Go Back to Home Page
        </a>

        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
            GG LearnLabs · Analytics Tool
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Training Effectiveness Calculator
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            Measure training effectiveness across trainer performance,
            participant feedback, knowledge, learning application and
            attendance.
          </p>
        </div>

        {/* Training Details */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl shadow-black/20 sm:p-8 print:hidden">
          <div className="mb-7 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-xl">
              📋
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Training / Program Details
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Enter the basic details of the training program.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {fields.map(
              ([label, value, setValue, placeholder, type], index) => (
                <div
                  key={label}
                  className={index === 4 ? "md:col-span-2" : ""}
                >
                  <label className="mb-2 block text-sm font-medium text-slate-200">
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
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Score Input */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl shadow-black/20 sm:p-8 print:hidden">
          <div className="mb-7 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-400/10 text-xl">
              📊
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Effectiveness Scores
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Enter the scores for each effectiveness measure.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {scores.map(([label, value, setValue], index) => (
              <div
                key={label}
                className={index === 4 ? "md:col-span-2" : ""}
              >
                <label className="mb-2 block text-sm font-medium text-slate-200">
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
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleCalculate}
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3.5 font-semibold shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:from-blue-500 hover:to-blue-400"
            >
              Calculate Effectiveness →
            </button>

            <button
              onClick={handleReset}
              className="rounded-xl border border-white/10 px-8 py-3.5 font-medium text-slate-300 transition hover:bg-white/5"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <div className="mt-10 space-y-6">

            {/* Report Header */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 shadow-2xl shadow-black/20">
              <div className="border-b border-white/10 bg-white/[0.02] px-6 py-5 sm:px-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                      Training Effectiveness Report
                    </p>

                    <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                      {programName}
                    </h2>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-400">
                    <span className="block text-xs uppercase tracking-wider text-slate-500">
                      Report Status
                    </span>

                    <span className={`mt-1 block font-semibold ${overallTheme.text}`}>
                      {rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
                <div className="bg-slate-900/90 p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Trainer
                  </p>
                  <p className="mt-2 font-semibold">{trainerName}</p>
                </div>

                <div className="bg-slate-900/90 p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Training Date
                  </p>
                  <p className="mt-2 font-semibold">{trainingDate}</p>
                </div>

                <div className="bg-slate-900/90 p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Department
                  </p>
                  <p className="mt-2 font-semibold">{department}</p>
                </div>

                <div className="bg-slate-900/90 p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Participants
                  </p>
                  <p className="mt-2 font-semibold">{participants}</p>
                </div>

                <div className="bg-slate-900/90 p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Measures
                  </p>
                  <p className="mt-2 font-semibold">5 Performance Areas</p>
                </div>
              </div>
            </div>

            {/* Overall Score */}
            <div className="grid gap-6 lg:grid-cols-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/20 sm:p-8 lg:col-span-3">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Overall Training Effectiveness
                  </p>

                  <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className={`text-6xl font-bold tracking-tight sm:text-7xl ${overallTheme.text}`}>
                        {overallScore.toFixed(2)}%
                      </h2>

                      <p className="mt-3 max-w-md leading-6 text-slate-400">
                        Weighted effectiveness score based on all five
                        training performance measures.
                      </p>
                    </div>

                    <div className={`rounded-2xl px-5 py-4 ${overallTheme.badge}`}>
                      <p className="text-xs uppercase tracking-wider opacity-70">
                        Overall Rating
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {rating}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl shadow-black/20 lg:col-span-2">
                <p className="text-sm font-semibold text-slate-300">
                  Performance Snapshot
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-sm text-slate-400">
                      Strongest Area
                    </span>

                    <span className="font-semibold text-green-400">
                      {strongestMetric.score}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-sm text-slate-400">
                      Weakest Area
                    </span>

                    <span className="font-semibold text-red-400">
                      {weakestMetric.score}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Improvement Areas
                    </span>

                    <span className="font-semibold text-blue-400">
                      {improvementAreas.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Breakdown */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/20">
              <div className="border-b border-white/10 px-6 py-6 sm:px-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-xl">
                    📈
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      Performance Breakdown
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Detailed contribution of each effectiveness measure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left">
                  <thead className="bg-slate-950/40 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-6 py-4 sm:px-8">Metric</th>
                      <th className="px-4 py-4">Score</th>
                      <th className="px-4 py-4">Weight</th>
                      <th className="px-4 py-4">Contribution</th>
                      <th className="px-6 py-4 sm:px-8">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {metrics.map((metric) => {
                      const theme = getScoreTheme(metric.score);

                      return (
                        <tr
                          key={metric.name}
                          className="border-t border-white/5 transition hover:bg-white/[0.02]"
                        >
                          <td className="px-6 py-5 font-medium sm:px-8">
                            {metric.name}
                          </td>

                          <td className={`px-4 py-5 font-bold ${theme.text}`}>
                            {metric.score}%
                          </td>

                          <td className="px-4 py-5 text-slate-400">
                            {metric.weight}%
                          </td>

                          <td className="px-4 py-5 font-semibold text-blue-400">
                            {(
                              (metric.score * metric.weight) /
                              100
                            ).toFixed(2)}
                          </td>

                          <td className="px-6 py-5 sm:px-8">
                            <span
                              className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${theme.badge}`}
                            >
                              {getStatus(metric.score)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Dashboard */}
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/20 sm:p-8">
              <div className="mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-400/10 text-xl">
                    🎯
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      Performance Dashboard
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Visual comparison across all training effectiveness measures.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-7">
                {metrics.map((metric) => {
                  const theme = getScoreTheme(metric.score);

                  return (
                    <div key={metric.name}>
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-slate-200">
                            {metric.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Weight: {metric.weight}% · {getStatus(metric.score)}
                          </p>
                        </div>

                        <div
                          className={`min-w-[70px] rounded-xl px-3 py-2 text-center text-lg font-bold ${theme.badge}`}
                        >
                          {metric.score}%
                        </div>
                      </div>

                      {/* Existing slider / progress bar preserved */}
                      <div className="h-3 overflow-hidden rounded-full bg-slate-800 ring-1 ring-inset ring-white/5 sm:h-4">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${theme.glow}`}
                          style={{
                            width: `${metric.score}%`,
                            background: theme.gradient,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Score legend */}
              <div className="mt-10 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  85–100 Strong
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                  70–84 Good
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  50–69 Needs Attention
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  Below 50 Critical
                </div>
              </div>
            </div>

            {/* Strongest and Weakest */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-3xl border border-green-400/20 bg-gradient-to-br from-green-400/10 to-slate-900 p-6 shadow-xl shadow-black/20">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-green-400/10 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-400/10 text-xl">
                      🏆
                    </div>

                    <p className="text-sm font-semibold uppercase tracking-wider text-green-300">
                      Strongest Area
                    </p>
                  </div>

                  <h3 className="mt-7 text-2xl font-bold">
                    {strongestMetric.name}
                  </h3>

                  <div className="mt-5 flex items-end justify-between">
                    <p className="text-sm text-slate-400">
                      Highest performing measure
                    </p>

                    <p className="text-4xl font-bold text-green-400">
                      {strongestMetric.score}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-red-400/20 bg-gradient-to-br from-red-400/10 to-slate-900 p-6 shadow-xl shadow-black/20">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-400/10 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-400/10 text-xl">
                      ⚠️
                    </div>

                    <p className="text-sm font-semibold uppercase tracking-wider text-red-300">
                      Weakest Area
                    </p>
                  </div>

                  <h3 className="mt-7 text-2xl font-bold">
                    {weakestMetric.name}
                  </h3>

                  <div className="mt-5 flex items-end justify-between">
                    <p className="text-sm text-slate-400">
                      Primary area requiring attention
                    </p>

                    <p className="text-4xl font-bold text-red-400">
                      {weakestMetric.score}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Priority Areas */}
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/20 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-400/10 text-xl">
                  🎯
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Priority Areas to Improve
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Focus areas identified from the current effectiveness scores.
                  </p>
                </div>
              </div>

              {improvementAreas.length > 0 ? (
                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {improvementAreas.map((metric) => {
                    const theme = getScoreTheme(metric.score);

                    return (
                      <div
                        key={metric.name}
                        className="rounded-2xl border border-white/10 bg-slate-950/40 p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold">
                              {metric.name}
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                              Performance below the desired 85% benchmark.
                            </p>
                          </div>

                          <span
                            className={`rounded-xl px-3 py-2 font-bold ${theme.badge}`}
                          >
                            {metric.score}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-7 rounded-2xl border border-green-400/20 bg-green-400/5 p-6 text-green-300">
                  <p className="font-semibold">
                    Excellent performance across all measures.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-green-200/70">
                    No priority improvement areas have been identified.
                  </p>
                </div>
              )}
            </div>

            {/* Smart Recommendation */}
            <div className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-slate-900 to-purple-500/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
              <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-xl">
                    💡
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                      Actionable Insight
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      Smart Recommendation
                    </h2>
                  </div>
                </div>

                <p className="mt-7 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
                  {getRecommendation()}
                </p>
              </div>
            </div>

            {/* Download */}
            <div className="flex justify-center pb-8 print:hidden">
              <button
                onClick={handleDownloadReport}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-4 font-semibold shadow-xl shadow-green-600/20 transition hover:-translate-y-1 hover:shadow-green-500/30"
              >
                <span>Download Training Effectiveness Report</span>
                <span className="transition group-hover:translate-y-0.5">
                  ↓
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
