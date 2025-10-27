
const screen1 = document.querySelector("#display1");
const screen2 = document.querySelector("#display2");
const vals = document.querySelectorAll(".val");
const ops = document.querySelectorAll(".op");
const undos = document.querySelectorAll(".undo");
var previous = null;
var current = null;
var currentOperation = "";
var previousOperation = "";
var result = null;
var shouldResetScreen = false;
var operatorAgain = false;
var decimalOp = true;

// Event handler for typing numbers
vals.forEach((val) => { 
    val.addEventListener("click",(e)=> appendNumber(e))
});

//Event handler for pressing operators
ops.forEach((op) => {
    op.addEventListener("click", (e)=> afterOperatorPressed(e))
});

//Event handler for undo buttons
undos.forEach((undo) => {
    undo.addEventListener("click", (e)=> afterUndoPressed(e))
});

//Clear the screen
function resetScreen(screen)
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
    resetScreen(screen2);
    //disabling the "." button after first clicking
    if(digit.target.textContent == "." && decimalOp)
    {
      screen2.textContent+=digit.target.textContent;
      decimalOp = false;
    }
    else if(digit.target.textContent !== ".")
    {
       screen2.textContent+=digit.target.textContent;
    }
    
    operatorAgain = false

}


//operation
function afterOperatorPressed(operater)
{   
//When an operator is entered, without a previous(for the first time)
//pick screen number to be previous and reset screen
   var checkOperatorAgain = 0;
    if(previous == null)
    {
        previous = screen2.textContent;
        shouldResetScreen = true;
        resetScreen(screen2);
        previousOperation = operater.target.textContent;
        shouldResetScreen = true;
        screen1.textContent = previous + previousOperation;

    }

//Else(previous stores a number) pick screen number to be current and perform operation 
    else
    { 
        if(!operatorAgain)
        {
            current = screen2.textContent;
            resetScreen(screen1);
            resetScreen(screen2);
            currentOperation = operater.target.textContent;

            if(currentOperation == "=" && previousOperation !== "=")
            {
                doOperation(previousOperation);
                screen1.textContent = previous + previousOperation + current+"=";
            }

            else
            {
                doOperation(previousOperation);
                screen1.textContent = result + currentOperation;
            }
            
           previousOperation = currentOperation;
           screen2.textContent = result;
           previous = result;
           shouldResetScreen = true;
           operatorAgain = true;
           decimalOp = true;
        }

        else
       { 

        //When "=" is pressed before another operator, update the first screen.
        if(previousOperation == "=" && operater.target.textContent !== "=")
            {
                screen1.textContent = result + operater.target.textContent;
            }
            previousOperation = operater.target.textContent;
       }
    
    }
       
       
    }


function doOperation(operation)
{
     switch(operation)
            {
                case "+":
                result = add(previous, current);
                break;
                case "-":
                result = substract(previous, current);
                break;
                case "*" :
                result = multiply(previous, current);
                break;
                case "/" :
                result = divide(previous, current); 
                break; 

            }
}

function afterUndoPressed(undo)
{
   if(undo.target.textContent == "AC")
   {
    previous = null;
    current = null;
    result = null;
    screen2.textContent = 0;
    screen1.textContent = "";
    console.log(previous);
    console.log(current);
    console.log(result);
   }
   // process to delete a number that was wrongly typed
   else if(undo.target.textContent == "DEL" && !shouldResetScreen)
   {
       screen2.textContent = screen2.textContent.slice(0, screen2.textContent.length-1);
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
return Number(first) - Number(+second);
}
//For multiplying two numbers 
function multiply(first, second)
{
return Number(first) * Number(+second);
}
//For dividing two numbers
function divide(first, second)
{
return Number(first) / Number(second);
}

//The equal sign result
function equals(result)
{
    return result;
}


   
