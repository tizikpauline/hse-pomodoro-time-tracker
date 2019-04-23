const form = document.querySelector('form')
const switchTo25 = document.querySelector('.switch.is-left')
const switchTo5 = document.querySelector('.switch.is-right')
let taskTime = 5000
const timerLink = document.querySelector('#timer-link')
const statsLink = document.querySelector('#stats-link')
const timerSection = document.querySelector('#timer-section')
const statsSection = document.querySelector('#stats-section')

switchTo25.onclick = function handleTimeSwitch() {
  switchTo25.classList.add('is-active')
  switchTo5.classList.remove('is-active')
  taskTime = 5000
}

switchTo5.onclick = function handleTimeSwitch() {
  switchTo5.classList.add('is-active')
  switchTo25.classList.remove('is-active')
  taskTime = 1000
}

timerLink.onclick = function () {
  statsSection.style.display = 'none'
  timerSection.style.display = 'block'
  timerLink.classList.add('is-active')
  statsLink.classList.remove('is-active')
}

statsLink.onclick = function () {
  timerSection.style.display = 'none'
  statsSection.style.display = 'block'
  statsLink.classList.add('is-active')
  timerLink.classList.remove('is-active')

  const historySize = localStorage.length
  if (historySize > 0) {
    for (let i = 0; i < historySize; i++) {
      const key = localStorage.key(i)
      const taskName = localStorage.getItem(key)

      const tr = document.createElement('tr')
      const tdDate = document.createElement('td')
      const tdTime = document.createElement('td')
      const tdTask = document.createElement('td')
      tdTask.innerText = taskName
      const tdRemove = document.createElement('td')
      tr.appendChild(tdDate)
      tr.appendChild(tdTime)
      tr.appendChild(tdTask)
      tr.appendChild(tdRemove)
      // const listItem = document.createElement('li')
      // listItem.innerText = taskName
      // tasks.appendChild(listItem)
    }
  }
}

form.onsubmit = function startTimer(e) {
  e.preventDefault()

  const input = e.target.querySelector('input[type=text]')
  const key = Date.now()
  localStorage.setItem(key, input.value)

  setTimeout(function () {
    input.value = ''
  }, taskTime)
}

if (window.location.hash === '#timer-section') {
  statsLink.click()
}

if (window.location.hash === '#stats-section') {
  timerLink.click()
}
