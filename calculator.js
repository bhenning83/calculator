const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
const clearButton = document.querySelector('#clear');
let args1 = '';
let firstOp = '';
let workingArray = []
let longArray = []
let eqCheck = '';

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
    let pick = e.target.value;
    let targetClass = e.target.getAttribute('class')
    if (pick == 'C') {
        clear();
    }
    if (targetClass == 'number button') {
        workingArray.push(pick)
        longArray.push(pick)
        let screen = workingArray.join('')
        display.textContent = `${screen}`;
        changeClear();
        if (eqCheck == true) { // erases args1 from previous operation if a fresh operation is being started
            args1 = '';
            eqCheck = false;
        }
    } 
    if (targetClass == 'operator button') {
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
            display.textContent = pick;
            workingArray = [];
        } 
        if (opCount == 1) { // runs if there is already an args1 from previous operation
            firstOp = this.value;
            display.textContent = pick;
            workingArray = [];
        }
        if (opCount > 1) {   // counts the number of existing operators
            a = Number(args1);
            b = firstOp;
            c = Number(workingArray.slice(0, this.index).join(''));
            args1 = operate(a,b,c);
            display.textContent = args1;
            firstOp = this.value // assigns the operator for next operation. 
            workingArray = [];
            } 
    } else if (pick == '=') {
        a = Number(args1);
        b = firstOp;
        c = Number(workingArray.slice(0, this.index).join(''));
        args1 = operate(a,b,c);
        eqCheck = true; 
        display.textContent = args1;
        longArray = [];
        workingArray = [];
        clearButton.textContent = 'AC'
    } 
});
});
function clear() {
    if (workingArray !== []) {
    workingArray.length = 0;
    display.textContent = '';  
    } else {
    workingArray.length = 0;
    display.textContent = '';
    longArray.length = 0;
    args1 = '';
    }  
    clearButton.textContent = 'AC';
}
function changeClear() {
    clearButton.textContent = 'C';
}
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

    

    // need to add a decimal input button. CE button. Second display for current operation. Key listeners. allow 2+2-3*7. 
    // highlight operator when clicked, don't show it in display. Unhighlight it when number is clicked.