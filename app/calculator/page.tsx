"use client";

import { useState, type Dispatch, type SetStateAction } from "react";

type Metric = { name: string; score: number; weight: number };
type TextField = [string, string, Dispatch<SetStateAction<string>>, string, string];
type ScoreField = [string, string, Dispatch<SetStateAction<string>>];

export default function Calculator() {
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
  const [showResults, setShowResults] = useState(false);

  const metrics: Metric[] = [
    { name: "Trainer Observation", score: Number(trainerObservation) || 0, weight: 35 },
    { name: "Participant Feedback", score: Number(participantFeedback) || 0, weight: 20 },
    { name: "Knowledge Assessment", score: Number(knowledgeAssessment) || 0, weight: 15 },
    { name: "Learning Application", score: Number(learningApplication) || 0, weight: 20 },
    { name: "Attendance / Completion", score: Number(attendanceCompletion) || 0, weight: 10 },
  ];

  const overallScore = metrics.reduce((total, metric) => total + metric.score * metric.weight / 100, 0);
  const getStatus = (score: number) => score >= 90 ? "Strong" : score >= 85 ? "Good" : score >= 75 ? "Needs Focus" : "Critical";
  const getScoreColor = (score: number) => score >= 90 ? "bg-emerald-500" : score >= 85 ? "bg-blue-500" : score >= 75 ? "bg-amber-500" : "bg-red-500";
  const getScoreTextColor = (score: number) => score >= 90 ? "text-emerald-400" : score >= 85 ? "text-blue-400" : score >= 75 ? "text-amber-400" : "text-red-400";
  const getScoreBadgeColor = (score: number) =>
    score >= 90 ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" :
    score >= 85 ? "border-blue-500/30 bg-blue-500/10 text-blue-400" :
    score >= 75 ? "border-amber-500/30 bg-amber-500/10 text-amber-400" :
    "border-red-500/30 bg-red-500/10 text-red-400";

  const trainerScore = metrics[0].score;
  const applicationScore = metrics[3].score;
  const hasMetricBelow75 = metrics.some((metric) => metric.score < 75);
  const rating = overallScore < 85 || trainerScore < 80 || applicationScore < 70
    ? "Needs Improvement" : overallScore >= 90 && !hasMetricBelow75 ? "Effective" : "Satisfactory";

  const strongestMetric = metrics.reduce((highest, metric) => metric.score > highest.score ? metric : highest);
  const weakestMetric = metrics.reduce((lowest, metric) => metric.score < lowest.score ? metric : lowest);
  const improvementAreas = metrics.filter((metric) => metric.score < 85);

  const getRecommendation = () => {
    if (trainerScore < 80) return "Trainer Observation is below the required threshold. Focus on strengthening facilitation skills, session structure, learner engagement, communication and trainer effectiveness.";
    if (applicationScore < 70) return "Learning Application is critically low. Strengthen learning transfer through manager involvement, post-training follow-ups, on-the-job assignments, reinforcement and coaching.";
    if (weakestMetric.name === "Participant Feedback") return "Review participant feedback to identify opportunities to improve facilitation, learner engagement, content relevance and the overall learning experience.";
    if (weakestMetric.name === "Knowledge Assessment") return "Review the training content and assessment approach. Include more practice, activities, knowledge checks and opportunities for learners to apply concepts.";
    if (weakestMetric.name === "Learning Application") return "Strengthen learning transfer through post-training reinforcement, manager follow-ups, practical assignments and on-the-job coaching.";
    if (weakestMetric.name === "Attendance / Completion") return "Review learner availability, scheduling, communication and manager support to improve training attendance and completion.";
    if (rating === "Effective") return "Training effectiveness is strong. Continue the current approach while maintaining consistency across all performance metrics.";
    return "Focus on improving the lower-performing metrics while maintaining performance in the strongest areas.";
  };

  const handleCalculate = () => {
    const scoreValues = [trainerObservation, participantFeedback, knowledgeAssessment, learningApplication, attendanceCompletion];
    if (!programName.trim() || !trainerName.trim() || !trainingDate || !department.trim() || !participants) {
      alert("Please complete all Training / Program Details."); return;
    }
    if (scoreValues.some((value) => value === "") || metrics.some((metric) => metric.score < 0 || metric.score > 100)) {
      alert("Please enter valid scores between 0 and 100."); return;
    }
    setShowResults(true);
    setTimeout(() => document.getElementById("training-report")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const handleReset = () => {
    [setProgramName,setTrainerName,setTrainingDate,setDepartment,setParticipants,setTrainerObservation,setParticipantFeedback,setKnowledgeAssessment,setLearningApplication,setAttendanceCompletion].forEach((setter) => setter(""));
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fields: TextField[] = [
    ["Training / Program Name", programName, setProgramName, "Example: Leadership Development Program", "text"],
    ["Trainer Name", trainerName, setTrainerName, "Enter trainer name", "text"],
    ["Training Date", trainingDate, setTrainingDate, "", "date"],
    ["Department / Business Unit", department, setDepartment, "Example: Operations", "text"],
    ["Number of Participants", participants, setParticipants, "Enter number of participants", "number"],
  ];
  const scores: ScoreField[] = [
    ["Trainer Observation Score (%)", trainerObservation, setTrainerObservation],
    ["Participant Feedback / L1 Score (%)", participantFeedback, setParticipantFeedback],
    ["Knowledge Assessment Score (%)", knowledgeAssessment, setKnowledgeAssessment],
    ["Learning Application / Transfer Score (%)", learningApplication, setLearningApplication],
    ["Training Attendance / Completion Score (%)", attendanceCompletion, setAttendanceCompletion],
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="site-header print-hidden">
        <div className="site-header-inner">
          <a href="/gg-learnlabs/" className="site-brand">
            <div className="brand-mark"><span>GG</span></div>
            <div className="brand-copy"><span className="brand-name">GG LearnLabs</span><span className="brand-tagline">Learn. Measure. Improve.</span></div>
          </a>
          <nav className="quick-navigation">
            <a href="/gg-learnlabs/" className="quick-nav-link">Home</a>
            <a href="/gg-learnlabs/calculator/" className="quick-nav-link quick-nav-primary">Effectiveness Calculator</a>
            <a href="/gg-learnlabs/#tools" className="quick-nav-link">Tools</a>
            <a href="/gg-learnlabs/#resources" className="quick-nav-link">Resources</a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">GG LearnLabs · Assessment Tool</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Training Effectiveness Calculator</h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-400">
            Measure training effectiveness across trainer performance, participant feedback, knowledge, learning application and attendance.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900 p-5 sm:p-7">
          <h2 className="text-xl font-bold sm:text-2xl">Training / Program Details</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {fields.map(([label, value, setValue, placeholder, type], index) => (
              <div key={label} className={index === 4 ? "md:col-span-2" : ""}>
                <label className="mb-2 block text-sm font-medium">{label}</label>
                <input type={type} value={value} onChange={(event) => setValue(event.target.value)}
                  placeholder={placeholder} min={type === "number" ? "1" : undefined}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-blue-500" />
              </div>
            ))}
          </div>

          <h2 className="mt-9 text-xl font-bold sm:text-2xl">Effectiveness Scores</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {scores.map(([label, value, setValue], index) => (
              <div key={label} className={index === 4 ? "md:col-span-2" : ""}>
                <label className="mb-2 block text-sm font-medium">{label}</label>
                <input type="number" min="0" max="100" value={value} onChange={(event) => setValue(event.target.value)}
                  placeholder="Enter score between 0 and 100"
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-blue-500" />
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={handleCalculate} className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold transition hover:bg-blue-500">Calculate Effectiveness →</button>
            <button onClick={handleReset} className="rounded-xl border border-white/15 px-7 py-3.5 font-semibold text-slate-200 transition hover:bg-white/5">Reset</button>
          </div>
        </section>

        {showResults && (
          <section id="training-report" className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/30">
            <div className="border-b border-white/10 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/50 p-5 sm:p-7">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-400">GG LearnLabs</p>
                  <h2 className="report-title mt-2 text-3xl font-bold sm:text-4xl">Training Effectiveness Report</h2>
                  <p className="mt-2 text-sm text-slate-400">Comprehensive training performance summary</p>
                </div>
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">Overall Effectiveness</p>
                  <p className="mt-1 text-4xl font-bold text-blue-400">{overallScore.toFixed(2)}%</p>
                </div>
              </div>
            </div>

            <div className="report-compact space-y-5 p-4 sm:p-6">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold">Training Details</h3>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getScoreBadgeColor(overallScore)}`}>{rating}</span>
                </div>
                <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-5">
                  {[["Program",programName],["Trainer",trainerName],["Training Date",trainingDate],["Department",department],["Participants",participants]].map(([label,value]) => (
                    <div key={label}><p className="text-xs text-slate-500">{label}</p><p className="mt-1 break-words font-medium">{value}</p></div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">Performance Analysis</p>
                  <h3 className="mt-1 text-xl font-bold">Metric Breakdown</h3>
                  <div className="mt-4 space-y-3">
                    {metrics.map((metric) => (
                      <div key={metric.name} className="rounded-xl border border-white/5 bg-slate-950/70 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <div><p className="text-sm font-semibold">{metric.name}</p><p className="text-xs text-slate-500">Weight: {metric.weight}% · Contribution: {(metric.score * metric.weight / 100).toFixed(2)}</p></div>
                          <span className={`shrink-0 rounded-lg border px-2.5 py-1 text-sm font-bold ${getScoreBadgeColor(metric.score)}`}>{metric.score}%</span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><div className={`h-full rounded-full ${getScoreColor(metric.score)}`} style={{width:`${metric.score}%`}} /></div>
                        <p className={`mt-1 text-right text-xs font-semibold ${getScoreTextColor(metric.score)}`}>{getStatus(metric.score)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">🏆 Strongest Area</p>
                    <div className="mt-5 flex items-end justify-between gap-3"><h3 className="text-lg font-bold">{strongestMetric.name}</h3><span className="text-3xl font-bold text-emerald-400">{strongestMetric.score}%</span></div>
                    <p className="mt-3 text-xs text-slate-400">Highest performing measure</p>
                  </div>
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-red-400">⚠ Weakest Area</p>
                    <div className="mt-5 flex items-end justify-between gap-3"><h3 className="text-lg font-bold">{weakestMetric.name}</h3><span className="text-3xl font-bold text-red-400">{weakestMetric.score}%</span></div>
                    <p className="mt-3 text-xs text-slate-400">Primary area requiring attention</p>
                  </div>
                  <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-400">Final Assessment</p>
                    <div className="mt-3 flex items-center justify-between gap-3"><div><p className="text-xl font-bold">{rating}</p><p className="mt-1 text-xs text-slate-400">Based on weighted effectiveness performance</p></div><span className="text-2xl font-bold text-blue-400">{overallScore.toFixed(0)}%</span></div>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <h3 className="font-bold">🎯 Priority Areas to Improve</h3>
                  <p className="mt-1 text-xs text-slate-400">Focus areas identified from current effectiveness scores</p>
                  {improvementAreas.length ? <div className="mt-4 grid gap-2 sm:grid-cols-2">{improvementAreas.map((metric) => <div key={metric.name} className="flex items-center justify-between rounded-lg border border-white/5 bg-slate-950/60 px-3 py-2 text-sm"><span>{metric.name}</span><b className={getScoreTextColor(metric.score)}>{metric.score}%</b></div>)}</div> : <p className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm text-emerald-300">Excellent! No priority improvement areas have been identified.</p>}
                </div>
                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
                  <h3 className="font-bold text-blue-300">💡 Smart Recommendation</h3>
                  <p className="mt-1 text-xs text-slate-400">Recommended next steps</p>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{getRecommendation()}</p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-3"><b className="text-slate-400">Score Interpretation</b><div className="flex flex-wrap gap-x-5 gap-y-2 text-slate-400"><span><b className="text-emerald-400">90–100</b> Strong</span><span><b className="text-blue-400">85–89</b> Good</span><span><b className="text-amber-400">75–84</b> Needs Focus</span><span><b className="text-red-400">Below 75</b> Critical</span></div></div>
              </div>
            </div>
            <div className="border-t border-white/10 bg-slate-900/80 px-5 py-3 text-center text-xs text-slate-500">GG LearnLabs · Training Effectiveness Assessment</div>
          </section>
        )}

        {showResults && <div className="print-hidden mt-6 flex justify-center"><button onClick={() => window.print()} className="rounded-xl bg-emerald-600 px-8 py-4 font-semibold transition hover:bg-emerald-500">Download Training Effectiveness Report</button></div>}
      </div>
    </main>
  );
}
