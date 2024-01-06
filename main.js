let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.getElementById('clearBtn')
const allClearButton = document.getElementById('allClearBtn')
const pointButton = document.getElementById('pointBtn')
const lastOperationDisplay = document.getElementById('lastOperationDisplay')
const currentOperationDisplay = document.getElementById('currentOperationDisplay')

equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
allClearButton.addEventListener('click', allClear)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
    button.addEventListener("click", () => setOperation(button.textContent))
);

function appendNumber(number){
    if (currentOperationDisplay.textContent === "0" || shouldResetScreen){
        resetScreen()}
    currentOperationDisplay.textContent += number
};

function resetScreen(){
    currentOperationDisplay.textContent = ""
    shouldResetScreen = false
};

function allClear(){
    lastOperationDisplay.textContent = ""
    currentOperationDisplay.textContent = "0"
    firstOperand = ""
    secondOperand = ""
    currentOperation = null
};

function appendPoint(){
    if(shouldResetScreen) resetScreen()
    if (currentOperationDisplay.textContent === "")
        currentOperationDisplay.textContent = "0"
    if(currentOperationDisplay.textContent.includes(".")) return
    currentOperationDisplay.textContent += "."
};

function clear(){
    currentOperationDisplay.textContent = currentOperationDisplay.textContent.toString().slice(0, -1)
}

function setOperation(operator){
    if (currentOperation !== null) evaluate()
    firstOperand = currentOperationDisplay.textContent
    currentOperation = operator
    lastOperationDisplay.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}


function evaluate(){
    if (currentOperation === null || shouldResetScreen) return
    if(currentOperationDisplay === "/" && currentOperationDisplay.textContent === "0"){
        alert ("You can't divide by 0 dude!")
        return
    }
    secondOperand = currentOperationDisplay.textContent
    currentOperationDisplay.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    )
    lastOperationDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}

function roundResult(number){
    return Math.round(number * 1000) / 1000
}

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(operator, a, b){
    a = Number(a)
    b = Number(b)
    switch (operator){
        case '+':
            return add(a, b)
        case '-':
            return substract(a, b)
        case 'x':
            return multiply(a, b)
        case '/':
            if(b === 0) return null
            else return divide (a, b)
        default:
            return null
    }
}