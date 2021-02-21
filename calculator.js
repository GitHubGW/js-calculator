const button = document.querySelectorAll("button");
const inputSection = document.querySelector(".input-section");
const inputProgress = document.querySelector(".input-progress");
const inputResult = document.querySelector(".input-result");
const firstNum = document.querySelector(".firstNum");
const secondNum = document.querySelector(".secondNum");
const calculate = document.querySelector(".calculate");
const input = document.querySelector(".input");
const current = document.querySelector(".current");

let checkFirstNum = true;
let checkOperation = true;
let checkOper = true;

function numberBtn(clickedBtn) {
  if (Number(inputResult.value) === 0) {
    firstNum.value = clickedBtn;
    inputResult.value = firstNum.value;
  } else {
    if (calculate.value) {
      if (secondNum.value === "") {
        secondNum.value = clickedBtn;
        inputResult.value = secondNum.value;
      } else if (secondNum.value !== "") {
        secondNum.value = secondNum.value + clickedBtn;
        inputResult.value = secondNum.value;
      }
    } else {
      firstNum.value = firstNum.value + clickedBtn;
      inputResult.value = firstNum.value;
    }
    // inputResult.value = inputResult.value + clickedBtn;
  }
}

function equalBtn(clickedBtn) {
  const resultValue = eval(current.value);
  // console.log("current.value", current.value);
  // console.log("resultValue", resultValue);

  if (firstNum.value && secondNum.value) {
    if (input.value) {
      const inputValue = eval(input.value + calculate.value + secondNum.value);
      input.value = inputValue;
      inputResult.value = inputValue;
    } else {
      inputProgress.value = current.value + clickedBtn;
      inputResult.value = resultValue;
      input.value = inputResult.value;
      secondNum.value = "";
    }
  }
}

function calculateBtn(clickedBtn) {
  // console.log("clickedBtn", clickedBtn);

  if (clickedBtn) {
    if (checkOperation) {
      const currentValue = current.value.slice(0, current.value.length - 1);
      const currentValueEnd = current.value.charAt(current.value.length - 1);

      // console.log(currentValue);
      // console.log(currentValueEnd);

      if (secondNum.value && currentValueEnd) {
        inputResult.value = eval(currentValue);
      }

      if (firstNum.value) {
        calculate.value = clickedBtn;
        secondNum.value = "";
        handleCurrent(input.value);
      }
    }
  }
}

function resetBtn() {
  inputResult.value = 0;
  inputProgress.value = "";
  firstNum.value = "";
  secondNum.value = "";
  calculate.value = "";
  input.value = "";
  current.value = "";
}

function handleCurrent(inputValue) {
  // inputProgress.value = firstNum.value + calculate.value;
  // current.value = inputProgress.value;
  inputProgress.value = current.value;
}

function handleBtn(event) {
  const clickedBtn = event.target.innerText;

  if (clickedBtn !== "AC" && clickedBtn !== "=") {
    if (checkFirstNum) {
      if (clickedBtn !== "+" && clickedBtn !== "-" && clickedBtn !== "*" && clickedBtn !== "/") {
        current.value = firstNum.value + clickedBtn;
        checkFirstNum = false;
      }
    } else {
      const checklastValue = current.value.charAt(current.value.length - 1);
      current.value = current.value + clickedBtn;
    }
  }

  switch (clickedBtn) {
    case "AC":
      resetBtn(clickedBtn);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      calculateBtn(clickedBtn);
      break;
    case "=":
      equalBtn(clickedBtn);
      break;
    default:
      numberBtn(clickedBtn);
      break;
  }
}

function init() {
  button.forEach(function (button) {
    button.addEventListener("click", handleBtn);
  });
}
init();
