const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "A organela relacionada com a respiração celular é?",
    answers: [
      { text: "complexo golgiense", correct: false },
      { text: "lisossomo", correct: false },
      { text: "mitocôndria", correct: true },
      { text: "cloroplasto", correct: false }
    ]
  },
  {
    question: "Organismos que possuem células procariontes?",
    answers: [
      { text: "Bactérias e cianobactérias", correct: true },
      { text: "Fungos e protozoários", correct: false },
      { text: "Algas e bactérias", correct: false },
      { text: "Fungos e cianobactérias", correct: false }
    ]
  },
  {
    question: 'Bactérias são organismos que possuem o corpo formado por uma única célula, senodo portanto:"',
    answers: [
      { text: 'unicelulares', correct: true },
      { text: 'procariontes', correct: false },
      { text: 'eucariontes', correct: false },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: 'Os componentes celulares que estão presnetes tanto em células de eucariontes como de procariontes são membrana palsmatica e mitocôndrias',
    answers: [
      { text: "Verdadeiro", correct: false },
      { text: "Falso", correct: true }
    ]
  },
  {
    question: 'É correto afirmar que uma cé~uça eucarionte é formada basicamente por:',
    answers: [
      { text: 'parede celular,ribossomos e citoplama', correct: false },
      { text: 'membrana plasmática,citoplasma e núcleo', correct: true },
      { text: 'citoplasma,material genético e pereda celular', correct: false },
      { text: 'cápsula,membrana palsmática e DNA', correct: false }
    ]
  },
  {
    question: 'Dos grupos de organismo citados a seguir, qual apresenta organismos exclusivamente multicelulares?',
    answers: [
      { text: 'Algas', correct: false },
      { text: 'Plantas', correct: true },
      { text: 'Fungos', correct: false },
      { text: 'Bactérias', correct: false },
    ]
  },
  {
    question: 'Marque a alternativa que indica corretamente um organismo que apresente célula procariótica',
    answers: [
      { text: 'Fungo', correct: false },
      { text: 'Alga', correct: false },
      { text: 'Protozoário', correct: false },
      { text: 'Arqueas', correct: true },
    ]
  },
]

