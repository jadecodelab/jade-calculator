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
  if (b === 0) return "Can't divide by 0!";
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
const display = document.querySelector(".display");

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
  operator = op;
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
    operator = button.textContent;
    display.textContent = operator;
  });
});
