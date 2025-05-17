// let input = document.getElementById("inputbox");
// let buttons = document.querySelectorAll("button");

// let string = "";
// let arr = Array.from(buttons);
// arr.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     if (e.target.innerHTML == "=") {
//       string = eval(string);
//       input.value = string;
//     } 
//     else if ((e.target.innerHTML == "AC")) {
//       string = "";
//       input.value = string;
//     } 
//     else if(e.target.innerHTML=="DEL"){
//         string = string.substring(0,string.length-1);
//         input.value = string;
//     }
//     else {
//       string += e.target.innerHTML;
//       input.value = string;
//     }
//   });
// });



let input = document.getElementById("inputbox");
let buttons = document.querySelectorAll("button");

let string = "";
let arr = Array.from(buttons);

// Safe expression evaluation
function evaluateExpression(expr) {
  try {
    return Function('"use strict"; return (' + expr + ')')();
  } catch {
    return "Error";
  }
}

// Handle button clicks
arr.forEach((button) => {
  button.addEventListener("click", (e) => handleInput(e.target.innerHTML));
});

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || "+-*/.%".includes(key)) {
    string += key;
  } else if (key === "Enter") {
    string = evaluateExpression(string).toString();
  } else if (key === "Backspace") {
    string = string.slice(0, -1);
  } else if (key === "Escape") {
    string = "";
  } else {
    return; // Ignore other keys
  }

  input.value = string;
});

// Shared input handler for both button and keyboard
function handleInput(value) {
  if (value === "=") {
    string = evaluateExpression(string).toString();
  } else if (value === "AC") {
    string = "";
  } else if (value === "DEL") {
    string = string.slice(0, -1);
  } else {
    string += value;
  }

  input.value = string;
}
