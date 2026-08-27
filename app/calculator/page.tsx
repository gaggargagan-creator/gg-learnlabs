"use client";

import { useState } from "react";

export default function TrainingEffectivenessCalculator() {
  const [programName, setProgramName] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [trainingDate, setTrainingDate] = useState("");
  const [department, setDepartment] = useState("");
  const [participants, setParticipants] = useState("");

  const [trainerObservation, setTrainerObservation] = useState("");
  const [participantFeedback, setParticipantFeedback] = useState("");
  const [knowledgeAssessment, setKnowledgeAssessment] = useState("");
  const [learningApplication, setLearningApplication] = useState("");
  const [attendanceCompletion, setAttendanceCompletion] = useState("");

  const [result, setResult] = useState<number | null>(null);
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  const calculateEffectiveness = () => {
    const scores = [
      trainerObservation,
      participantFeedback,
      knowledgeAssessment,
      learningApplication,
      attendanceCompletion,
    ];

    if (scores.some((score) => score === "")) {
      alert("Please enter all effectiveness scores before calculating.");
      return;
    }

    const trainerObservationScore = Number(trainerObservation);
    const participantFeedbackScore = Number(participantFeedback);
    const knowledgeAssessmentScore = Number(knowledgeAssessment);
    const learningApplicationScore = Number(learningApplication);
    const attendanceCompletionScore = Number(attendanceCompletion);

    const allScores = [
      trainerObservationScore,
      participantFeedbackScore,
      knowledgeAssessmentScore,
      learningApplicationScore,
      attendanceCompletionScore,
    ];

    if (
      allScores.some(
        (score) => Number.isNaN(score) || score < 0 || score > 100
      )
    ) {
      alert("Please enter valid scores between 0 and 100.");
      return;
    }

    const overallScore =
      trainerObservationScore * 0.2 +
      participantFeedbackScore * 0.2 +
      knowledgeAssessmentScore * 0.2 +
      learningApplicationScore * 0.3 +
      attendanceCompletionScore * 0.1;

    const finalScore = Number(overallScore.toFixed(2));

    setResult(finalScore);

    if (finalScore >= 90) {
      setRating("Excellent");
      setMessage(
        "The training program is highly effective and is delivering strong results across all key areas."
      );
    } else if (finalScore >= 75) {
      setRating("Effective");
      setMessage(
        "The training program is performing well, with opportunities for further improvement."
      );
    } else if (finalScore >= 60) {
      setRating("Moderately Effective");
      setMessage(
        "The training program is showing positive results, but some areas need improvement."
      );
    } else if (finalScore >= 40) {
      setRating("Needs Improvement");
      setMessage(
        "The training program requires focused improvement across one or more key areas."
      );
    } else {
      setRating("Critical Attention Needed");
      setMessage(
        "The training program requires significant review and corrective action."
      );
    }
  };

  const resetCalculator = () => {
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

    setResult(null);
    setRating("");
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Heading */}
        <section className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Training Effectiveness Calculator
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            Measure training effectiveness across trainer performance,
            participant feedback, knowledge, learning application and
            attendance.
          </p>
        </section>

        {/* Training Details */}
        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl sm:p-8">
          <h2 className="mb-7 text-2xl font-bold text-white sm:text-3xl">
            Training / Program Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="programName"
                className="mb-2 block text-sm font-medium text-slate-100"
              >
                Training / Program Name
              </label>

              <input
                id="programName"
                type="text"
                value={programName}
                onChange={(event) => setProgramName(event.target.value)}
                placeholder="Example: Leadership Development Program"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="trainerName"
                className="mb-2 block text-sm font-medium text-slate-100"
              >
                Trainer Name
              </label>

              <input
                id="trainerName"
                type="text"
                value={trainerName}
                onChange={(event) => setTrainerName(event.target.value)}
                placeholder="Enter trainer name"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="trainingDate"
                className="mb-2 block text-sm font-medium text-slate-100"
              >
                Training Date
              </label>

              <input
                id="trainingDate"
                type="date"
                value={trainingDate}
                onChange={(event) => setTrainingDate(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="mb-2 block text-sm font-medium text-slate-100"
              >
                Department / Business Unit
              </label>

              <input
                id="department"
                type="text"
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                placeholder="Example: Operations"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="participants"
                className="mb-2 block text-sm font-medium text-slate-100"
              >
                Number of Participants
              </label>

              <input
                id="participants"
                type="number"
                min="1"
                value={participants}
                onChange={(event) => setParticipants(event.target.value)}
                placeholder="Enter number of participants"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Effectiveness Scores */}
        <section className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl sm:p-8">
          <h2 className="mb-7 text-2xl font-bold text-white sm:text-3xl">
            Effectiveness Scores
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="trainerObservation"
                className="mb-2 block text-sm font-medium text-slate-100"
              >
                Trainer Observation Score (%)
              </label>

              <input
                id="trainerObservation"
                type="number"
                min="0"
                max="100"
                value={trainerObservation}
                onChange={(event) =>
                  setTrainerObservation(event.target.value)
                }
                placeholder="Enter score"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="participantFeedback"
                className="mb-2 block text-sm font-medium text-slate-100"
              >
                Participant Feedback / L1 Score (%)
              </label>

              <input
                id="participantFeedback"
                type="number"
                min="0"
                max="100"
                value={participantFeedback}
                onChange={(event) =>
                  setParticipantFeedback(event.target.value)
                }
                placeholder="Enter score"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="knowledgeAssessment"
                className="mb-2 block text-sm font-medium text-slate-100"
              >
                Knowledge Assessment Score (%)
              </label>

              <input
                id="knowledgeAssessment"
                type="number"
                min="0"
                max="100"
                value={knowledgeAssessment}
                onChange={(event) =>
                  setKnowledgeAssessment(event.target.value)
                }
                placeholder="Enter score"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="learningApplication"
                className="mb-2 block text-sm font-medium text-slate-100"
              >
                Learning Application / Transfer Score (%)
              </label>

              <input
                id="learningApplication"
                type="number"
                min="0"
                max="100"
                value={learningApplication}
                onChange={(event) =>
                  setLearningApplication(event.target.value)
                }
                placeholder="Enter score"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="attendanceCompletion"
                className="mb-2 block text-sm font-medium text-slate-100"
              >
                Training Attendance / Completion Score (%)
              </label>

              <input
                id="attendanceCompletion"
                type="number"
                min="0"
                max="100"
                value={attendanceCompletion}
                onChange={(event) =>
                  setAttendanceCompletion(event.target.value)
                }
                placeholder="Enter score"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={calculateEffectiveness}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Calculate Effectiveness →
            </button>

            <button
              type="button"
              onClick={resetCalculator}
              className="rounded-lg border border-slate-600 bg-slate-800 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
            >
              Reset
            </button>
          </div>
        </section>

        {/* Result */}
        {result !== null && (
          <section className="mt-8 rounded-2xl border border-blue-500/40 bg-slate-900 p-6 shadow-xl sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Overall Training Effectiveness
            </p>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-5xl font-bold text-white sm:text-6xl">
                  {result}%
                </div>

                <h2 className="mt-3 text-2xl font-bold text-blue-400">
                  {rating}
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                  {message}
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-4">
                <p className="text-sm text-slate-400">
                  Training Program
                </p>

                <p className="mt-1 font-semibold text-white">
                  {programName || "Not specified"}
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
