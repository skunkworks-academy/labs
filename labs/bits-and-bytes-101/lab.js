(() => {
  "use strict";

  const STORAGE_KEY = "skunkworks-academy-labs-bit-bytes-101-v1";
  const weights = [128, 64, 32, 16, 8, 4, 2, 1];
  const byteTargets = [
    { value: 178, hint: "Start with 128, then look for the remaining value." },
    { value: 65, hint: "This value is also commonly used for the upper-case letter A in ASCII." },
    { value: 90, hint: "Break the number down into the values above the switches." }
  ];
  const conversionChallenges = [
    { source: 512, from: "bits", to: "bytes", answer: 64, working: "512 bits / 8 = 64 bytes" },
    { source: 12, from: "bytes", to: "bits", answer: 96, working: "12 bytes x 8 = 96 bits" },
    { source: 2048, from: "bits", to: "bytes", answer: 256, working: "2048 bits / 8 = 256 bytes" }
  ];
  const answerKey = {
    q1: { answer: "8", explanation: "A byte is a group of eight bits." },
    q2: { answer: "12bytes", explanation: "96 / 8 = 12, so 96 bits equals 12 bytes." },
    q3: { answer: "32bits", explanation: "4 x 8 = 32, so 4 bytes equals 32 bits." },
    q4: { answer: "right", explanation: "Lower-case b means bit. Upper-case B means byte." },
    q5: { answer: "kib", explanation: "KiB is the unambiguous binary prefix for 1,024 bytes." }
  };
  const defaultProgress = { byte: false, conversion: false, units: false, assessment: false };

  let progress = loadProgress();
  let bits = Array(8).fill(0);
  let byteTargetIndex = 0;
  let conversionIndex = 0;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  function loadProgress() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      if (saved && typeof saved === "object") return { ...defaultProgress, ...saved };
    } catch (_) {
      // Private browsing or an unavailable storage area should not break the lab.
    }
    return { ...defaultProgress };
  }

  function saveProgress() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (_) {
      // The lab remains usable when the browser blocks local storage.
    }
  }

  function setFeedback(element, message, status = "") {
    element.textContent = message;
    if (status) element.dataset.status = status;
    else delete element.dataset.status;
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("en-ZA", { maximumFractionDigits: 2 }).format(value);
  }

  function updateProgress() {
    const completed = Object.values(progress).filter(Boolean).length;
    $("#progressText").textContent = `${completed} of 4 completed`;
    $("#progressFill").style.width = `${completed * 25}%`;

    $$("[data-step-id]").forEach((step) => {
      const complete = Boolean(progress[step.dataset.stepId]);
      step.classList.toggle("is-complete", complete);
      step.setAttribute("aria-label", `${step.textContent.trim()}${complete ? ", complete" : ", not complete"}`);
    });

    const completionPanel = $("#completion");
    completionPanel.hidden = completed !== 4;
    if (completed === 4) updateCompletionRecord();
    saveProgress();
  }

  function updateByteReadout() {
    const binary = bits.join("");
    const decimal = bits.reduce((total, bit, index) => total + bit * weights[index], 0);
    const activeWeights = weights.filter((weight, index) => bits[index] === 1);

    $("#bitString").textContent = binary;
    $("#decimalValue").textContent = String(decimal);
    $("#bitCalculation").textContent = activeWeights.length ? activeWeights.join(" + ") : "No active bits";

    $$(".bit-toggle").forEach((button, index) => {
      const active = bits[index] === 1;
      button.setAttribute("aria-pressed", String(active));
      button.setAttribute("aria-label", `Bit value ${weights[index]}, currently ${active ? "on (1)" : "off (0)"}`);
      button.querySelector("b").textContent = active ? "1" : "0";
      button.querySelector("small").textContent = active ? "on" : "off";
    });
  }

  function setByteTarget() {
    const target = byteTargets[byteTargetIndex];
    $("#byteTarget").innerHTML = `Set the switches to make <strong>${target.value}</strong> in decimal. ${target.hint}`;
    bits = Array(8).fill(0);
    updateByteReadout();
    setFeedback($("#byteFeedback"), "");
  }

  function checkByteTarget() {
    const target = byteTargets[byteTargetIndex];
    const value = bits.reduce((total, bit, index) => total + bit * weights[index], 0);
    const feedback = $("#byteFeedback");

    if (value === target.value) {
      progress.byte = true;
      setFeedback(feedback, `Correct. ${bits.join("")} is ${target.value} because the active position values add to ${target.value}.`, "success");
      updateProgress();
      return;
    }

    const difference = target.value - value;
    const direction = difference > 0 ? "too low" : "too high";
    setFeedback(feedback, `Not yet. Your value is ${value}, which is ${direction}. Recheck which position values should be on.`, "error");
  }

  function renderConversionChallenge() {
    const challenge = conversionChallenges[conversionIndex];
    $("#conversionPosition").textContent = `${conversionIndex + 1} of ${conversionChallenges.length}`;
    $("#conversionPrompt").textContent = `${formatNumber(challenge.source)} ${challenge.from} equals how many ${challenge.to}?`;
    $("#conversionUnit").textContent = `in ${challenge.to}`;
    $("#conversionAnswer").value = "";
    $("#conversionWorking").hidden = true;
    $("#conversionWorking").textContent = challenge.working;
    setFeedback($("#conversionFeedback"), "");
  }

  function checkConversion() {
    const challenge = conversionChallenges[conversionIndex];
    const input = $("#conversionAnswer");
    const feedback = $("#conversionFeedback");
    const answer = Number(input.value);

    if (input.value.trim() === "" || Number.isNaN(answer) || answer < 0) {
      setFeedback(feedback, "Enter a non-negative number before checking your answer.", "error");
      input.focus();
      return;
    }

    if (Math.abs(answer - challenge.answer) < 0.000001) {
      progress.conversion = true;
      setFeedback(feedback, `Correct. ${challenge.working}.`, "success");
      updateProgress();
      return;
    }

    setFeedback(feedback, `Not quite. ${challenge.from === "bits" ? "Bits are grouped into eights, so divide by 8." : "Every byte has 8 bits, so multiply by 8."}`, "error");
  }

  function updateRateCalculator() {
    const input = $("#mbpsInput");
    const output = $("#mbpsResult");
    const value = Number(input.value);
    if (input.value.trim() === "" || Number.isNaN(value) || value < 0) {
      output.textContent = "Enter a valid rate";
      return;
    }
    output.textContent = `${formatNumber(value / 8)} MB/s`;
  }

  function checkUnits() {
    const speed = $("input[name=\"speedQuestion\"]:checked")?.value;
    const prefix = $("input[name=\"prefixQuestion\"]:checked")?.value;
    const feedback = $("#unitsFeedback");

    if (!speed || !prefix) {
      setFeedback(feedback, "Choose an answer for both interpretations before checking.", "error");
      return;
    }

    if (speed === "20" && prefix === "false") {
      progress.units = true;
      setFeedback(feedback, "Correct. 160 Mbps / 8 = 20 MB/s, and KiB - not kB - is the precise binary unit for 1,024 bytes.", "success");
      updateProgress();
      return;
    }

    const guidance = [];
    if (speed !== "20") guidance.push("Divide Mbps by 8 to reach MB/s.");
    if (prefix !== "false") guidance.push("Use KiB when you specifically mean 1,024 bytes; kB conventionally means 1,000 bytes.");
    setFeedback(feedback, guidance.join(" "), "error");
  }

  function markAssessment(event) {
    event.preventDefault();
    let score = 0;
    let unanswered = 0;

    Object.entries(answerKey).forEach(([questionName, key]) => {
      const fieldset = $(`[data-question="${questionName}"]`);
      const selected = $(`input[name="${questionName}"]:checked`);
      const note = fieldset.querySelector(".question-feedback");
      fieldset.classList.remove("is-correct", "is-incorrect");

      if (!selected) {
        unanswered += 1;
        note.textContent = "Choose an answer.";
        fieldset.classList.add("is-incorrect");
        return;
      }

      if (selected.value === key.answer) {
        score += 1;
        note.textContent = `Correct. ${key.explanation}`;
        fieldset.classList.add("is-correct");
      } else {
        note.textContent = `Review this one. ${key.explanation}`;
        fieldset.classList.add("is-incorrect");
      }
    });

    const scoreText = $("#assessmentScore");
    const feedback = $("#assessmentFeedback");
    scoreText.textContent = `${score} / 5 correct`;

    if (unanswered) {
      setFeedback(feedback, "Answer every question before completing the assessment.", "error");
      return;
    }

    if (score >= 4) {
      progress.assessment = true;
      setFeedback(feedback, "Foundation check passed. You can now create your local completion record.", "success");
      updateProgress();
      $("#completion").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setFeedback(feedback, "Keep going. Review the feedback above and try again - you need 4 out of 5 to complete the lab.", "info");
  }

  function updateCompletionRecord() {
    const name = $("#learnerName").value.trim();
    $("#completionLearner").textContent = name || "the learner";
    $("#completionDate").textContent = new Intl.DateTimeFormat("en-ZA", { dateStyle: "long" }).format(new Date());
  }

  function resetLocalProgress() {
    if (!window.confirm("Reset all LAB-DAT-101 progress saved in this browser?")) return;
    progress = { ...defaultProgress };
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (_) {
      // The visual state is still reset when storage cannot be changed.
    }
    setFeedback($("#byteFeedback"), "");
    setFeedback($("#conversionFeedback"), "");
    setFeedback($("#unitsFeedback"), "");
    setFeedback($("#assessmentFeedback"), "");
    $("#assessmentScore").textContent = "";
    $$(".quiz-question").forEach((fieldset) => {
      fieldset.classList.remove("is-correct", "is-incorrect");
      fieldset.querySelector(".question-feedback").textContent = "";
    });
    $$("input[type=radio]").forEach((input) => { input.checked = false; });
    setByteTarget();
    renderConversionChallenge();
    updateProgress();
  }

  function bindEvents() {
    $$(".bit-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.bitIndex);
        bits[index] = bits[index] ? 0 : 1;
        updateByteReadout();
        setFeedback($("#byteFeedback"), "");
      });
    });

    $("#checkByteTarget").addEventListener("click", checkByteTarget);
    $("#resetByte").addEventListener("click", () => {
      bits = Array(8).fill(0);
      updateByteReadout();
      setFeedback($("#byteFeedback"), "");
    });
    $("#newByteTarget").addEventListener("click", () => {
      byteTargetIndex = (byteTargetIndex + 1) % byteTargets.length;
      setByteTarget();
    });

    $("#checkConversion").addEventListener("click", checkConversion);
    $("#conversionAnswer").addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        checkConversion();
      }
    });
    $("#nextConversion").addEventListener("click", () => {
      conversionIndex = (conversionIndex + 1) % conversionChallenges.length;
      renderConversionChallenge();
    });
    $("#showWorking").addEventListener("click", () => {
      const working = $("#conversionWorking");
      working.hidden = !working.hidden;
    });

    $("#mbpsInput").addEventListener("input", updateRateCalculator);
    $("#checkUnits").addEventListener("click", checkUnits);
    $("#assessmentForm").addEventListener("submit", markAssessment);
    $("#resetProgress").addEventListener("click", resetLocalProgress);
    $("#updateCompletionName").addEventListener("click", updateCompletionRecord);
    $("#learnerName").addEventListener("input", updateCompletionRecord);
    $("#printCompletion").addEventListener("click", () => window.print());
  }

  function init() {
    bindEvents();
    setByteTarget();
    renderConversionChallenge();
    updateRateCalculator();
    updateProgress();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
