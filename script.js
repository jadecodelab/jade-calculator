// State
let firstNum = "";
let secondNum = "";
let operator = "";
let resetDisplay = false;

// DOM Elements
const logoBtn = document.getElementById("logo");
const display = document.querySelector("#display");
const expressiomDisplay = document.querySelector("#expression-display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const equalsBtn = document.getElementById("equals");

const clearBtn = document.getElementById("clear");
const decimalBtn = document.getElementById("decimal");
const backspaceBtn = document.getElementById("backspace");

// Math Functions
function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Error! division by 0";
  return a / b;
}

function operate(operator, a, b) {
  if (operator === "+") return add(a, b);
  else if (operator === "-") return substract(a, b);
  else if (operator === "*") return multiply(a, b);
  else if (operator === "/") return divide(a, b);
  else return "Invalid operator!";
}

function updateExpressionDisplay() {
  let expr = firstNum;
  if (operator) expr += ` ${operator} `;
  if (secondNum) expr += secondNum;
  expressiomDisplay.textContent = expr;
}

// Functions for Calculator Logic
function appendNumber(num) {
  if (resetDisplay && operator === "") {
    firstNum = "";
    resetDisplay = false;
    expressiomDisplay.textContent = "";
  }

  if (operator === "") {
    firstNum += num;
    display.textContent = firstNum;
  } else {
    secondNum += num;
    display.textContent = secondNum;
  }

  updateDecimalBtn();
  updateExpressionDisplay();
}

function setOperator(op) {
  if (firstNum && secondNum && operator) {
    evaluate();
  }

  operator = op;
  updateDecimalBtn();
  updateExpressionDisplay();
}

function evaluate() {
  if (firstNum === "" || secondNum === "" || operator === "") return;

  const result = operate(operator, Number(firstNum), Number(secondNum));

  expressiomDisplay.textContent = `${firstNum} ${operator} ${secondNum} =`;

  display.textContent = result;

  firstNum = result.toString();
  secondNum = "";
  operator = "";

  resetDisplay = true;
}

function clear() {
  firstNum = "";
  secondNum = "";
  operator = "";
  display.textContent = "0";
  expressiomDisplay.textContent = "";

  updateDecimalBtn();
}

function appendDecimal() {
  if (operator === "") {
    firstNum = appendDecimalToNumber(firstNum);
    display.textContent = firstNum;
  } else {
    secondNum = appendDecimalToNumber(secondNum);
    display.textContent = secondNum;
  }

  updateDecimalBtn();
  updateExpressionDisplay();
}

function backspace() {
  if (secondNum) {
    secondNum = secondNum.slice(0, -1);
    display.textContent = secondNum;
  } else if (operator) {
    operator = "";
    display.textContent = firstNum;
  } else {
    firstNum = firstNum.slice(0, -1);
    display.textContent = firstNum;
  }

  updateDecimalBtn();
  updateExpressionDisplay();
  printState();
}

// Helper Functions
function printState() {
  console.log({ firstNum, operator, secondNum });
}

function appendDecimalToNumber(num) {
  if (num.includes(".")) return num;

  if (num === "") {
    return "0.";
  } else {
    return (num += ".");
  }
}

function updateDecimalBtn() {
  let currnum;

  if (operator === "") {
    currnum = firstNum;
  } else {
    currnum = secondNum;
  }
  decimalBtn.disabled = currnum.includes(".");
}

// Event Listeners
logoBtn.addEventListener("click", () => {
  display.textContent = "Good luck :)";
});

decimalBtn.addEventListener("click", appendDecimal);

equalsBtn.addEventListener("click", () => {
  evaluate();
  resetDisplay = true;
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setOperator(button.textContent);
  });
});

clearBtn.addEventListener("click", clear);

backspaceBtn.addEventListener("click", () => {
  backspace();
});

document.addEventListener("keydown", (event) => {
  if (event.key >= "0" && event.key <= "9") {
    appendNumber(event.key);
  }

  if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/"
  ) {
    setOperator(event.key);
  }

  if (event.key === "Enter") {
    evaluate();
  }

  if (event.key === ".") {
    appendDecimal();
  }

  if (event.key === "Backspace") {
    backspace();
  }

  if (event.key === "Escape") {
    clear();
  }
});
