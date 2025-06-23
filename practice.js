
    const questions = [
      { question: "What is the normal range of adult respiratory rate?", options: ["12–20/min", "20–30/min", "10–18/min", "8–16/min"], correct: "12–20/min" },
      { question: "Which vitamin is essential for blood clotting?", options: ["Vitamin A", "Vitamin K", "Vitamin D", "Vitamin C"], correct: "Vitamin K" },
      { question: "What does ECG stand for?", options: ["Electrocardiogram", "Endocardial graph", "Electron control grid", "Electrochemical gradient"], correct: "Electrocardiogram" },
      { question: "Which organ is affected by hepatitis?", options: ["Kidney", "Liver", "Heart", "Lungs"], correct: "Liver" },
      { question: "What is the full form of BCG vaccine?", options: ["Bacille Calmette-Guerin", "Bacterial Common Growth", "Basic Clinical Growth", "Bacterial Control Group"], correct: "Bacille Calmette-Guerin" },
      { question: "Which blood group is universal donor?", options: ["A+", "B-", "O-", "AB+"], correct: "O-" },
      { question: "What is the normal blood pH level?", options: ["6.5", "7.0", "7.4", "8.0"], correct: "7.4" },
      { question: "Which part of the brain controls balance?", options: ["Cerebrum", "Cerebellum", "Medulla", "Thalamus"], correct: "Cerebellum" },
      { question: "What is the antidote for heparin?", options: ["Vitamin K", "Protamine sulfate", "Atropine", "Naloxone"], correct: "Protamine sulfate" },
      { question: "Which infection is prevented by the MMR vaccine?", options: ["Measles, Mumps, Rubella", "Malaria, Mumps, Rabies", "Measles, Malaria, Rubella", "Mumps, Malaria, Rickets"], correct: "Measles, Mumps, Rubella" },
      { question: "What is the normal range of hemoglobin for adult females?", options: ["10–12 g/dL", "12–16 g/dL", "14–18 g/dL", "16–20 g/dL"], correct: "12–16 g/dL" },
      { question: "What is the incubation period of COVID-19?", options: ["1–3 days", "2–5 days", "2–14 days", "5–21 days"], correct: "2–14 days" },
      { question: "Which cranial nerve is responsible for smell?", options: ["Optic nerve", "Trigeminal nerve", "Olfactory nerve", "Vagus nerve"], correct: "Olfactory nerve" },
      { question: "What is the SI unit of blood pressure?", options: ["mmHg", "cmHg", "kPa", "atm"], correct: "mmHg" },
      { question: "Which electrolyte imbalance causes tetany?", options: ["Hyperkalemia", "Hypokalemia", "Hypocalcemia", "Hypernatremia"], correct: "Hypocalcemia" }
    ];

    let currentQuestion = 0;
    let score = 0;
    let timer;
    let timeLeft = 15;
    const userAnswers = [];

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const nextBtn = document.getElementById("nextBtn");
    const resultBox = document.getElementById("result");
    const scoreText = document.getElementById("scoreText");
    const timeDisplay = document.getElementById("time");

    function startTimer() {
      clearInterval(timer);
      timeLeft = 15;
      timeDisplay.textContent = timeLeft;
      timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timer);
          recordAnswerAndNext();
        }
      }, 1000);
    }

    function loadQuestion() {
      const q = questions[currentQuestion];
      questionEl.textContent = `${currentQuestion + 1}. ${q.question}`;
      optionsEl.innerHTML = "";
      q.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => selectOption(li));
        optionsEl.appendChild(li);
      });
      startTimer();
    }

    function selectOption(selectedLi) {
      const allLis = document.querySelectorAll("#options li");
      allLis.forEach(li => li.classList.remove("selected"));
      selectedLi.classList.add("selected");
    }

    function recordAnswerAndNext() {
      const selected = document.querySelector(".selected");
      const answer = selected ? selected.textContent : "No Answer";
      userAnswers.push(answer);
      if (answer === questions[currentQuestion].correct) score++;
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }

    nextBtn.addEventListener("click", () => {
      clearInterval(timer);
      recordAnswerAndNext();
    });

    function showResult() {
      clearInterval(timer);
      document.getElementById("quiz").classList.add("hidden");
      resultBox.classList.remove("hidden");
      document.getElementById("quizBox").scrollTo({ top: 0, behavior: "smooth" });
      scoreText.textContent = `You scored ${score} out of ${questions.length}`;
      const existingBox = document.querySelector(".solution-box");
      if (existingBox) existingBox.remove();

      const solutionBox = document.createElement("div");
      solutionBox.classList.add("solution-box");

      questions.forEach((q, index) => {
        const item = document.createElement("div");
        item.classList.add("solution-item");
        const userAns = userAnswers[index] || "No Answer";
        const isCorrect = userAns === q.correct;
        item.innerHTML = `
          <p><strong>Q${index + 1}:</strong> ${q.question}</p>
          <p>Your Answer: <span class="${isCorrect ? 'correct' : 'incorrect'}">${userAns}</span></p>
          <p>Correct Answer: <span class="correct">${q.correct}</span></p>
        `;
        solutionBox.appendChild(item);
      });
      resultBox.appendChild(solutionBox);
    }

    loadQuestion();
