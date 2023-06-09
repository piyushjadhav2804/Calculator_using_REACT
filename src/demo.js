import React, { useState } from "react";
import "./App.css";

function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const clearDisplay = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="buttons">
        <div className="row">
          <div className="button" onClick={() => inputDigit("7")}>
            7
          </div>
          <div className="button" onClick={() => inputDigit("8")}>
            8
          </div>
          <div className="button" onClick={() => inputDigit("9")}>
            9
          </div>
          <div className="button" onClick={() => performOperation("/")}>
            /
          </div>
        </div>
        <div className="row">
          <div className="button" onClick={() => inputDigit("4")}>
            4
          </div>
          <div className="button" onClick={() => inputDigit("5")}>
            5
          </div>
          <div className="button" onClick={() => inputDigit("6")}>
            6
          </div>
          <div className="button" onClick={() => performOperation("*")}>
            *
          </div>
        </div>
        <div className="row">
          <div className="button" onClick={() => inputDigit("1")}>
            1
          </div>
          <div className="button" onClick={() => inputDigit("2")}>
            2
          </div>
          <div className="button" onClick={() => inputDigit("3")}>
            3
          </div>
          <div className="button" onClick={() => performOperation("-")}>
            -
          </div>
        </div>
        <div className="row">
          <div className="button" onClick={() => inputDigit("0")}>
            0
          </div>
          <div className="button" onClick={inputDecimal}>
            .
          </div>
          <div className="button" onClick={clearDisplay}>
            C
          </div>
          <div className="button" onClick={() => performOperation("+")}>
            +
          </div>
        </div>
        <div className="row">
          <div className="button equal" onClick={() => performOperation("=")}>
            =
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
