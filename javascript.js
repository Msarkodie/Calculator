
const screen = document.querySelector("#screen-container");
const vals = document.querySelectorAll(".val");
const ops = document.querySelectorAll(".op");
var previous = null;
var current = null;
var operation = "";
var result = null;
var shouldResetScreen = false;

// Event handler for typing numbers
vals.forEach((val) => { 
    val.addEventListener("click",(e)=> appendNumber(e))
});

//Event handler for pressing operators
ops.forEach((op) => {
    op.addEventListener("click", (e)=> afterOperatorPressed(e))
});

//Clear the screen
function resetScreen()
{
   if(shouldResetScreen)
   {
      screen.textContent = "";
      shouldResetScreen = false;
   }
   
}

//Append number when typed on the screen
function appendNumber(digit)
{   
    resetScreen();
    screen.textContent+=digit.target.textContent;

}


//operation
function afterOperatorPressed(operater)
{   
//When an operator is entered, without a previous(for the first time)
//pick screen number to be previous and reset screen
    if(previous == null)
    {
        previous = screen.textContent;
        shouldResetScreen = true;
        resetScreen();
        operation = operater.target.textContent;

    }

//Else(previous stores a number) pick screen number to be current and perform operation 
    else
    {
       current = screen.textContent;
       resetScreen();
       if(operation == "+")
       {
          result = add(current, previous);
       }
       screen.textContent = result;
       previous = result;
       operation = operater.target.textContent;
       shouldResetScreen = true;
    
    }

}



//For adding two numbers
function add(first, second)
{
return Number(first) + Number(second);
}
//For subtracting two numbers
function substract(first, second)
{
return (+first) - (+second);
}
//For multiplying two numbers 
function multiply(first, second)
{
return (+first) * (+second);
}
//For dividing two numbers
function divide(first, second)
{
return (+first) / (+second);
}

