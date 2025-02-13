const expressionDisplay = document.querySelector("#expression p");
const resultDisplay = document.querySelector("#value p");
const buttons = document.querySelectorAll(".button, .operator");
const clearButton = document.getElementById("clear");
const toggleButton = document.getElementById("toggle");
const percentButton = document.getElementById("percent");
const bracketButton = document.getElementById("brackets");
const deleteButton = document.getElementById("delete-btn");

let expression = "";
let result = "";
let openBrackets = 0;
let history = [];

function updateDisplay() {
  // console.log("Updating Display:", expression, result);
  expressionDisplay.textContent = expression;
  resultDisplay.textContent = result || "";

  if (expression.length > 12) {
    expressionDisplay.style.fontSize = "14px";
  }
  else if (expression.length > 20) {
    expressionDisplay.style.fontSize = "12px";
  }
  else {
    expressionDisplay.style.fontSize = "16x";
  }

  if (result.length > 12) {
    resultDisplay.style.fontSize = "18px";
  } else {
    resultDisplay.style.fontSize = "22px";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = this.dataset.value;
    if (value == "=") {
      evaluateExpression();
    }
    else {
      if (result !== "0" || result !== "") {
        expression += result;
        result = "";
      }
      expression += value;
      updateDisplay();
    }
  });
});

clearButton.addEventListener("click", function () {
  expression = "";
  result = "";
  updateDisplay();
});

toggleButton.addEventListener("click", function () {
  if (expression.length > 0) {
    if (expression.startsWith("-")) {
      expression = expression.slice(1);
    } else {
      expression = "-" + expression;
    }
    updateDisplay();
  }
});

deleteButton.addEventListener("click", function () {
  expression = expression.slice(0, expression.length - 1);
  updateDisplay();
});

percentButton.addEventListener("click", function () {
  if (expression !== "") {
    expression = (parseFloat(expression) / 100).toString();
    updateDisplay();
  }
});

bracketButton.addEventListener("click", function () {
  if (
    expression === "" ||
    "+-*/(".includes(expression[expression.length - 1])
  ) {
    expression += "(";
    openBrackets++;
  } else if (openBrackets > 0) {
    expression += ")";
    openBrackets--;
  } else {
    expression += "(";
    openBrackets++;
  }
  updateDisplay();
});

function evaluateExpression() {
  try {
    if (expression.trim() === "") return;
    if (expression.includes("/0")) {
      throw new Error("Cannot divide by zero");
    }
    result = eval(expression);
    expression = "";
  }
  catch (error) {
    result = "Error !";
    expression = "";
  }
  updateDisplay();
}

window.addEventListener("keydown", function (event) {
  event.preventDefault();
  const key = event.key;
  if (!isNaN(key) || "+-*/().".includes(key)) {
    expression += key;
    expressionDisplay.style.fontSize = "16px";
    updateDisplay();
  }
  else if (key === "Enter" || key === "=") {
    evaluateExpression();
  }
  else if (key === "Backspace") {
    expression = expression.slice(0, expression.length - 1);
    updateDisplay();
  }
  else if (key === "Escape") {
    expression = "";
    result = "";
    updateDisplay();
  }
});

updateDisplay();
