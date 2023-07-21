console.log('js:loaded')

/*----- constants -----*/
const INIT_STATE = {
    sadness: 0,
    hunger: 0,
    tiredness: 0
}
//our initial data game state never changes -> const
//making a copy of this data when we invoke init()

/*----- state variables -----*/
//destructuring
// let [sadness, hunger, tiredness] = [0, 0, 0]
let state //undefined or define as null
// state -> sadness, hunger, tiredness
let age //ice box feature, but want it to be here for later

let cycles //incremenet each game played loop

let timer //object id for a setInterval
let interval //time in ms
/*----- cached elements  -----*/
const sadnessEl = document.querySelector(".sadness")
const hungerEl = document.querySelector(".hunger")
const tirednessEl = document.querySelector(".tiredness")

const gameBtnEls  = document.querySelectorAll(".btn-container > button")

/*----- event listeners -----*/
gameBtnEls.forEach(btn => btn.addEventListener("click", handleBtnClick))

/*----- functions -----*/
function init() {
    console.log("game started!")
    //state 
    state = {...INIT_STATE} //creates copy of init
    //interval
    interval = 3000 //our runGame() will execute every 5 seconds
    //timer
    timer = setInterval(runGame,interval) //delay runGame()
    age = 0
    cycles = 0

    render()
}

init()

function handleBtnClick(e) {
    // reference a lookup object -> text -> state property
    const convertProp = {
        feed: "hunger",
        play: "sadness",
        sleep: "tiredness"
    }
    //take the use button - text (data attribute) - capture it in a varaible
    const btnText = convertProp[e.target.innerText.toLowerCase()]
    console.log(btnText)
    //updateStat(captured variable)
    updateStat(btnText, -3)
    render()
}


function runGame() {
    cycles ++
    console.log("game loop running")
    //TODO - work on gameOver() functionality -> continueGame()
    if (continueGame()) {
        updateStats()
        render()
    } else {
        console.log("game over")
        gameOver()
    }
}

function render() {
    //render is responsible for calling all render helper functions
    renderStats()

}

function renderStats() {
    const {sadness, hunger, tiredness} = state
    // decalre three local variables that point to the properties of state object
    //JS is looking for a sadness, a hunger, and a tiredness property and stores the value for that corresponding property in the local variable
    sadnessEl.innerHTML = `Sadness: ${sadness}`
    hungerEl.innerHTML = `Hunger: ${hunger}`
    tirednessEl.innerHTML = `Tiredness: ${tiredness}`
    if (sadness >= 8) {
        sadnessEl.style.color = "red"
    }
    if (hunger >= 8) {
        hungerEl.style.color = "red"
    }
    if (tiredness >= 8) {
        tirednessEl.style.color = "red"
    }
}

//TODO: define updateStats() --> call updateStat()
function updateStats() {
    console.log("updating some stats!")
    // updateStat("sadness", 1)
    // updateStat("hunger", 1)
    // updateStat("tiredness", 1)}
    for (let key in state) {
        updateStat(key, Math.floor(Math.random()*3))
    }
}
//TODO: demonstrate

function updateStat(stat, value) {
    //two arguments: stat reference (key in state), value
    //TODO - add error bounding for player clicks
    if(state[stat] + value >= 0) {
        state[stat] += value
    }else {
        state[stat] = 0
    }
}

function gameOver() {
    clearInterval(timer)
    alert("game over!")
    location.reload()
    //location ->  browser location -> reload() refresh current page view
}

function continueGame() {
    // state.sadness >= 10 || state.hunger >= 10 || state.tiredness >= 10
    //continue game - evalute all propeerties of the state
    //if all of them are <10 (if any of them are greater or equal to 10)
    const stateValues = Object.values(state)
    const gameOn = stateValues.every(stat => stat < 10)
    console.log(stateValues)
    return gameOn

}