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

  const getScoreClass = (score: number) => {
    if (score >= 90) return "gg-green";
    if (score >= 85) return "gg-blue";
    if (score >= 75) return "gg-amber";
    return "gg-red";
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
        * {
          box-sizing: border-box;
        }

        .calculator-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 10% 0%,
              rgba(51, 130, 255, 0.14),
              transparent 28%
            ),
            radial-gradient(
              circle at 90% 30%,
              rgba(40, 100, 190, 0.08),
              transparent 30%
            ),
            #07111f;
          color: #f5f8fc;
          font-family: Arial, Helvetica, sans-serif;
        }

        .gg-nav {
          width: 100%;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(7, 17, 31, 0.92);
          backdrop-filter: blur(14px);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .gg-nav-inner {
          max-width: 1280px;
          margin: auto;
          padding: 18px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .gg-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          text-decoration: none;
          min-width: fit-content;
        }

        .gg-logo-mark {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(
              135deg,
              rgba(77, 163, 255, 0.25),
              rgba(77, 163, 255, 0.05)
            );
          border: 1px solid rgba(77, 163, 255, 0.35);
          color: #7cc0ff;
          font-size: 16px;
          font-weight: 800;
        }

        .gg-brand-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .gg-brand-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.3px;
        }

        .gg-brand-subtitle {
          color: #8fa0b5;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .gg-nav-links {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .gg-nav-link {
          color: #9baabd;
          text-decoration: none;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 14px;
          transition: 0.2s ease;
        }

        .gg-nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .gg-nav-link-active {
          color: #dceeff;
          background: rgba(77, 163, 255, 0.1);
          border: 1px solid rgba(77, 163, 255, 0.25);
        }

        .calculator-hero {
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          background:
            linear-gradient(
              135deg,
              rgba(16, 34, 56, 0.95),
              rgba(7, 17, 31, 0.9)
            );
        }

        .calculator-hero-inner {
          max-width: 1120px;
          margin: auto;
          padding: 70px 32px;
        }

        .calculator-eyebrow {
          display: inline-flex;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(77, 163, 255, 0.09);
          border: 1px solid rgba(77, 163, 255, 0.22);
          color: #8fc5ff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .calculator-hero h1 {
          margin: 20px 0 0;
          font-size: clamp(36px, 5vw, 62px);
          line-height: 1.05;
          letter-spacing: -2px;
        }

        .calculator-hero h1 span {
          color: #62aaf5;
        }

        .calculator-hero p {
          max-width: 700px;
          margin: 20px 0 0;
          color: #9baabd;
          font-size: 17px;
          line-height: 1.8;
        }

        .calculator-content {
          max-width: 1120px;
          margin: auto;
          padding: 48px 32px 80px;
        }

        .gg-panel {
          background: rgba(15, 31, 52, 0.92);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.16);
        }

        .gg-panel + .gg-panel {
          margin-top: 24px;
        }

        .gg-section-title {
          margin: 0;
          font-size: 25px;
          color: #ffffff;
        }

        .gg-section-description {
          margin: 8px 0 0;
          color: #8fa0b5;
          font-size: 14px;
        }

        .gg-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
          margin-top: 28px;
        }

        .gg-field-full {
          grid-column: span 2;
        }

        .gg-field label {
          display: block;
          margin-bottom: 9px;
          color: #dbe5f0;
          font-size: 14px;
          font-weight: 600;
        }

        .gg-field input {
          width: 100%;
          min-height: 52px;
          padding: 0 16px;
          border-radius: 11px;
          border: 1px solid rgba(148, 163, 184, 0.26);
          background: #081221;
          color: white;
          outline: none;
          font-size: 15px;
          transition: 0.2s ease;
        }

        .gg-field input::placeholder {
          color: #6f8096;
        }

        .gg-field input:focus {
          border-color: #4da3ff;
          box-shadow: 0 0 0 4px rgba(77, 163, 255, 0.1);
        }

        .gg-button-row {
          display: flex;
          gap: 14px;
          margin-top: 30px;
        }

        .gg-button {
          min-height: 52px;
          padding: 0 24px;
          border-radius: 11px;
          border: none;
          cursor: pointer;
          font-size: 15px;
          font-weight: 700;
          transition: 0.2s ease;
        }

        .gg-primary-button {
          flex: 1;
          color: white;
          background: linear-gradient(135deg, #2f82dc, #55aaff);
          box-shadow: 0 12px 28px rgba(46, 130, 220, 0.22);
        }

        .gg-primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 35px rgba(46, 130, 220, 0.32);
        }

        .gg-secondary-button {
          color: #c6d2df;
          background: transparent;
          border: 1px solid rgba(148, 163, 184, 0.25);
        }

        .gg-secondary-button:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .gg-report {
          margin-top: 32px;
          overflow: hidden;
          border-radius: 26px;
          border: 1px solid rgba(126, 160, 197, 0.28);
          background: #0b1727;
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.28);
        }

        .gg-report-header {
          padding: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          background:
            linear-gradient(
              135deg,
              #102842,
              #0d1c30 55%,
              #122b48
            );
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .gg-report-brand {
          color: #78b8ff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .gg-report-header h2 {
          margin: 8px 0 0;
          font-size: 30px;
        }

        .gg-report-header p {
          margin: 8px 0 0;
          color: #91a3b7;
          font-size: 14px;
        }

        .gg-score-highlight {
          min-width: 180px;
          padding: 18px 22px;
          border-radius: 18px;
          text-align: center;
          background: rgba(77, 163, 255, 0.1);
          border: 1px solid rgba(77, 163, 255, 0.28);
        }

        .gg-score-highlight span {
          display: block;
          color: #9cb3ca;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .gg-score-highlight strong {
          display: block;
          margin-top: 6px;
          color: #65b0ff;
          font-size: 38px;
        }

        .gg-report-body {
          padding: 24px;
        }

        .gg-report-card {
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 20px;
        }

        .gg-report-card + .gg-report-card {
          margin-top: 18px;
        }

        .gg-report-section-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 18px;
        }

        .gg-report-section-heading h3 {
          margin: 0;
          font-size: 18px;
        }

        .gg-rating {
          padding: 7px 12px;
          border-radius: 999px;
          border: 1px solid rgba(77, 163, 255, 0.25);
          background: rgba(77, 163, 255, 0.08);
          color: #8fc5ff;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
        }

        .gg-details-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 16px;
        }

        .gg-detail-label {
          color: #71839a;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .gg-detail-value {
          margin-top: 6px;
          color: #f1f5f9;
          font-size: 14px;
          font-weight: 600;
          word-break: break-word;
        }

        .gg-report-main-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.8fr);
          gap: 18px;
          margin-top: 18px;
        }

        .gg-metrics-list {
          display: grid;
          gap: 12px;
        }

        .gg-metric {
          padding: 14px;
          border-radius: 14px;
          background: rgba(5, 14, 26, 0.52);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .gg-metric-top {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
        }

        .gg-metric-name {
          color: #e4edf6;
          font-size: 14px;
          font-weight: 700;
        }

        .gg-metric-meta {
          margin-top: 4px;
          color: #71839a;
          font-size: 11px;
        }

        .gg-score-badge {
          padding: 7px 11px;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 800;
          min-width: 60px;
          text-align: center;
        }

        .gg-progress-track {
          height: 8px;
          margin-top: 12px;
          overflow: hidden;
          border-radius: 999px;
          background: #182638;
        }

        .gg-progress-fill {
          height: 100%;
          border-radius: 999px;
        }

        .gg-metric-status {
          margin-top: 7px;
          text-align: right;
          font-size: 11px;
          font-weight: 700;
        }

        .gg-green {
          color: #42d392;
          background-color: #42d392;
        }

        .gg-blue {
          color: #60a5fa;
          background-color: #60a5fa;
        }

        .gg-amber {
          color: #fbbf24;
          background-color: #fbbf24;
        }

        .gg-red {
          color: #fb7185;
          background-color: #fb7185;
        }

        .gg-score-badge.gg-green,
        .gg-score-badge.gg-blue,
        .gg-score-badge.gg-amber,
        .gg-score-badge.gg-red {
          background: rgba(255, 255, 255, 0.05);
        }

        .gg-score-badge.gg-green {
          color: #42d392;
          border: 1px solid rgba(66, 211, 146, 0.3);
        }

        .gg-score-badge.gg-blue {
          color: #60a5fa;
          border: 1px solid rgba(96, 165, 250, 0.3);
        }

        .gg-score-badge.gg-amber {
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.3);
        }

        .gg-score-badge.gg-red {
          color: #fb7185;
          border: 1px solid rgba(251, 113, 133, 0.3);
        }

        .gg-progress-fill.gg-green,
        .gg-progress-fill.gg-blue,
        .gg-progress-fill.gg-amber,
        .gg-progress-fill.gg-red {
          color: inherit;
        }

        .gg-summary-grid {
          display: grid;
          gap: 14px;
        }

        .gg-summary-card {
          padding: 18px;
          border-radius: 17px;
          min-height: 130px;
        }

        .gg-summary-card h4 {
          margin: 0;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
        }

        .gg-summary-card strong {
          display: block;
          margin-top: 13px;
          font-size: 19px;
        }

        .gg-summary-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
          margin-top: 8px;
        }

        .gg-summary-bottom span {
          font-size: 28px;
          font-weight: 800;
        }

        .gg-summary-green {
          background: rgba(52, 211, 153, 0.06);
          border: 1px solid rgba(52, 211, 153, 0.22);
        }

        .gg-summary-green h4,
        .gg-summary-green span {
          color: #42d392;
        }

        .gg-summary-red {
          background: rgba(251, 113, 133, 0.06);
          border: 1px solid rgba(251, 113, 133, 0.22);
        }

        .gg-summary-red h4,
        .gg-summary-red span {
          color: #fb7185;
        }

        .gg-summary-blue {
          background: rgba(96, 165, 250, 0.06);
          border: 1px solid rgba(96, 165, 250, 0.22);
        }

        .gg-summary-blue h4,
        .gg-summary-blue span {
          color: #60a5fa;
        }

        .gg-summary-description {
          margin-top: 5px;
          color: #8293a7;
          font-size: 11px;
        }

        .gg-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-top: 18px;
        }

        .gg-priority-list {
          display: grid;
          gap: 9px;
          margin-top: 16px;
        }

        .gg-priority-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 11px 13px;
          border-radius: 11px;
          background: rgba(5, 14, 26, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .gg-priority-name {
          color: #d9e3ee;
          font-size: 13px;
        }

        .gg-priority-score {
          font-size: 13px;
          font-weight: 800;
        }

        .gg-recommendation {
          margin-top: 14px;
          padding: 17px;
          border-radius: 13px;
          background: rgba(77, 163, 255, 0.06);
          border-left: 3px solid #4da3ff;
          color: #c5d2df;
          font-size: 14px;
          line-height: 1.7;
        }

        .gg-score-guide {
          margin-top: 18px;
          padding: 15px 18px;
          border-radius: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #8495a9;
          font-size: 12px;
        }

        .gg-guide-items {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .gg-guide-item {
          white-space: nowrap;
        }

        .gg-guide-strong {
          color: #42d392;
        }

        .gg-guide-good {
          color: #60a5fa;
        }

        .gg-guide-focus {
          color: #fbbf24;
        }

        .gg-guide-critical {
          color: #fb7185;
        }

        .gg-report-footer {
          padding: 15px;
          text-align: center;
          color: #65778c;
          font-size: 11px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .gg-download-wrap {
          display: flex;
          justify-content: center;
          margin-top: 28px;
        }

        .gg-download-button {
          min-height: 52px;
          padding: 0 30px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          color: white;
          font-weight: 700;
          background: linear-gradient(135deg, #14966f, #20bf8f);
          box-shadow: 0 12px 30px rgba(32, 191, 143, 0.2);
          transition: 0.2s ease;
        }

        .gg-download-button:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .gg-nav-inner {
            padding: 15px 20px;
          }

          .gg-nav-links {
            gap: 4px;
          }

          .gg-nav-link {
            padding: 8px 10px;
            font-size: 12px;
          }

          .calculator-hero-inner,
          .calculator-content {
            padding-left: 20px;
            padding-right: 20px;
          }

          .gg-details-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .gg-report-main-grid,
          .gg-bottom-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .gg-brand-subtitle {
            display: none;
          }

          .gg-logo-mark {
            width: 42px;
            height: 42px;
          }

          .gg-nav-inner {
            align-items: flex-start;
          }

          .gg-nav-links {
            display: none;
          }

          .calculator-hero-inner {
            padding-top: 50px;
            padding-bottom: 50px;
          }

          .calculator-content {
            padding-top: 28px;
            padding-bottom: 50px;
          }

          .gg-panel {
            padding: 20px;
            border-radius: 18px;
          }

          .gg-form-grid {
            grid-template-columns: 1fr;
          }

          .gg-field-full {
            grid-column: span 1;
          }

          .gg-button-row {
            flex-direction: column;
          }

          .gg-report-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .gg-score-highlight {
            width: 100%;
          }

          .gg-report-body {
            padding: 14px;
          }

          .gg-report-card {
            padding: 16px;
          }

          .gg-details-grid {
            grid-template-columns: 1fr 1fr;
          }

          .gg-score-guide {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 6mm;
          }

          body {
            background: white !important;
          }

          .gg-nav,
          .calculator-hero,
          .gg-panel,
          .gg-download-wrap {
            display: none !important;
          }

          .calculator-page {
            background: white !important;
          }

          .calculator-content {
            max-width: none !important;
            padding: 0 !important;
          }

          .gg-report {
            margin: 0 !important;
            border: 1px solid #d6dce5 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: white !important;
            color: #172033 !important;
            width: 100% !important;
          }

          .gg-report-header {
            padding: 12px 15px !important;
            background: #f2f6fa !important;
            color: #172033 !important;
          }

          .gg-report-header h2 {
            color: #172033 !important;
            font-size: 21px !important;
          }

          .gg-report-header p,
          .gg-report-brand {
            color: #526174 !important;
          }

          .gg-score-highlight {
            min-width: 120px !important;
            padding: 10px !important;
          }

          .gg-report-body {
            padding: 10px !important;
          }

          .gg-report-card {
            padding: 10px !important;
            margin-top: 8px !important;
            background: white !important;
            border-color: #dce3eb !important;
            break-inside: avoid !important;
          }

          .gg-report-card + .gg-report-card {
            margin-top: 8px !important;
          }

          .gg-report-main-grid,
          .gg-bottom-grid {
            gap: 8px !important;
            margin-top: 8px !important;
          }

          .gg-summary-grid {
            gap: 8px !important;
          }

          .gg-summary-card {
            min-height: 0 !important;
            padding: 10px !important;
          }

          .gg-metric {
            padding: 8px !important;
          }

          .gg-metrics-list {
            gap: 6px !important;
          }

          .gg-metric-name,
          .gg-detail-value,
          .gg-report-section-heading h3,
          .gg-summary-card strong {
            color: #172033 !important;
          }

          .gg-metric-meta,
          .gg-detail-label,
          .gg-summary-description,
          .gg-recommendation,
          .gg-score-guide,
          .gg-report-footer {
            color: #526174 !important;
          }

          .gg-priority-list {
            margin-top: 8px !important;
            gap: 5px !important;
          }

          .gg-priority-item {
            padding: 7px 9px !important;
          }

          .gg-recommendation {
            margin-top: 8px !important;
            padding: 10px !important;
            font-size: 11px !important;
            line-height: 1.4 !important;
          }

          .gg-score-guide {
            margin-top: 8px !important;
            padding: 8px !important;
          }

          .gg-progress-track {
            height: 5px !important;
            margin-top: 6px !important;
          }

          .gg-metric-status {
            margin-top: 4px !important;
          }

          .gg-report-footer {
            padding: 7px !important;
          }
        }
      `}</style>

      <main className="calculator-page">
        <nav className="gg-nav">
          <div className="gg-nav-inner">
            <a href="/gg-learnlabs/" className="gg-brand">
              <div className="gg-logo-mark">GG</div>

              <div className="gg-brand-text">
                <span className="gg-brand-title">GG LearnLabs</span>
                <span className="gg-brand-subtitle">
                  LEARN. MEASURE. IMPROVE.
                </span>
              </div>
            </a>

            <div className="gg-nav-links">
              <a
                href="/gg-learnlabs/"
                className="gg-nav-link"
              >
                Home
              </a>

              <a
                href="/gg-learnlabs/calculator/"
                className="gg-nav-link gg-nav-link-active"
              >
                Effectiveness Calculator
              </a>

              <a
                href="/gg-learnlabs/#tools"
                className="gg-nav-link"
              >
                Tools
              </a>
            </div>
          </div>
        </nav>

        <section className="calculator-hero">
          <div className="calculator-hero-inner">
            <div className="calculator-eyebrow">
              GG LearnLabs Tool
            </div>

            <h1>
              Training Effectiveness <span>Calculator</span>
            </h1>

            <p>
              Measure training effectiveness across trainer performance,
              participant feedback, knowledge assessment, learning
              application and attendance.
            </p>
          </div>
        </section>

        <div className="calculator-content">
          <section className="gg-panel">
            <h2 className="gg-section-title">
              Training / Program Details
            </h2>

            <p className="gg-section-description">
              Enter the basic details for the training program being
              evaluated.
            </p>

            <div className="gg-form-grid">
              {fields.map(
                ([label, value, setValue, placeholder, type], index) => (
                  <div
                    key={label}
                    className={`gg-field ${
                      index === 4 ? "gg-field-full" : ""
                    }`}
                  >
                    <label>{label}</label>

                    <input
                      type={type}
                      value={value}
                      onChange={(event) =>
                        setValue(event.target.value)
                      }
                      placeholder={placeholder}
                      min={type === "number" ? "1" : undefined}
                    />
                  </div>
                )
              )}
            </div>
          </section>

          <section className="gg-panel">
            <h2 className="gg-section-title">
              Effectiveness Scores
            </h2>

            <p className="gg-section-description">
              Enter each measure as a score between 0 and 100.
            </p>

            <div className="gg-form-grid">
              {scores.map(([label, value, setValue], index) => (
                <div
                  key={label}
                  className={`gg-field ${
                    index === 4 ? "gg-field-full" : ""
                  }`}
                >
                  <label>{label}</label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(event) =>
                      setValue(event.target.value)
                    }
                    placeholder="Enter score"
                  />
                </div>
              ))}
            </div>

            <div className="gg-button-row">
              <button
                type="button"
                onClick={handleCalculate}
                className="gg-button gg-primary-button"
              >
                Calculate Effectiveness →
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="gg-button gg-secondary-button"
              >
                Reset
              </button>
            </div>
          </section>

          {showResults && (
            <section
              id="training-report"
              className="gg-report"
            >
              <div className="gg-report-header">
                <div>
                  <div className="gg-report-brand">
                    GG LearnLabs
                  </div>

                  <h2>Training Effectiveness Report</h2>

                  <p>
                    Comprehensive training performance summary
                  </p>
                </div>

                <div className="gg-score-highlight">
                  <span>Overall Effectiveness</span>

                  <strong>
                    {overallScore.toFixed(2)}%
                  </strong>
                </div>
              </div>

              <div className="gg-report-body">
                <div className="gg-report-card">
                  <div className="gg-report-section-heading">
                    <h3>Training Details</h3>

                    <span className="gg-rating">
                      {rating}
                    </span>
                  </div>

                  <div className="gg-details-grid">
                    <div>
                      <div className="gg-detail-label">
                        Program
                      </div>

                      <div className="gg-detail-value">
                        {programName}
                      </div>
                    </div>

                    <div>
                      <div className="gg-detail-label">
                        Trainer
                      </div>

                      <div className="gg-detail-value">
                        {trainerName}
                      </div>
                    </div>

                    <div>
                      <div className="gg-detail-label">
                        Training Date
                      </div>

                      <div className="gg-detail-value">
                        {trainingDate}
                      </div>
                    </div>

                    <div>
                      <div className="gg-detail-label">
                        Department
                      </div>

                      <div className="gg-detail-value">
                        {department}
                      </div>
                    </div>

                    <div>
                      <div className="gg-detail-label">
                        Participants
                      </div>

                      <div className="gg-detail-value">
                        {participants}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="gg-report-main-grid">
                  <div className="gg-report-card">
                    <div className="gg-report-section-heading">
                      <div>
                        <div className="gg-detail-label">
                          Performance Analysis
                        </div>

                        <h3 style={{ marginTop: "5px" }}>
                          Metric Breakdown
                        </h3>
                      </div>
                    </div>

                    <div className="gg-metrics-list">
                      {metrics.map((metric) => {
                        const scoreClass = getScoreClass(
                          metric.score
                        );

                        return (
                          <div
                            className="gg-metric"
                            key={metric.name}
                          >
                            <div className="gg-metric-top">
                              <div>
                                <div className="gg-metric-name">
                                  {metric.name}
                                </div>

                                <div className="gg-metric-meta">
                                  Weight: {metric.weight}% ·
                                  Contribution:{" "}
                                  {(
                                    (metric.score *
                                      metric.weight) /
                                    100
                                  ).toFixed(2)}
                                </div>
                              </div>

                              <div
                                className={`gg-score-badge ${scoreClass}`}
                              >
                                {metric.score}%
                              </div>
                            </div>

                            <div className="gg-progress-track">
                              <div
                                className={`gg-progress-fill ${scoreClass}`}
                                style={{
                                  width: `${metric.score}%`,
                                }}
                              />
                            </div>

                            <div
                              className={`gg-metric-status ${scoreClass}`}
                              style={{
                                backgroundColor: "transparent",
                              }}
                            >
                              {getStatus(metric.score)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="gg-summary-grid">
                    <div className="gg-summary-card gg-summary-green">
                      <h4>🏆 Strongest Area</h4>

                      <div className="gg-summary-description">
                        Highest performing measure
                      </div>

                      <div className="gg-summary-bottom">
                        <strong>
                          {strongestMetric.name}
                        </strong>

                        <span>
                          {strongestMetric.score}%
                        </span>
                      </div>
                    </div>

                    <div className="gg-summary-card gg-summary-red">
                      <h4>⚠ Weakest Area</h4>

                      <div className="gg-summary-description">
                        Primary area requiring attention
                      </div>

                      <div className="gg-summary-bottom">
                        <strong>
                          {weakestMetric.name}
                        </strong>

                        <span>
                          {weakestMetric.score}%
                        </span>
                      </div>
                    </div>

                    <div className="gg-summary-card gg-summary-blue">
                      <h4>Final Assessment</h4>

                      <div className="gg-summary-description">
                        Based on weighted effectiveness performance
                      </div>

                      <div className="gg-summary-bottom">
                        <strong>{rating}</strong>

                        <span>
                          {overallScore.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="gg-bottom-grid">
                  <div className="gg-report-card">
                    <div className="gg-report-section-heading">
                      <div>
                        <div className="gg-detail-label">
                          Improvement Planning
                        </div>

                        <h3 style={{ marginTop: "5px" }}>
                          🎯 Priority Areas to Improve
                        </h3>
                      </div>
                    </div>

                    {improvementAreas.length > 0 ? (
                      <div className="gg-priority-list">
                        {improvementAreas.map((metric) => (
                          <div
                            className="gg-priority-item"
                            key={metric.name}
                          >
                            <span className="gg-priority-name">
                              {metric.name}
                            </span>

                            <span
                              className={`gg-priority-score ${getScoreClass(
                                metric.score
                              )}`}
                              style={{
                                backgroundColor: "transparent",
                              }}
                            >
                              {metric.score}%
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="gg-recommendation">
                        Excellent! No priority improvement areas have
                        been identified.
                      </div>
                    )}
                  </div>

                  <div className="gg-report-card">
                    <div className="gg-report-section-heading">
                      <div>
                        <div className="gg-detail-label">
                          Recommended Next Steps
                        </div>

                        <h3 style={{ marginTop: "5px" }}>
                          💡 Smart Recommendation
                        </h3>
                      </div>
                    </div>

                    <div className="gg-recommendation">
                      {getRecommendation()}
                    </div>
                  </div>
                </div>

                <div className="gg-score-guide">
                  <strong>Score Interpretation</strong>

                  <div className="gg-guide-items">
                    <span className="gg-guide-item">
                      <strong className="gg-guide-strong">
                        90–100
                      </strong>{" "}
                      Strong
                    </span>

                    <span className="gg-guide-item">
                      <strong className="gg-guide-good">
                        85–89
                      </strong>{" "}
                      Good
                    </span>

                    <span className="gg-guide-item">
                      <strong className="gg-guide-focus">
                        75–84
                      </strong>{" "}
                      Needs Focus
                    </span>

                    <span className="gg-guide-item">
                      <strong className="gg-guide-critical">
                        Below 75
                      </strong>{" "}
                      Critical
                    </span>
                  </div>
                </div>
              </div>

              <div className="gg-report-footer">
                GG LearnLabs · Training Effectiveness Assessment
              </div>
            </section>
          )}

          {showResults && (
            <div className="gg-download-wrap">
              <button
                type="button"
                onClick={handleDownloadReport}
                className="gg-download-button"
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
