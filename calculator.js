const display = document.querySelector('#display');
const clearButton = document.querySelector('#clear');
const ops = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const equals = document.querySelector('#equals');
const switcher = document.querySelector('#switch');
const plus = document.querySelector('#add')
const dash = document.querySelector('#subtract')
const star = document.querySelector('#multiply')
const slash = document.querySelector('#divide')
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
    if (e !== undefined) {
        workingArray.push(this.value)
    }
    displayArray();
    changeClear();
    resetOpColor();
    if (eqCheck == true) { // erases args1 from previous operation if a fresh operation is being started
        args1 = '';
        eqCheck = false;
    }
    if (this.value == '.') {
        displayDecimal();
    }  
}
function operatorPressed(e) {
    if (e !== undefined) {
        this.style.backgroundColor = '#737373'
        this.style.borderColor = '#737373'
        this.style.color = 'white'
        longArray.push(this.value)
    }
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
    resetOpColor();
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
    resetOpColor()
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
function resetOpColor() {
    ops.forEach(op => {
        op.style.backgroundColor = 'rgba(255, 199, 140, 0.658)';
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
function displayArray(e) {
    if (workingArray[0] == '-') {
        tempArray = [...workingArray];
        tempArray.shift()
        tempArray.push('-')
        display.textContent = tempArray.join('')
    } else if (workingArray[0] >= 0) {
        display.textContent = workingArray.join('');
    }
    if (workingArray.length > 13) {
        workingArray = workingArray.slice(0,13)
    }
}
function displayDecimal() {
    if (workingArray[0] == '.') {
        workingArray[0] = '0';
        workingArray[1] = '.';
        tempArray = [...workingArray];
        tempArray.pop();    
        tempArray.unshift('.')
        display.textContent = tempArray.join('');
    } else {
        tempArray = [...workingArray];
        tempArray.pop();    
        tempArray.unshift('.')
        display.textContent = tempArray.join('');
    }
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
    if (c === 0) return 'Don\'t do that';
    return a / b;
}
window.addEventListener('keydown', (e) => {
    switch (`${e.key}`) {
        case 'c':
        clear();
        break;

        case 'Enter':
        equalsPressed();
        break;

        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        workingArray.push(`${e.key}`)
        numberPressed();
        break;

        case '.':
        numberPressed();
        workingArray.push(`${e.key}`);
        displayDecimal();
        break;

        case '+':
        plus.style.backgroundColor = '#737373'
        plus.style.borderColor = '#737373'
        plus.style.color = 'white'
        longArray.push(`${e.key}`)
        operatorPressed();
        firstOp = `${e.key}`
        break;

        case '-':
        dash.style.backgroundColor = '#737373'
        dash.style.borderColor = '#737373'
        dash.style.color = 'white'
        longArray.push(`${e.key}`)
        operatorPressed();
        firstOp = `${e.key}`
        break;

        case '*':
        star.style.backgroundColor = '#737373'
        star.style.borderColor = '#737373'
        star.style.color = 'white'
        longArray.push(`${e.key}`)
        operatorPressed();
        firstOp = `${e.key}`
        break;

        case '/':
        slash.style.backgroundColor = '#737373'
        slash.style.borderColor = '#737373'
        slash.style.color = 'white'
        longArray.push(`${e.key}`)
        operatorPressed();
        firstOp = `${e.key}`
        break; 

        case '_':
        switchPositive();
        break;

        case 'Backspace':
        workingArray.pop();
        if (workingArray.length == 0) {
            display.textContent = '';
        }
        if (workingArray.slice(-1) == '.') {
            displayDecimal()
        } else {
            displayArray();   
        }
        break;

        case 'k':
        display.textContent = 'Hi Kiptyn'
        break;

        case 'K':
        display.textContent = 'Hi Kaelyn'
    }
    });



    //  Second display for current operation. allow 2+2-3*7.
    // buttons flash color when pressed
