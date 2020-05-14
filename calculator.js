const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.button');
const clearButton = document.querySelector('#clear');
const ops = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const equals = document.querySelector('#equals');
let args1 = '';
let firstOp = '';
let workingArray = []
let longArray = []
let eqCheck = '';
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
function divide(a,b) {
    if (b == 0) {
        return 'Nice try, smartass'
    } else {
        return a / b;
    }
}
const operate = (a,b,c) => {
    if (b == '+') return add(a, c);
    if (b == '-') return subtract(a, c);
    if (b == '*') return multiply(a, c);
    if (b == '/') return divide(a, c);
}
function clear() {
    if (workingArray == []) {
    args1 = '';
    workingArray = [];
    display.textContent = '';
    longArray = [];
    }  
    if (workingArray !== []) {
    workingArray = [];
    display.textContent = '';  
    }
    clearButton.textContent = 'AC';
    changeOp()
}
function changeClear() {
    clearButton.textContent = 'C';
}
function changeOp() {
    ops.forEach(op => {
        op.style.backgroundColor = 'white'
    });
}
clearButton.addEventListener('click', function (e) {
    return clear()
}) 
numbers.forEach(number => {
    number.addEventListener('click', function (y) {
        workingArray.push(this.value)
        longArray.push(this.value);
        display.textContent = workingArray.join('')
        changeClear();
        changeOp();
        if (eqCheck == true) { // erases args1 from previous operation if a fresh operation is being started
            args1 = '';
            eqCheck = false;
        }
    });
});  
ops.forEach(op => {
    op.addEventListener('click', function (o) {
        this.style.backgroundColor = 'blue'
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
            args1 = operate(a,b,c);
            display.textContent = args1;
            firstOp = this.value // assigns the operator for next operation. 
            workingArray = [];
            } 
    })
})
equals.addEventListener('click', function (p) {
    a = Number(args1);
    b = firstOp;
    c = Number(workingArray.slice(0, this.index).join(''));
    args1 = operate(a,b,c);
    eqCheck = true; 
    display.textContent = args1;
    longArray = [];
    workingArray = [];
    clearButton.textContent = 'AC'
    changeOp();
})


    // AC isn't working after = --- it's retaining the Args1 value.

    // need to add a decimal input button. CE button. Second display for current operation. Key listeners. allow 2+2-3*7. 
    // highlight operator when clicked, don't show it in display. Unhighlight it when number is clicked.

   