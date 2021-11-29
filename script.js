const startBtn = document.querySelector('#start')
const startHardMode = document.querySelector('#hard-mode')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const bestScoreSpan = document.querySelector('.best-score-span')
const clearResults = document.querySelector('.clear-results')
const lifesSpan = document.querySelector('#lifes-span')
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71', 'rgb(199, 255, 125)', 'rgb(58, 255, 9)']
let time = 0
let score = 0
let a = 0
let lifes = 3
let scores = []
lifesSpan.innerHTML = 3

clearResults.addEventListener('click', () => {
    localStorage.removeItem('scores')
    bestScoreSpan.innerHTML = 0
})
if (localStorage.length == 0) {
    bestScoreSpan.innerHTML = 0
} else {
    let bestScore = Math.max.apply(Math, JSON.parse(localStorage.getItem('scores')))
    bestScoreSpan.innerHTML = bestScore 
}

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

startHardMode.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
    a = 1
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    } else {
        lifes--
        if (lifes === 0) {
            finishGame()
        }
        let valueLifes = lifes
        lifesSpan.innerHTML = valueLifes
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time) 
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    if (localStorage.length > 0) {
        scores = JSON.parse(localStorage.getItem('scores'))
    }
    timeEl.parentNode.remove()
    lifesSpan.parentNode.remove()
    board.innerHTML = `<div class="board-div"><h1>Счет: <span class="primary">${score}</span></h1><button class="restart">Повторить</button></div>`
    const restartBtn = document.querySelector('.restart')
    scores.push(score)
    localStorage.setItem('scores', JSON.stringify(scores))
    restartBtn.addEventListener('click', () => {
        window.location.reload()
    })
}

function createRandomCircle() {
    const circle = document.createElement('div')
    if (a === 1) {
        const size = getRandomNumber(5, 10)
        const {width, height} = board.getBoundingClientRect()
        const x = getRandomNumber(0, width - size)
        const y = getRandomNumber(0, height - size)
        setColor(circle)
        circle.classList.add('circle')
        circle.style.width = `${size}px`
        circle.style.height = `${size}px`
        circle.style.top = `${y}px`
        circle.style.left = `${x}px`
        board.append(circle)
    }
    if (a === 0) {
        const size = getRandomNumber(10, 60)
        const {width, height} = board.getBoundingClientRect()
        const x = getRandomNumber(0, width - size)
        const y = getRandomNumber(0, height - size)
        setColor(circle)
        circle.classList.add('circle')
        circle.style.width = `${size}px`
        circle.style.height = `${size}px`
        circle.style.top = `${y}px`
        circle.style.left = `${x}px`
        board.append(circle)
    }
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 25px ${color}`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle')
        circle.click()
    }
    setInterval(kill, 0)
}
