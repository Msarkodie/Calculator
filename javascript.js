
const screen = document.querySelector("#screen-container");
const vals = document.querySelectorAll(".val");
const ops = document.querySelectorAll(".op");
const undos = document.querySelectorAll(".undo");
var previous = null;
var current = null;
var operation = "";
var result = null;
var shouldResetScreen = false;
var operatorAgain = false;

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
        previous = screen.textContent;
        shouldResetScreen = true;
        resetScreen();
        operation = operater.target.textContent;
        shouldResetScreen = true;

    }

//Else(previous stores a number) pick screen number to be current and perform operation 
    else
    { 
        if(!operatorAgain)
        {
            current = screen.textContent;
            resetScreen();

            console.log(operation);
       
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
                case "AC":
                clearCal(first, second, result);
                break;

            }

           screen.textContent = result;
           previous = result;
           operation = operater.target.textContent;
           shouldResetScreen = true;
           operatorAgain = true;
        }

        else
       {
         operation = operater.target.textContent;
       }
    
    }
       
       
    }


function afterUndoPressed(undo)
{
   if(undo.target.textContent == "AC")
   {
    previous = null;
    current = null;
    result = null;
    screen.textContent = 0;
    console.log(previous);
    console.log(current);
    console.log(result);
   }

   else if(undo.target.textContent == "DEL" && !shouldResetScreen)
   {
       screen.textContent = screen.textContent.slice(0, screen.textContent.length-1);
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


   
