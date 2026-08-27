"use client";

import { useState } from "react";

export default function TrainingEffectivenessCalculator() {
  const [trainingName, setTrainingName] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [trainingDate, setTrainingDate] = useState("");
  const [department, setDepartment] = useState("");
  const [participants, setParticipants] = useState("");

  const [trainerObservation, setTrainerObservation] = useState("");
  const [participantFeedback, setParticipantFeedback] = useState("");
  const [knowledgeAssessment, setKnowledgeAssessment] = useState("");
  const [learningApplication, setLearningApplication] = useState("");
  const [trainingAttendance, setTrainingAttendance] = useState("");

  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculateEffectiveness = () => {
    const scores = [
      Number(trainerObservation),
      Number(participantFeedback),
      Number(knowledgeAssessment),
      Number(learningApplication),
      Number(trainingAttendance),
    ];

    if (
      trainerObservation === "" ||
      participantFeedback === "" ||
      knowledgeAssessment === "" ||
      learningApplication === "" ||
      trainingAttendance === ""
    ) {
      setError("Please enter all effectiveness scores.");
      setResult(null);
      return;
    }

    if (scores.some((score) => score < 0 || score > 100)) {
      setError("All scores must be between 0 and 100.");
      setResult(null);
      return;
    }

    const average =
      scores.reduce((total, score) => total + score, 0) / scores.length;

    setResult(Number(average.toFixed(2)));
    setError("");
  };

  const resetCalculator = () => {
    setTrainingName("");
    setTrainerName("");
    setTrainingDate("");
    setDepartment("");
    setParticipants("");

    setTrainerObservation("");
    setParticipantFeedback("");
    setKnowledgeAssessment("");
    setLearningApplication("");
    setTrainingAttendance("");

    setResult(null);
    setError("");
  };

  return (
    <main className="min-h-screen bg-[#070d20] px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Go Back to Home Page */}
        <a
          href="/gg-learnlabs/"
          className="mb-6 inline-flex items-center text-sm font-medium text-blue-300 transition hover:text-blue-200 hover:underline"
        >
          ← Go Back to Home Page
        </a>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Training Effectiveness Calculator
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
          Measure training effectiveness across trainer performance,
          participant feedback, knowledge, learning application and attendance.
        </p>

        {/* Training Details */}
        <section className="mt-10 rounded-2xl border border-slate-700 bg-slate-800/80 p-6 shadow-xl md:p-8">
          <h2 className="text-2xl font-bold">
            Training / Program Details
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Training / Program Name
              </label>
              <input
                type="text"
                value={trainingName}
                onChange={(e) => setTrainingName(e.target.value)}
                placeholder="Example: Leadership Development Program"
                className="w-full rounded-lg border border-slate-700 bg-[#070d20] px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-blue-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Trainer Name
              </label>
              <input
                type="text"
                value={trainerName}
                onChange={(e) => setTrainerName(e.target.value)}
                placeholder="Enter trainer name"
                className="w-full rounded-lg border border-slate-700 bg-[#070d20] px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-blue-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Training Date
              </label>
              <input
                type="date"
                value={trainingDate}
                onChange={(e) => setTrainingDate(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-[#070d20] px-4 py-3 text-white outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Department / Business Unit
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Example: Operations"
                className="w-full rounded-lg border border-slate-700 bg-[#070d20] px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-blue-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Number of Participants
              </label>
              <input
                type="number"
                min="1"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                placeholder="Enter number of participants"
                className="w-full rounded-lg border border-slate-700 bg-[#070d20] px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-blue-400"
              />
            </div>
          </div>
        </section>

        {/* Effectiveness Scores */}
        <section className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/80 p-6 shadow-xl md:p-8">
          <h2 className="text-2xl font-bold">Effectiveness Scores</h2>

          <p className="mt-2 text-sm text-slate-400">
            Enter a score between 0 and 100 for each parameter.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <ScoreInput
              label="Trainer Observation Score (%)"
              value={trainerObservation}
              onChange={setTrainerObservation}
            />

            <ScoreInput
              label="Participant Feedback / L1 Score (%)"
              value={participantFeedback}
              onChange={setParticipantFeedback}
            />

            <ScoreInput
              label="Knowledge Assessment Score (%)"
              value={knowledgeAssessment}
              onChange={setKnowledgeAssessment}
            />

            <ScoreInput
              label="Learning Application / Transfer Score (%)"
              value={learningApplication}
              onChange={setLearningApplication}
            />

            <div className="md:col-span-2">
              <ScoreInput
                label="Training Attendance / Completion Score (%)"
                value={trainingAttendance}
                onChange={setTrainingAttendance}
              />
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={calculateEffectiveness}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Calculate Effectiveness
            </button>

            <button
              type="button"
              onClick={resetCalculator}
              className="rounded-lg border border-slate-600 bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-600"
            >
              Reset
            </button>
          </div>

          {result !== null && (
            <div className="mt-8 rounded-xl border border-blue-500/40 bg-blue-500/10 p-6 text-center">
              <p className="text-sm font-medium uppercase tracking-wide text-blue-300">
                Overall Training Effectiveness
              </p>

              <p className="mt-3 text-5xl font-bold text-white">
                {result}%
              </p>

              <p className="mt-3 text-sm text-slate-300">
                Based on the average of all five effectiveness parameters.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

type ScoreInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function ScoreInput({
  label,
  value,
  onChange,
}: ScoreInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        type="number"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter score"
        className="w-full rounded-lg border border-slate-700 bg-[#070d20] px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-blue-400"
      />
    </div>
  );
}
