const display = document.querySelector('#display');
const clearButton = document.querySelector('#clear');
const ops = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const equals = document.querySelector('#equals');
const switcher = document.querySelector('#switch');
let args1 = '';
let firstOp = '';
let workingArray = []
let longArray = []
let eqCheck = false;
let tempString = '';
let tempArray = [];

numbers.forEach(number => {
    number.addEventListener('click', numberPressed)   
});  
ops.forEach(op => {
    op.addEventListener('click', operatorPressed)      
});
equals.addEventListener('click', equalsPressed);
switcher.addEventListener('click', switchPositive);
clearButton.addEventListener('click', clear); 

function numberPressed(e) {
    workingArray.push(this.value)
    longArray.push(this.value);
    displayArray();
    changeClear();
    changeOp();
    if (eqCheck == true) { // erases args1 from previous operation if a fresh operation is being started
        args1 = '';
        eqCheck = false;
    }
    if (this.value == '.') {
        displayDecimal();
    }
}
function operatorPressed(e) {
    this.style.backgroundColor = '#737373'
        this.style.borderColor = '#737373'
        this.style.color = 'white'
        longArray.push(this.value)
        eqCheck = false;
        changeClear()
        let opCount = longArray.reduce((mode, val) => {
            if (val == '+' || val == '-' || val == '/' || val == '*') {
                mode += 1
            }
            return mode;
        },0);
        if (opCount == 1 && args1 == []) { // checks to make sure there isn't an args1 assigned from equals button being hit previously
            args1 = workingArray.slice(0, this.index).join('')
            firstOp = this.value; 
            workingArray = [];
        } 
        if (opCount == 1) { // runs if there is already an args1 from previous operation
            firstOp = this.value;
            workingArray = [];
        }
        if (opCount > 1) { 
            a = Number(args1);
            b = firstOp;
            c = Number(workingArray.slice(0, this.index).join(''));
            args1 = operate(a,b,c)
            firstOp = this.value // assigns the operator for next operation. 
            workingArray = [];
            displayResult();
            } 
    }
function equalsPressed(e) {
    a = Number(args1);
    b = firstOp;
    c = Number(workingArray.slice(0, this.index).join(''));
    args1 = operate(a,b,c);
    eqCheck = true; 
    longArray = [];
    workingArray = [];
    clearButton.textContent = 'AC'
    changeOp();
    displayResult()
}
function switchPositive() {
    if (workingArray.length == 0 && eqCheck == true && args1 > 0) {
        tempString = String(args1);
        tempArray = tempString.split('');
        tempArray.push('-');
        display.textContent = tempArray.join('')
        args1 = args1 * -1;
    } else if (workingArray.length == 0 && eqCheck == true && args1 < 0) {
        args1 = args1 * -1;
        display.textContent = `${args1}`
    } else if (workingArray.length == 0 && eqCheck == false) {
        workingArray.push('-');
        display.textContent = workingArray.join('')
    } else if (workingArray[0] > 0) { //display comes in ltr, so this puts the '-' at the start.
        workingArray.push('-');  
        display.textContent = workingArray.join('');
        workingArray.pop();
        workingArray.unshift('-')
    } else {
        workingArray.shift();
        display.textContent = workingArray.join('');
    }
}
function clear() {
    changeOp()
    clearButton.textContent = 'AC';
    if (workingArray.length == 0) {
    workingArray = [];
    display.textContent = '';
    longArray = [];
    args1 = '';
    } else if (workingArray.length !== 0) {
    workingArray = [];
    display.textContent = '';  
    }
}
function changeClear() {
    clearButton.textContent = 'C';
}
function changeOp() {
    ops.forEach(op => {
        op.style.backgroundColor = 'rgba(255, 255, 255, 0.644)';
        op.style.color = 'black';
        op.style.borderColor = 'rgba(140, 251, 255, 0.658)';
    });
}
function displayResult() {
    if (args1 < 0) {
        tempString = String(args1);
        tempArray = tempString.split('');
        tempArray.shift();
        tempArray.push('-');
        display.textContent = tempArray.join('');
    } else {
        args1 = args1.toFixed(3);
        display.textContent = args1;
    } 
}
function displayArray() {
    if (workingArray[0] >= 0) {
        display.textContent = workingArray.join('');
    } else if (workingArray[0] == '-') {
        tempArray = [...workingArray];
        tempArray.shift()
        tempArray.push('-')
        display.textContent = tempArray.join('')
    } 
    if (workingArray.length > 17) {
        workingArray = workingArray.slice(0,17)
    }
}
function displayDecimal() {
    tempArray = [...workingArray];
    tempArray.pop()
    tempArray.unshift('.')
    display.textContent = tempArray.join('');
    }
function operate(a,b,c) {
    if (b == '+') return add(a, c);
    if (b == '-') return subtract(a, c);
    if (b == '*') return multiply(a, c);
    if (b == '/') return divide(a, c);
}
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
function divide(a,b) {
    if (c === 0) {
        return 'Don\'t do that'
    } else {
        return a / b;
    }
}




    //  Second display for current operation. Key listeners. allow 2+2-3*7.
