"use strict";

let numbers = document.querySelectorAll(".number");
const equal = document.querySelector(".equal");

let number1, number2;

const h1 = {
  value: document.querySelector("h1"),
};

const clear = document.querySelector(".clearInput");
clear.addEventListener("click", function () {
  clearInput();
});

function addNumber(input) {
  const text = h1.value;
  text.textContent += input;
}

function clearInput() {
  h1.value.textContent = "";
  number1 = 0;
  number2 = 0;
}

numbers.forEach((element) => {
  element.addEventListener("click", function () {
    addNumber(element.textContent);
  });
});

let operators = document.querySelectorAll(".operator");
operators.forEach((element) => {
  element.addEventListener("click", function () {
    addNumber(element.textContent);
  });
});

equal.addEventListener("click", function () {
  operate();
});

function calculate(operator, number1, number2) {
  let result;
  switch (operator) {
    case "+":
      result = number1 + number2;
      break;
    case "x":
      result = number1 * number2;
      break;
    case "/":
      result = number1 / number2;
      break;
    case "%":
      result = number1 % number2;
      break;
    case "-":
      result = number1 - number2;
      break;
  }
  return result;
}

function impOperations(text) {
  const operators = ["x", "/", "%"];
  text = h1.value.textContent;
  const operatorIndex = [];
  for (let i = 1; i < text.length; i++) {
    if (operators.includes(text[i])) operatorIndex.push(i);
  }
  let separated = text.split(text[operatorIndex[0]]);
  [number1, number2] = separated;
  h1.value.textContent = calculate(text[operatorIndex[0]], number1, number2);
}

function findNumbers(expression, opPos, operators) {
  let start = opPos - 1;
  while (start > 0 && !operators.includes(expression[start - 1])) start--;
  if (start === 0 && expression[start] === "-") start = 0;

  let end = opPos + 1;
  while (end < expression.length && !operators.includes(expression[end])) end++;

  return {
    number1: Number(expression.slice(start, opPos)),
    number2: Number(expression.slice(opPos + 1, end)),
    range: [start, end],
  };
}

function operate() {
  let text = h1.value.textContent;
  const operators = ["+", "-", "x", "/", "%"];
  const operatorIndex = [];
  for (let i = 1; i < text.length; i++) {
    if (operators.includes(text[i])) operatorIndex.push(i);
  }
  if (operatorIndex.length == 1) {
    let separated = text.split(text[operatorIndex[0]]);
    [number1, number2] = separated;
    let possible = true;
    if (
      number1 !== "" &&
      number2 !== "" &&
      number1 !== undefined &&
      number2 !== undefined &&
      number2 !== "0"
    ) {
      number1 = Number(number1);
      number2 = Number(number2);
    } else {
      h1.value.textContent = "Error! ";
      possible = false;
    }
    if (possible) {
      h1.value.textContent = calculate(
        text[operatorIndex[0]],
        number1,
        number2
      );
    }
  } else {
    const importantOp = ["x", "/", "%"];
    const basicOp = ["+", "-"];
    let impIndex = [];
    let basIndex = [];
    for (let i = 0; i < text.length; i++) {
      if (importantOp.includes(text[i]))
        impIndex.push({
          op: text[i],
          pos: i,
        });
      else if (basicOp.includes(text[i]))
        basIndex.push({
          op: text[i],
          pos: i,
        });
    }
    if (impIndex.length == 1) {
      let opPos = impIndex[0].pos;
      let start = opPos - 1;
      while (start > 0 && !operators.includes(h1.value.textContent[start - 1]))
        start--;
      console.log(start);
      let end = opPos + 1;
      while (
        end < h1.value.textContent.length &&
        !operators.includes(h1.value.textContent[end])
      )
        end++;
      console.log(end);
      console.log(start, end);
      number1 = Number(h1.value.textContent.slice(start, opPos));
      number2 = Number(h1.value.textContent.slice(opPos + 1, end));
      h1.value.textContent = h1.value.textContent.replace(
        h1.value.textContent.slice(start, end),
        calculate(impIndex[0].op, number1, number2)
      );
    } else if (impIndex.length > 1) {
      while (impIndex.length > 1) {
        impIndex = [];
        for (let i = 0; i < text.length; i++) {
          if (importantOp.includes(text[i])) {
            impIndex.push({ op: text[i], pos: i });
          }
        }
        let opPos = impIndex[0].pos;
        let start = opPos - 1;
        while (
          start > 0 &&
          !operators.includes(h1.value.textContent[start - 1])
        )
          start--;
        let end = opPos + 1;
        while (
          end < h1.value.textContent.length &&
          !operators.includes(h1.value.textContent[end])
        )
          end++;
        number1 = Number(h1.value.textContent.slice(start, opPos));
        number2 = Number(h1.value.textContent.slice(opPos + 1, end));
        h1.value.textContent = h1.value.textContent.replace(
          h1.value.textContent.slice(start, end),
          calculate(impIndex[0].op, number1, number2)
        );
        text = h1.value.textContent;
      }
    }
    if (basIndex.length > 0) {
      while (basIndex.length > 1) {
        basIndex = [];
        for (let i = 1; i < text.length; i++) {
          if (basicOp.includes(text[i])) {
            basIndex.push({ op: text[i], pos: i });
          }
        }
        let opPos = basIndex[0].pos;
        let start = opPos - 1;
        while (
          start > 0 &&
          !operators.includes(h1.value.textContent[start - 1] && start - 1 != 0)
        )
          start--;
        if (start === 0 && h1.value.textContent[start] === "-") start = 0;
        let end = opPos + 1;
        while (
          end < h1.value.textContent.length &&
          !operators.includes(h1.value.textContent[end])
        )
          end++;
        number1 = Number(h1.value.textContent.slice(start, opPos));
        number2 = Number(h1.value.textContent.slice(opPos + 1, end));
        h1.value.textContent = h1.value.textContent.replace(
          h1.value.textContent.slice(start, end),
          calculate(basIndex[0].op, number1, number2)
        );
        console.log(number1, number2);
        text = h1.value.textContent;
      }
    }
  }
}
