(() => {
  "use strict";

  const STORAGE_KEY = "skunkworks-academy-labs-ipv4-subnetting-101-v1";
  const prefixData = {
    24: { mask: "255.255.255.0", finalBinary: "00000000", networkBits: 24, hostBits: 8, total: 256, usable: 254 },
    25: { mask: "255.255.255.128", finalBinary: "10000000", networkBits: 25, hostBits: 7, total: 128, usable: 126 },
    26: { mask: "255.255.255.192", finalBinary: "11000000", networkBits: 26, hostBits: 6, total: 64, usable: 62 },
    27: { mask: "255.255.255.224", finalBinary: "11100000", networkBits: 27, hostBits: 5, total: 32, usable: 30 },
    28: { mask: "255.255.255.240", finalBinary: "11110000", networkBits: 28, hostBits: 4, total: 16, usable: 14 },
    30: { mask: "255.255.255.252", finalBinary: "11111100", networkBits: 30, hostBits: 2, total: 4, usable: 2 }
  };
  const hostChallenges = [
    { prefix: 27, hostBits: 5, answer: 30, working: "A /27 leaves 32 - 27 = 5 host bits. 2 to the power of 5 = 32 total addresses. 32 - 2 = 30 ordinary usable hosts." },
    { prefix: 28, hostBits: 4, answer: 14, working: "A /28 leaves 4 host bits. 2 to the power of 4 = 16 total addresses. 16 - 2 = 14 ordinary usable hosts." },
    { prefix: 26, hostBits: 6, answer: 62, working: "A /26 leaves 6 host bits. 2 to the power of 6 = 64 total addresses. 64 - 2 = 62 ordinary usable hosts." },
    { prefix: 30, hostBits: 2, answer: 2, working: "A /30 leaves 2 host bits. 2 to the power of 2 = 4 total addresses. 4 - 2 = 2 ordinary usable hosts." }
  ];
  const answerKey = {
    q1: { answer: "32", explanation: "IPv4 is fixed at four octets, each with eight bits: 4 x 8 = 32." },
    q2: { answer: "network", explanation: "A mask uses 1s for the network prefix and 0s for the host portion." },
    q3: { answer: "192", explanation: "The final /26 mask octet is 11000000, which equals 192." },
    q4: { answer: "6", explanation: "32 - 26 = 6 host bits remain in a /26." },
    q5: { answer: "64", explanation: "Six host bits produce 2 to the power of 6, or 64, total addresses." },
    q6: { answer: "62", explanation: "For an ordinary LAN subnet, reserve the all-zero network address and all-one broadcast address: 64 - 2 = 62." },
    q7: { answer: "64", explanation: "A /26 has blocks of 64 in the final octet: 0, 64, 128 and 192. 77 sits in the 64-127 block." }
  };
  const defaultProgress = { structure: false, mask: false, subnet: false, hosts: false, assessment: false };

  let progress = loadProgress();
  let fourthOctet = 77;
  let hostChallengeIndex = 0;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  function loadProgress() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      if (saved && typeof saved === "object") return { ...defaultProgress, ...saved };
    } catch (_) {
      // Private browsing or unavailable storage should not break the lab.
    }
    return { ...defaultProgress };
  }

  function saveProgress() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (_) {
      // The lab is still fully usable when browser storage is blocked.
    }
  }

  function setFeedback(element, message, status = "") {
    element.textContent = message;
    if (status) element.dataset.status = status;
    else delete element.dataset.status;
  }

  function ipv4Address(lastOctet) {
    return ["192", "168", "10", String(lastOctet)].join(".");
  }

  function binaryOctet(value) {
    return Number(value).toString(2).padStart(8, "0");
  }

  function binaryIpv4(lastOctet) {
    return [192, 168, 10, lastOctet].map(binaryOctet).join(".");
  }

  function updateProgress() {
    const completed = Object.values(progress).filter(Boolean).length;
    $("#progressText").textContent = String(completed) + " of 5 completed";
    $("#progressFill").style.width = String(completed * 20) + "%";

    $$("[data-step-id]").forEach((step) => {
      const complete = Boolean(progress[step.dataset.stepId]);
      step.classList.toggle("is-complete", complete);
      step.setAttribute("aria-label", step.textContent.trim() + (complete ? ", complete" : ", not complete"));
    });

    $("#completion").hidden = completed !== 5;
    if (completed === 5) updateCompletionRecord();
    saveProgress();
  }

  function checkIpv4() {
    const input = $("#ipv4Answer");
    const answer = Number(input.value);
    if (input.value.trim() === "" || Number.isNaN(answer)) {
      setFeedback($("#ipv4Feedback"), "Enter a number before checking your answer.", "error");
      input.focus();
      return;
    }
    if (answer === 32) {
      progress.structure = true;
      setFeedback($("#ipv4Feedback"), "Correct. IPv4 has four 8-bit octets: 4 x 8 = 32 bits.", "success");
      updateProgress();
      return;
    }
    setFeedback($("#ipv4Feedback"), "Not yet. Count the four octets and multiply each group of 8 bits: 4 x 8.", "error");
  }

  function renderMask(prefix) {
    const data = prefixData[prefix];
    $("#selectedPrefix").textContent = "/" + String(prefix);
    $("#networkBits").textContent = String(data.networkBits);
    $("#hostBits").textContent = String(data.hostBits);
    $("#decimalMask").textContent = data.mask;
    $("#maskBinary").textContent = "11111111.11111111.11111111." + data.finalBinary;
    $(".mask-note").innerHTML = "For a /" + String(prefix) + ", the first " + String(data.networkBits) + " bits are <code>1</code>s. The remaining " + String(data.hostBits) + " bits are <code>0</code>s. The final octet is <code>" + data.finalBinary + "</code>, which equals <code>" + data.mask.split(".").pop() + "</code> in decimal.";

    const bitMap = $("#maskBitMap");
    bitMap.replaceChildren();
    for (let octet = 0; octet < 4; octet += 1) {
      const group = document.createElement("span");
      group.className = "mask-octet";
      for (let bit = 0; bit < 8; bit += 1) {
        const index = octet * 8 + bit;
        const cell = document.createElement("b");
        const network = index < data.networkBits;
        cell.className = network ? "mask-bit mask-bit--network" : "mask-bit mask-bit--host";
        cell.textContent = network ? "1" : "0";
        group.append(cell);
      }
      bitMap.append(group);
    }
    bitMap.setAttribute("aria-label", "/" + String(prefix) + " subnet mask: " + String(data.networkBits) + " network bits and " + String(data.hostBits) + " host bits");
  }

  function checkMaskMeaning() {
    const selected = $("input[name=\"maskMeaning\"]:checked")?.value;
    if (!selected) {
      setFeedback($("#maskFeedback"), "Choose an interpretation before checking.", "error");
      return;
    }
    if (selected === "network-host") {
      progress.mask = true;
      setFeedback($("#maskFeedback"), "Correct. The mask is a label for address positions: 1s are the network prefix and 0s are the host portion.", "success");
      updateProgress();
      return;
    }
    setFeedback($("#maskFeedback"), "Review the bit map. CIDR masks use leading 1s for the network prefix and trailing 0s for host positions.", "error");
  }

  function getFourthOctet() {
    const raw = $("#fourthOctetInput").value.trim();
    const value = Number(raw);
    if (raw === "" || !Number.isInteger(value) || value < 0 || value > 255) return null;
    return value;
  }

  function renderSubnetBits(lastOctet) {
    const bits = binaryIpv4(lastOctet).replaceAll(".", "");
    const diagram = $("#subnetBitDiagram");
    diagram.replaceChildren();
    for (let octet = 0; octet < 4; octet += 1) {
      const group = document.createElement("span");
      group.className = "subnet-bit-octet";
      for (let bit = 0; bit < 8; bit += 1) {
        const index = octet * 8 + bit;
        const cell = document.createElement("b");
        cell.className = index < 26 ? "address-bit address-bit--network" : "address-bit address-bit--host";
        cell.textContent = bits[index];
        group.append(cell);
      }
      diagram.append(group);
    }
  }

  function renderSubnetBlocks(start, end, current) {
    const grid = $("#subnetBlocks");
    grid.replaceChildren();
    [0, 64, 128, 192].forEach((networkStart) => {
      const block = document.createElement("article");
      block.className = "subnet-block";
      if (networkStart === start) block.classList.add("is-current");
      const networkEnd = networkStart + 63;
      const label = "192.168.10." + String(networkStart) + "/26";
      block.innerHTML = "<span>" + label + "</span><strong>." + String(networkStart) + " - ." + String(networkEnd) + "</strong><small>Network ." + String(networkStart) + " · Broadcast ." + String(networkEnd) + "</small>";
      if (networkStart === current) block.setAttribute("aria-current", "true");
      grid.append(block);
    });
  }

  function renderSubnet() {
    const inputValue = getFourthOctet();
    if (inputValue === null) {
      setFeedback($("#boundaryFeedback"), "Enter a whole number from 0 through 255 for the final octet.", "error");
      return;
    }
    fourthOctet = inputValue;
    const blockSize = 64;
    const start = Math.floor(fourthOctet / blockSize) * blockSize;
    const end = start + blockSize - 1;
    const address = ipv4Address(fourthOctet);
    const network = ipv4Address(start);
    const broadcast = ipv4Address(end);
    const usableStart = ipv4Address(start + 1);
    const usableEnd = ipv4Address(end - 1);

    $("#focusFourth").textContent = String(fourthOctet);
    $("#addressBinary").textContent = binaryIpv4(fourthOctet);
    $("#subnetRange").textContent = String(start) + "-" + String(end);
    $("#networkAddress").textContent = network;
    $("#hostRange").textContent = usableStart + " - " + usableEnd;
    $("#broadcastAddress").textContent = broadcast;
    $("#subnetWorking").textContent = String(fourthOctet) + " falls in the " + String(start) + "-" + String(end) + " block because floor(" + String(fourthOctet) + " / 64) x 64 = " + String(start) + ".";
    $("#boundaryQuestionText").textContent = "For " + address + "/26, what is the network address?";
    renderSubnetBits(fourthOctet);
    renderSubnetBlocks(start, end, start);

    const selected = $("input[name=\"boundaryQuestion\"]:checked");
    if (selected && Number(selected.value) !== start) setFeedback($("#boundaryFeedback"), "", "");
  }

  function checkBoundary() {
    const selected = $("input[name=\"boundaryQuestion\"]:checked")?.value;
    const current = getFourthOctet();
    if (current === null) {
      setFeedback($("#boundaryFeedback"), "Enter a valid final octet from 0 through 255 first.", "error");
      return;
    }
    if (!selected) {
      setFeedback($("#boundaryFeedback"), "Choose a network address before checking.", "error");
      return;
    }
    const start = Math.floor(current / 64) * 64;
    if (Number(selected) === start) {
      progress.subnet = true;
      setFeedback($("#boundaryFeedback"), "Correct. The /26 block size is 64, so " + ipv4Address(current) + " belongs to " + ipv4Address(start) + " through " + ipv4Address(start + 63) + ".", "success");
      updateProgress();
      return;
    }
    setFeedback($("#boundaryFeedback"), "Not yet. Work in blocks of 64 in the final octet: 0, 64, 128 and 192. Find the block that contains ." + String(current) + ".", "error");
  }

  function renderHostChallenge() {
    const challenge = hostChallenges[hostChallengeIndex];
    $("#hostChallengePosition").textContent = String(hostChallengeIndex + 1) + " of " + String(hostChallenges.length);
    $("#hostChallengePrompt").textContent = "An ordinary /" + String(challenge.prefix) + " subnet has " + String(challenge.hostBits) + " host bits. How many usable host addresses does it have?";
    $("#hostChallengeAnswer").value = "";
    $("#hostChallengeWorking").textContent = challenge.working;
    $("#hostChallengeWorking").hidden = true;
    setFeedback($("#hostFeedback"), "");
  }

  function checkHostChallenge() {
    const challenge = hostChallenges[hostChallengeIndex];
    const input = $("#hostChallengeAnswer");
    const answer = Number(input.value);
    if (input.value.trim() === "" || !Number.isInteger(answer) || answer < 0) {
      setFeedback($("#hostFeedback"), "Enter a whole number of usable hosts before checking.", "error");
      input.focus();
      return;
    }
    if (answer === challenge.answer) {
      progress.hosts = true;
      setFeedback($("#hostFeedback"), "Correct. " + challenge.working, "success");
      updateProgress();
      return;
    }
    setFeedback($("#hostFeedback"), "Not yet. First calculate total addresses as 2 to the host-bit count, then subtract 2 for the conventional network and broadcast addresses.", "error");
  }

  function markAssessment(event) {
    event.preventDefault();
    let score = 0;
    let unanswered = 0;

    Object.entries(answerKey).forEach(([questionName, key]) => {
      const fieldset = $("[data-question=\"" + questionName + "\"]");
      const selected = $("input[name=\"" + questionName + "\"]:checked");
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
        note.textContent = "Correct. " + key.explanation;
        fieldset.classList.add("is-correct");
      } else {
        note.textContent = "Review this one. " + key.explanation;
        fieldset.classList.add("is-incorrect");
      }
    });

    $("#assessmentScore").textContent = String(score) + " / 7 correct";
    if (unanswered) {
      setFeedback($("#assessmentFeedback"), "Answer every question before completing the assessment.", "error");
      return;
    }
    if (score >= 6) {
      progress.assessment = true;
      setFeedback($("#assessmentFeedback"), "Subnetting foundation check passed. You can now create your local completion record.", "success");
      updateProgress();
      $("#completion").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setFeedback($("#assessmentFeedback"), "Keep going. Review the feedback above and try again - you need at least 6 out of 7.", "info");
  }

  function updateCompletionRecord() {
    const name = $("#learnerName").value.trim();
    $("#completionLearner").textContent = name || "the learner";
    $("#completionDate").textContent = new Intl.DateTimeFormat("en-ZA", { dateStyle: "long" }).format(new Date());
  }

  function resetLocalProgress() {
    if (!window.confirm("Reset all LAB-NET-101 progress saved in this browser?")) return;
    progress = { ...defaultProgress };
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (_) {
      // Visual state is still reset when storage is unavailable.
    }
    $("#ipv4Answer").value = "";
    $("#prefixSelector").value = "26";
    $("#fourthOctetInput").value = "77";
    fourthOctet = 77;
    hostChallengeIndex = 0;
    $$("input[type=radio]").forEach((input) => { input.checked = false; });
    $$(".quiz-question").forEach((fieldset) => {
      fieldset.classList.remove("is-correct", "is-incorrect");
      fieldset.querySelector(".question-feedback").textContent = "";
    });
    $("#assessmentScore").textContent = "";
    ["#ipv4Feedback", "#maskFeedback", "#boundaryFeedback", "#hostFeedback", "#assessmentFeedback"].forEach((selector) => setFeedback($(selector), ""));
    renderMask(26);
    renderSubnet();
    renderHostChallenge();
    updateProgress();
  }

  function bindEvents() {
    $("#checkIpv4").addEventListener("click", checkIpv4);
    $("#ipv4Answer").addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        checkIpv4();
      }
    });
    $("#prefixSelector").addEventListener("change", (event) => renderMask(Number(event.target.value)));
    $("#checkMaskMeaning").addEventListener("click", checkMaskMeaning);
    $("#fourthOctetInput").addEventListener("input", renderSubnet);
    $("#checkBoundary").addEventListener("click", checkBoundary);
    $("#nextHostChallenge").addEventListener("click", () => {
      hostChallengeIndex = (hostChallengeIndex + 1) % hostChallenges.length;
      renderHostChallenge();
    });
    $("#showHostWorking").addEventListener("click", () => {
      $("#hostChallengeWorking").hidden = !$("#hostChallengeWorking").hidden;
    });
    $("#checkHostChallenge").addEventListener("click", checkHostChallenge);
    $("#hostChallengeAnswer").addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        checkHostChallenge();
      }
    });
    $("#assessmentForm").addEventListener("submit", markAssessment);
    $("#resetProgress").addEventListener("click", resetLocalProgress);
    $("#updateCompletionName").addEventListener("click", updateCompletionRecord);
    $("#learnerName").addEventListener("input", updateCompletionRecord);
    $("#printCompletion").addEventListener("click", () => window.print());
  }

  function init() {
    bindEvents();
    renderMask(26);
    renderSubnet();
    renderHostChallenge();
    updateProgress();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
