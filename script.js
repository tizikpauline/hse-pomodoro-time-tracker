const form = document.querySelector("form")
const tasks = document.querySelector("ul")
const progress = document.querySelector(".progress")
const WORK_TIME = 2000
// const WORK_TIME = 25 * 60 * 1000

function startTimer(e) {
  // По умолчанию при нажатии на "Ввод" форма перезагружает страницу
  //  Ниже мы гвоорим форме: не делай действия по умолчанию
  e.preventDefault()

  //  Мы слушаем события (onclick, onsubmit, onfocus и т.д.) на элементах Target – это тот объект, на котором произошла событие.
  // target  – это тот объект, на котором произошло событие (e)
  // form.onsubmit = startTimer – вот тут мы "вешаем" событие
  // Мы знаем, что внутри формы лежит инпут, а событие submit происходит у формы
  // Поэтому мы получаем доступ к инпуту через событие и форму
  const input = e.target.querySelector("input")
  input.disabled = true

  const key = Date.now()
  localStorage.setItem(key, input.value)

  progress.style.width = "100vw"
  progress.style.transitionDuration = WORK_TIME + "ms"

  setTimeout(function () {
    input.disabled = false
    input.focus()

    progress.style.transitionDuration = ""
    progress.style.width = ""

    const listItem = document.createElement("li")
    listItem.innerText = input.value
    tasks.appendChild(listItem)

    input.value = ""
  }, WORK_TIME)
}

function loadHistory() {
  const historySize = localStorage.length

  if (historySize > 0) {
    for (let i = 0; i < historySize; i++) {
      const key = localStorage.key(i)
      const taskName = localStorage.getItem(key)

      const listItem = document.createElement("li")
      listItem.innerText = taskName
      tasks.appendChild(listItem)
    }
  }
}

form.onsubmit = startTimer
loadHistory()
