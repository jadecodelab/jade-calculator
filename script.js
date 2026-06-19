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
  if (b === 0) return "Oops! Can't divide by 0!";
  return a / b;
}

function operate(operator, a, b) {
  if (operator === "+") return add(a, b);
  else if (operator === "-") return substract(a, b);
  else if (operator === "*") return multiply(a, b);
  else if (operator === "/") return divide(a, b);
  else return "Invalid operator!";
}

let firstNum = "";
let secondNum = "";
let operator = "";
let resetDisplay = false;

const display = document.querySelector("#display");

function appendNumber(num) {
  if (resetDisplay) {
    firstNum = "";
    secondNum = "";

    resetDisplay = false;
    updateDecimalBtn();
  }

  if (operator === "") {
    firstNum += num;
    display.textContent = firstNum;
  } else {
    secondNum += num;
    display.textContent = secondNum;
  }

  console.log(firstNum, operator, secondNum);
}

function setOperator(op) {
  if (firstNum && secondNum && operator) {
    evaluate();
  }

  operator = op;
  updateDecimalBtn();
}

const numberButtons = document.querySelectorAll(".numbers button");
const operatorButtons = document.querySelectorAll(".operators button");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "=") {
      evaluate();
      printState();
    } else {
      setOperator(value);
    }
  });
});

function evaluate() {
  if (firstNum === "" || secondNum === "" || operate === "") return;

  const result = operate(operator, Number(firstNum), Number(secondNum));
  display.textContent = result;

  firstNum = result.toString();
  secondNum = "";
  operator = "";

  resetDisplay = true;
  updateDecimalBtn();
}

function clear() {
  firstNum = "";
  secondNum = "";
  operator = "";
  display.textContent = "";

  updateDecimalBtn();
}

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clear);

function printState() {
  console.log({ firstNum, operator, secondNum });
}

const decimalBtn = document.getElementById("decimal");

function appendDecimalToNumber(num) {
  if (num.includes(".")) return num;

  if (num === "") {
    return "0.";
  } else {
    return (num += ".");
  }

  display.textContent = num;
}

function appendDecimal() {
  if (operator === "") {
    firstNum = appendDecimalToNumber(firstNum);
  } else {
    secondNum = appendDecimalToNumber(secondNum);
  }

  updateDecimalBtn();
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

decimalBtn.addEventListener("click", appendDecimal);
