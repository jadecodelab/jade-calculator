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
const display = document.querySelector("#display");

function appendNumber(num) {
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
}

const numberButtons = document.querySelectorAll(".numbers button");
const operatorButtons = document.querySelectorAll(".operators button");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
    printState();
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
      printState();
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
}

function clear() {
  firstNum = "";
  secondNum = "";
  operator = "";
  display.textContent = "";
}

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => {
  clear();
  printState();
});

function printState() {
  console.log({ firstNum, operator, secondNum });
}
