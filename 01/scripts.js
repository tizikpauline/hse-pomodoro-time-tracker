const form = document.querySelector('form')
const tasks = document.querySelector('ul')
const progress = document.querySelector('.progress')
// const WORK_TIME = 25 * 60 * 1000
const WORK_TIME = 2000

function startTimer(e) {
  // По умолчанию при нажатии на «Ввод» форма перезагружает страницу
  // Ниже мы говорим форме не делай действия по умолчанию
  e.preventDefault()

  // Мы слушаем события (onclick, onsubmit, onfocus и т.д.) на элементах
  // target — это тот объект, на котором произошло событие (e)
  // form.onsubmit = startTimer — вот тут мы «вешаем» событие на форму
  // Мы знаем, что внутри формы лежит инпут, а событие submit происходит у формы
  // Поэтому мы получаем доступ к инпуту через событие и форму
  const input = e.target.querySelector('input')
  // Добавили атрибут disabled внутрь HTML-тега инпута
  // Это заблокировало возможность писать и поменяло цвет
  input.disabled = true

  // Создаем ключ, чтобы отличать друг от друга завершенные задачи
  // В будущем мы сможем находить и удалять записи при помощи ключа
  // Date.now() генирирует https://ru.wikipedia.org/wiki/Unix-%D0%B2%D1%80%D0%B5%D0%BC%D1%8F
  const key = Date.now()
  // Записываем в память браузера новый элемент
  // https://tproger.ru/articles/localstorage/
  localStorage.setItem(key, input.value)

  progress.style.width = '100vw'
  progress.style.transitionDuration = WORK_TIME + 'ms'

  setTimeout(function () {
    // Снова дали возможность писать в инпуте
    input.disabled = false
    // Снова сфокусировали на инпуте
    input.focus()

    progress.style.transitionDuration = ''
    progress.style.width = ''

    const listItem = document.createElement('li')
    listItem.innerText = input.value
    // tasks — это <ul></ul>
    // тут мы добавляем в список новый элемент
    tasks.appendChild(listItem)

    // Сбрасываем значение инпута на пустое
    input.value = ''
  }, WORK_TIME)
}

function loadHistory() {
  // Узнаем размер занятой памяти
  const historySize = localStorage.length

  // Если память не пустая, то есть размер больше нуля
  if (historySize > 0) {
    // Это обычный цикл со счетчиком i
    // Он работает, пока счетчик меньше размера памяти
    // Тем самым мы проходим по всем эелментами в памяти
    for (let i = 0; i < historySize; i++) {
      // Достали элемент из памяти
      const key = localStorage.key(i)
      // Достали имя элемента, чтобы ниже воспользоваться им
      const taskName = localStorage.getItem(key)

      const listItem = document.createElement('li')
      listItem.innerText = taskName
      tasks.appendChild(listItem)
    }
  }
}

form.onsubmit = startTimer
loadHistory()
