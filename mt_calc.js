"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author: Paige Mabbitt
   Date: 3.15.19   
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calcutlor
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/






/* ===================================================================== */
//run init on webpage load
window.onload = init();

function init() {
      // for each button clicked, determine the value
      var calcButtons = document.querySelectorAll("input.calcButton");
      for (var i = 0; i < calcButtons.length; i++) {
            // calcButtons.onclick = buttonClick();
            calcButtons[i].addEventListener("click", buttonClick);
      }
      //listen for the keydown event
      document.getElementById("calcWindow").addEventListener("keydown", calcKeys);
}

function buttonClick(e) {
      //calcValue is equal to the value of the calculation window and calcDecimal is equal to the decimal counter
      var calcValue = document.getElementById("calcWindow").value;
      var calcDecimal = document.getElementById("decimals").value;
      //buttonValue is equal to the clicked buttons value
      var buttonValue = e.target.value;
      //for the button pressed that has the value of _______ run _____
      switch (buttonValue) {
            case "del":
                  //for delete make the window blank
                  calcValue = "";
                  break;
                  //for bskp run eraseChar using calcvalue as a parameter
            case "bksp":
                  calcValue = eraseChar(calcValue);
                  break;
                  //for enter, run evalEq using calcValue and calcDecimal
            case "enter":
                  calcValue += " = " + evalEq(calcValue, calcDecimal) + "\n";
                  break;
                  //for prev, run lastEq using calcValue
            case "prev":
                  calcValue += lastEq(calcValue);
                  break;
                  //if no special key is clicked, calcValue is equal to itself plus the buttonValue
            default:
                  calcValue = calcValue + buttonValue;

      }
      //for calcWindow, the value is equal to calcvalue
      document.getElementById("calcWindow").value = calcValue;
      //puts the cursor in the calc window
      document.getElementById("calcWindow").focus();
}

function calcKeys(e) {
      //calcValue is equal to the value of the calculation window and calcDecimal is equal to the decimal counter
      var calcValue = document.getElementById("calcWindow").value;
      var calcDecimal = document.getElementById("decimals").value;
      //for the keyboard button pressed that has the value of _______ run _____
      switch (e.key) {
            //for delete make the window blank
            case "Delete":
                  calcValue = "";
                  break;
            case "Enter":
                  //for enter, run evalEq using calcValue and calcDecimal
                  calcValue += " = " + evalEq(calcValue, calcDecimal);
                  break;
                  //for prev, run lastEq using calcValue
            case "ArrowUp":
                  calcValue += lastEq(calcWindow.value);
                  e.preventDefault();
                  break;
      }
      //for calcWindow, the value is equal to calcvalue
      document.getElementById("calcWindow").value = calcValue;
}

function eraseChar(textStr) {
      return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
      var lines = textStr.split(/\r?\n/);
      var lastLine = lines[lines.length - 1];
      var eqValue = eval(lastLine);
      return eqValue.toFixed(decimals);
}

function lastEq(textStr) {
      var lines = textStr.split(/\r?\n/);
      var lastExp = lines[lines.length - 2];
      return lastExp.substr(0, lastExp.indexOf("=")).trim();
}