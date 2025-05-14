let quiz = [];
let currentIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn"); // ← botón reiniciar
const scoreDisplay = document.getElementById("score");
const descriptionBox = document.getElementById("description");
const progressBar = document.getElementById("progress-bar");

function updateProgress() {
  const percent = ((currentIndex) / quiz.length) * 100;
  progressBar.style.width = percent + "%";
}

function showQuestion(index) {
  const q = quiz[index];
  questionText.textContent = `Pregunta #${q.id}: ${q.question}`;
  answersContainer.innerHTML = "";
  descriptionBox.style.opacity = 0;
  nextBtn.style.display = "none";
  restartBtn.style.display = "none";
  scoreDisplay.textContent = `Puntaje: ${score}`;
  updateProgress();

  q.answers.forEach((answerObj, i) => {
    const btn = document.createElement("button");
    btn.textContent = answerObj.text;
    btn.onclick = () => {
      if (i === q.correct_answer) {
        btn.style.backgroundColor = "#5F8B4C"; // verde
        descriptionBox.style.opacity = 1;
        descriptionBox.textContent = `¡Perfecto! ${q.description}` || "Sin descripción.";
        score += q.points;
      } else {
          btn.style.backgroundColor = "#BF3131"; // rojo
          descriptionBox.style.opacity = 1;
          descriptionBox.textContent = `No, no es asi :/ ${q.description}` || "Sin descripción.";
      }

      descriptionBox.textContent = q.description || "Sin descripción.";
      descriptionBox.style.display = "block";

      Array.from(answersContainer.children).forEach(b => b.disabled = true);
      nextBtn.style.display = "inline-block";
    };
    answersContainer.appendChild(btn);
  });
}

nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < quiz.length) {
    showQuestion(currentIndex);
  } else {
    questionText.textContent = "¡Has completado el quiz!";
    questionText.style.fontSize = "1em";
    answersContainer.innerHTML = "";
    descriptionBox.style.display = "none";
    nextBtn.style.display = "none";
    progressBar.style.width = "100%";
    if (score < 50){
        scoreDisplay.textContent = `No es lo que se esperaba... ¡Intenta de nuevo!\nTu puntaje final es de: ${score} puntos.`;
    } else if (score >= 50 && score < 70){
        scoreDisplay.textContent = `¡Buen trabajo! Pero aún puedes mejorar.\nTu puntaje final es de: ${score} puntos.`;
    } else {
        scoreDisplay.textContent = `¡Excelente! Has dominado el tema.\nTu puntaje final es de: ${score} puntos.`;
    }
    scoreDisplay.style.fontSize = "2em";
    restartBtn.style.display = "inline-block"; // ← mostrar botón al final
  }
};

restartBtn.onclick = () => {
  currentIndex = 0;
  score = 0;
  showQuestion(currentIndex);
};

fetch('./utils/quiz.json')
  .then(res => res.json())
  .then(data => {
    quiz = data;
    showQuestion(currentIndex);
  })
  .catch(err => {
    questionText.textContent = "Error cargando las preguntas 😢";
    console.error(err);
  });

const welcomeScreen = document.getElementById("welcome-screen");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");

startBtn.onclick = () => {
    welcomeScreen.classList.add("fade-out");
  
    setTimeout(() => {
      welcomeScreen.style.display = "none";
      quizContainer.style.display = "block";
    }, 600);
};
  