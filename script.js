const expressionDisplay = document.querySelector("#expression p");
const resultDisplay = document.querySelector("#value p");
const buttons = document.querySelectorAll(".button, .operator");
const clearButton = document.getElementById("clear");
const deleteButton = document.querySelector("#delete-btn");

let expression = "";
let result = "";

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
    expressionDisplay.style.fontSize = "16px";
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
      // If there's a result and we're starting a new calculation
      if (result !== "0" && result !== "") {
        expression = result;
        result = "";
      }
      
      // Prevent multiple operators in sequence
      if ("+-*/".includes(value) && "+-*/".includes(expression[expression.length - 1])) {
        expression = expression.slice(0, -1) + value;
      } else {
        expression += value;
      }
      
      updateDisplay();
    }
  });
});

clearButton.addEventListener("click", function () {
  expression = "";
  result = "";
  updateDisplay();
});

deleteButton.addEventListener("click", function () {
  if (result !== "") {
    result = "";
  } else if (expression.length > 0) {
    expression = expression.slice(0, expression.length - 1);
  }
  updateDisplay();
});

function evaluateExpression() {
  try {
    if (expression.trim() === "") return;
    console.log("Evaluating expression:", expression);
    
    if (expression.includes("/0")) {
      throw new Error("Cannot divide by zero");
    }
    
    // Check if the expression ends with an operator
    if ("+-*/".includes(expression[expression.length - 1])) {
      throw new Error("Invalid expression");
    }
    
    result = eval(expression);
    console.log("Result:", result);
    
    // Handle very small numbers
    if (Math.abs(result) < 1e-10) {
      result = "0";
    } else {
      result = result.toString();
    }
    
    expression = "";
  }
  catch (error) {
    console.error("Error:", error);
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
