(function () {
  "use strict";

  const body = document.body;
  const labCode = body.dataset.labCode || "academy-analysis-lab";
  const storageKey = `skunkworks-academy-${labCode.toLowerCase()}-v1`;
  const stepKeys = Array.from(document.querySelectorAll("[data-progress-step]")).map((element) => element.dataset.progressStep);
  const defaultProgress = Object.fromEntries(stepKeys.map((key) => [key, false]));

  function $(selector) { return document.querySelector(selector); }
  function $$(selector) { return Array.from(document.querySelectorAll(selector)); }

  function loadProgress() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey));
      if (saved && typeof saved === "object") return { ...defaultProgress, ...saved };
    } catch (_) {
      // The lab remains usable if browser storage is blocked.
    }
    return { ...defaultProgress };
  }

  let progress = loadProgress();

  function saveProgress() {
    try { window.localStorage.setItem(storageKey, JSON.stringify(progress)); } catch (_) { /* no-op */ }
  }

  function feedback(element, message, status = "") {
    if (!element) return;
    element.textContent = message;
    element.className = `feedback ${status}`.trim();
  }

  function updateProgress() {
    const complete = stepKeys.filter((key) => progress[key]).length;
    const total = stepKeys.length;
    const text = $("#progressText");
    const fill = $("#progressFill");
    if (text) text.textContent = `${complete} of ${total} completed`;
    if (fill) fill.style.width = `${(complete / total) * 100}%`;
    $$("[data-progress-step]").forEach((element) => {
      const key = element.dataset.progressStep;
      const icon = element.querySelector(".step-icon");
      element.classList.toggle("is-complete", Boolean(progress[key]));
      if (icon) icon.textContent = progress[key] ? "✓" : icon.dataset.stepNumber;
    });
    saveProgress();
  }

  function checkCheckpoint(button) {
    const key = button.dataset.checkpoint;
    const fieldset = document.querySelector(`[data-checkpoint="${key}"]`);
    const output = document.getElementById(`${key}Feedback`);
    if (!fieldset) return;
    const selected = fieldset.querySelector("input:checked");
    fieldset.classList.remove("is-correct", "is-incorrect");
    if (!selected) {
      fieldset.classList.add("is-incorrect");
      feedback(output, "Choose an answer before checking the checkpoint.", "error");
      return;
    }
    if (selected.value === fieldset.dataset.answer) {
      fieldset.classList.add("is-correct");
      progress[key] = true;
      feedback(output, fieldset.dataset.success || "Checkpoint passed.", "success");
      updateProgress();
      return;
    }
    fieldset.classList.add("is-incorrect");
    feedback(output, fieldset.dataset.retry || "Not yet. Review the evidence and try again.", "error");
  }

  function markAssessment(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const questions = $$("[data-quiz-answer]");
    const passScore = Number(form.dataset.passScore || questions.length);
    let score = 0;
    let unanswered = 0;

    questions.forEach((question) => {
      const selected = question.querySelector("input:checked");
      const note = question.querySelector(".question-feedback");
      question.classList.remove("is-correct", "is-incorrect");
      if (!selected) {
        unanswered += 1;
        question.classList.add("is-incorrect");
        if (note) note.textContent = "Choose an answer.";
        return;
      }
      if (selected.value === question.dataset.quizAnswer) {
        score += 1;
        question.classList.add("is-correct");
        if (note) note.textContent = `Correct. ${question.dataset.explanation || ""}`;
      } else {
        question.classList.add("is-incorrect");
        if (note) note.textContent = `Review this one. ${question.dataset.explanation || ""}`;
      }
    });

    const scoreOutput = $("#assessmentScore");
    const resultOutput = $("#assessmentFeedback");
    if (scoreOutput) scoreOutput.textContent = `${score} / ${questions.length} correct`;
    if (unanswered) {
      feedback(resultOutput, "Answer every question before completing the assessment.", "error");
      return;
    }
    if (score >= passScore) {
      progress.assessment = true;
      feedback(resultOutput, `Knowledge check passed. ${score} of ${questions.length} correct. You may now create a local completion record.`, "success");
      updateProgress();
      $("#completion")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    feedback(resultOutput, `Keep going. You need ${passScore} of ${questions.length}; review the feedback and retry.`, "info");
  }

  function updateCompletionRecord() {
    const input = $("#learnerName");
    const learner = $("#completionLearner");
    const date = $("#completionDate");
    if (learner) learner.textContent = input?.value.trim() || "the learner";
    if (date) date.textContent = new Intl.DateTimeFormat("en-ZA", { dateStyle: "long" }).format(new Date());
  }

  function resetProgress() {
    if (!window.confirm(`Reset all ${labCode} progress saved in this browser?`)) return;
    progress = { ...defaultProgress };
    try { window.localStorage.removeItem(storageKey); } catch (_) { /* no-op */ }
    $$("input[type=radio]").forEach((input) => { input.checked = false; });
    $$(".choice-fieldset, .quiz-question").forEach((element) => element.classList.remove("is-correct", "is-incorrect"));
    $$(".feedback, .question-feedback").forEach((element) => { element.textContent = ""; element.className = element.classList.contains("question-feedback") ? "question-feedback" : "feedback"; });
    const score = $("#assessmentScore");
    if (score) score.textContent = "";
    updateProgress();
  }

  function bindEvents() {
    $$("[data-checkpoint-action]").forEach((button) => button.addEventListener("click", () => checkCheckpoint(button)));
    const assessment = $("#assessmentForm");
    if (assessment) assessment.addEventListener("submit", markAssessment);
    $("#resetProgress")?.addEventListener("click", resetProgress);
    $("#learnerName")?.addEventListener("input", updateCompletionRecord);
    $("#updateCompletionName")?.addEventListener("click", updateCompletionRecord);
    $("#printCompletion")?.addEventListener("click", () => window.print());
  }

  bindEvents();
  updateCompletionRecord();
  updateProgress();
}());
