let inputValue = document.getElementById("display");

//buttonClick(value) function recieves values on button click

function buttonClick(value) {
  inputValue.value += value;
}

/*clearValue() function Clears or deletes the value 
  on button click based on flag */

function clearValue(action) {
  if (action === "clear") {
    inputValue.value = "";
  } else if (action === "delete") {
    console.log(action);
    inputValue.value = inputValue.value.toString().slice(0, -1);
  }
}

//calculate() function calculates the string expression and returns result

function calculate() {
  let expressionString = inputValue.value;
  let len = expressionString.length;
  if (len === 0) {
    return 0;
  }

  let stack = [];
  let currentNumber = 0;
  let operation = "+";

  for (let i = 0; i < len; i++) {
    let currentChar = expressionString[i];

    function isDigit(stringCurrentCharacter) {
      return stringCurrentCharacter >= "0" && stringCurrentCharacter <= "9";
    }

    if (isDigit(currentChar)) {
      currentNumber = currentNumber * 10 + parseInt(currentChar);
      /*10 is multiplied to current number to move digit by decimal 
          so to make entire number digit by digit*/
    }

    if ((!isDigit(currentChar) && !/\s/.test(currentChar)) || i === len - 1) {
      if (operation === "-") {
        stack.push(-currentNumber);
      } else if (operation === "+") {
        stack.push(currentNumber);
      } else if (operation === "*") {
        let stackTop = stack.pop();
        /* '*' has more precedence than + and -, so evaluate '*' first */
        stack.push(stackTop * currentNumber); 
      } else if (operation === "/") {
        let stackTop = stack.pop();
        /* '/' has more precedence than + and -, so evaluate '/' first */
        stack.push(Math.trunc(stackTop / currentNumber));
      }
      operation = currentChar;
      currentNumber = 0; //as we already pushed the current number in stack
    }
  }

  let result = 0;
  while (stack.length !== 0) {
    /* as whole expression will be evaluated and become single digits 
       which will be one by one pop that values and keep adding and assign 
       them to the result variable*/
    result += stack.pop();
  }

  // return result;
  inputValue.value = result;
}
