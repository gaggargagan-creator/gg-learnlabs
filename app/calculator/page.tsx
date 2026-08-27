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

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Back to Home */}
        <a
          href="/gg-learnlabs/"
          className="mb-6 inline-flex items-center text-sm font-medium text-blue-400 transition hover:text-blue-300 hover:underline"
        >
          ← Go Back to Home Page
        </a>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Training Effectiveness Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Measure training effectiveness across trainer performance,
            participant feedback, knowledge, learning application and
            attendance.
          </p>
        </div>

        {/* Training Details */}
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 print:hidden">
          <h2 className="text-2xl font-bold">
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
                    className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Score Input */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900 p-6 print:hidden">
          <h2 className="text-2xl font-bold">
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
                  className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
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
              className="rounded-lg border border-white/10 px-6 py-3 text-slate-300 hover:bg-white/5"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <div className="mt-8 space-y-6">

            {/* Training Summary */}
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-xl font-bold">
                Training Details
              </h2>

              <div className="mt-5 grid gap-4 text-sm md:grid-cols-2">
                <p>Program: {programName}</p>
                <p>Trainer: {trainerName}</p>
                <p>Date: {trainingDate}</p>
                <p>Department: {department}</p>
                <p>Participants: {participants}</p>
              </div>
            </div>

            {/* Overall Score */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 p-6 md:col-span-2">
                <p className="text-sm text-blue-300">
                  OVERALL TRAINING EFFECTIVENESS
                </p>

                <h2 className="mt-2 text-5xl font-bold text-blue-400">
                  {overallScore.toFixed(2)}%
                </h2>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                <p className="text-sm text-slate-400">
                  Effectiveness Rating
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {rating}
                </h2>
              </div>
            </div>

            {/* Performance Breakdown */}
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-2xl font-bold">
                Performance Breakdown
              </h2>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Score</th>
                      <th>Weight</th>
                      <th>Contribution</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {metrics.map((metric) => (
                      <tr
                        key={metric.name}
                        className="border-t border-white/10"
                      >
                        <td className="py-4">
                          {metric.name}
                        </td>

                        <td>{metric.score}%</td>

                        <td>{metric.weight}%</td>

                        <td className="text-blue-400">
                          {(
                            (metric.score * metric.weight) /
                            100
                          ).toFixed(2)}
                        </td>

                        <td>
                          {getStatus(metric.score)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dashboard */}
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-2xl font-bold">
                Performance Dashboard
              </h2>

              {metrics.map((metric) => (
                <div
                  className="mt-5"
                  key={metric.name}
                >
                  <div className="mb-2 flex justify-between">
                    <span>{metric.name}</span>

                    <span className="text-blue-400">
                      {metric.score}%
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-700">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${metric.score}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Strongest and Weakest */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
                <p>🏆 Strongest Area</p>

                <h3 className="mt-3 text-xl font-bold">
                  {strongestMetric.name}
                </h3>

                <p className="text-green-400">
                  Score: {strongestMetric.score}%
                </p>
              </div>

              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
                <p>⚠️ Weakest Area</p>

                <h3 className="mt-3 text-xl font-bold">
                  {weakestMetric.name}
                </h3>

                <p className="text-red-400">
                  Score: {weakestMetric.score}%
                </p>
              </div>
            </div>

            {/* Improvement Areas */}
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-2xl font-bold">
                🎯 Priority Areas to Improve
              </h2>

              {improvementAreas.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {improvementAreas.map((metric) => (
                    <li key={metric.name}>
                      • {metric.name} — {metric.score}%
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4">
                  Excellent! No priority improvement areas have been
                  identified.
                </p>
              )}
            </div>

            {/* Recommendation */}
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
              <h2 className="text-xl font-bold text-blue-300">
                💡 Smart Recommendation
              </h2>

              <p className="mt-4 leading-7">
                {getRecommendation()}
              </p>
            </div>

            {/* Download */}
            <div className="flex justify-center print:hidden">
              <button
                onClick={handleDownloadReport}
                className="rounded-xl bg-green-600 px-8 py-4 font-semibold transition hover:bg-green-500"
              >
                Download Training Effectiveness Report
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
