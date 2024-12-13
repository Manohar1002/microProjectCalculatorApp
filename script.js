let display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".numberButton");
const operationButtons = document.querySelectorAll(".operationButton");
const resetButton = document.querySelector(".btnReset");
const delButton = document.querySelector(".btnDel");
const ansButton = document.querySelector(".btnAns");
const dotButton = document.querySelector(".btnDot");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const inputValue = button.textContent;
    display.value += inputValue;
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const inputValue = button.textContent;
    const lastValue = display.value.slice(-1);

    if (isValidOperatorInput(display.value, lastValue)) {
      alert("Error");
      display.value += "";
    } else {
      display.value += inputValue;
    }
  });
});

dotButton.addEventListener("click", () => {
  const inputValue = dotButton.textContent;
  const lastValue = display.value.slice(-1);
  const lastNumber = display.value.split(/[\+\-\*\/]/).pop();

  if (lastValue != "." && !lastNumber.includes(".")) {
    display.value += inputValue;
  } else {
    display.value += "";
  }
});

delButton.addEventListener("click", () => {
  display.value = display.value.slice(0, -1);
});

resetButton.addEventListener("click", () => {
  display.value = "";
});

ansButton.addEventListener("click", () => {
  if (display.value == "") {
    alert("Please Enter the equation");
  } else {
    try {
      const answer = eval(display.value);
      display.value = parseFloat(answer.toFixed(2));
      if (display.value == "Infinity" || display.value == "NaN") {
        showInvalid();
      }
    } catch (error) {
      showInvalid();
    }
  }
});

function showInvalid() {
  display.value = "Invalid";
  setTimeout(() => {
    display.value = "";
  }, 700);
}

function isValidOperatorInput(displayValue, lastValue) {
  return (
    displayValue === "" ||
    displayValue === "." ||
    ["+", "-", "*", "/"].includes(lastValue) ||
    lastValue === "."
  );
}
