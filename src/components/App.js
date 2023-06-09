// import necessary dependencies
import React, { useState } from "react";
import "../styles/App.css";

function App() {
  
  //State variables
  const [displayValue, setDisplayValue] = useState("0"); //stores current value of display bar
  const [operand1,   setOperand1] = useState(null); //stores value of first operand
  const [operator, setOperator] = useState(null); //stores operator for calculations
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false); //indicates wether we are waiting for second operand

  //Helper functions

  //handles inputting a digit into the calculator
  const inputDigit = (digit) => {

    //if waitingForSecondOperand is true, then user has just performed an operation and second operand is expected
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false); //now we have second operand so we set it to false
    }

    //if waitingForSecondOperand is false, it means we are still entering firs/second operand
    else {

      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  //handles inputting a decimal point
  const inputDecimal = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  //resets the display & clears all operands and operators
  const clearDisplay = () => {
    setDisplayValue('0'); //resetting calculator display to 0
    setOperand1(null);   
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  //performs the desired mathematical operation
  const performOperation = (nextOperator) => {
    //converts the displayValue from a string to a floating-point number
    const inputValue = parseFloat(displayValue);

    //checks if there is no existing first operand stored. 
    //If true, it means that the current inputValue should be stored as the first operand.
    if (operand1 === null) {
      setOperand1(inputValue);
    } 
    
    //checks if there is an existing operator
    else if (operator) {
      const result = calculate(operand1, inputValue, operator);
      setDisplayValue(String(result));
      setOperand1(result); //allows chaining multiple operations if the user continues to enter operators and operands.
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  }

  //evaluates the result
  const calculate = (operand1, operand2, operator) => {
    let result;
    switch (operator) {
      case "+":
        result = operand1 + operand2;
        break;
      case "-":
        result = operand1 - operand2;
        break;
      case "*":
        result = operand1 * operand2;
        break;
      case "/":
        result = operand1 / operand2;
        break;
      case "!":
        result = -1 * operand1;
        break;
      case "%":
        result = operand1 % operand2;
        break;
      default:
        result = operand2;
    }
    return parseFloat(result.toFixed(2)); // Round the result to 2 decimal places
  };


  //In the return statement, we define the JSX structure of our calculator app
  return (
    <div className="App">
      <div id="display">{displayValue}</div>  
      <div className="buttons" onClick={clearDisplay}>
        A/C
      </div>
      <div className="buttons" onClick={() => performOperation("!")}>
        +/-
      </div>
      <div className="buttons" onClick={() => performOperation("%")}>
        %
      </div>
      <div className="buttons" onClick={() => performOperation("/")}>
        /
      </div>
      <div className="buttons" onClick={() => inputDigit("7")}>
        7
      </div>
      <div className="buttons" onClick={() => inputDigit("8")}>
        8
      </div>
      <div className="buttons" onClick={() => inputDigit("9")}>
        9
      </div>
      <div className="buttons" onClick={() => performOperation("*")}>
        x
      </div>
      <div className="buttons" onClick={() => inputDigit("4")}>
        4
      </div>
      <div className="buttons" onClick={() => inputDigit("5")}>
        5
      </div>
      <div className="buttons" onClick={() => inputDigit("6")}>
        6
      </div>
      <div className="buttons" onClick={() => performOperation("-")}>
        -
      </div>
      <div className="buttons" onClick={() => inputDigit("1")}>
        1
      </div>
      <div className="buttons" onClick={() => inputDigit("2")}>
        2
      </div>
      <div className="buttons" onClick={() => inputDigit("3")}>
        3
      </div>
      <div className="buttons" onClick={() => performOperation("+")}>
        +
      </div>
      <div className="buttons" data-value="0" onClick={() => inputDigit("0 ")}>
        0
      </div>
      <div className="buttons" onClick={inputDecimal}>
        .
      </div>
      <div
        className="buttons"
        data-value="="
        onClick={() => performOperation("=")}
      >
        =
      </div>
    </div>
  );
}

export default App;
