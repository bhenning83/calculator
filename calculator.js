const add = (a, b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

const operate = (a,b,c) => {
    if (b == '+') return add(a, c);
    if (b == '-') return subtract(a, c);
    if (b == '*') return multiply(a, c);
    if (b == '/') return divide(a, c);
}

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
let args1 = '';
let args2 = '';
let firstOp = '';
let workingArray = []
let longArray = []
let pick = ''
let targetClass = ''
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
    let pick = e.target.value;
    let targetClass = e.target.getAttribute('class')
    if (pick == 'C') {
        return clear()
    } else if (targetClass == 'number button') {
        workingArray.push(pick)
        longArray.push(pick)
        let screen = workingArray.join('')
        display.textContent = `${screen}`;
    } 
    if (targetClass == 'operator button') {
        longArray.push(this.value)
        let opCount = longArray.reduce((mode, val) => {
            if (val == '+' || val == '-' || val == '/' || val == '*') {
                mode += 1
            }
            return mode;
        },0);
        console.log(opCount)
        if (opCount > 1) {
            a = Number(args1);
            b = firstOp;
            c = Number(workingArray.slice(0, this.index).join(''));
            args1 = operate(a,b,c);
            display.textContent = args1;
            workingArray = []
            firstOp = this.value //assigns the operator for next operation. 
            } 
        if (opCount == 1) {
            args1 = workingArray.slice(0, this.index).join('')
            workingArray = [];
            firstOp = this.value;
            display.textContent = pick
            console.log(args1)
        }
    } else if (pick == '=') {
        if (args1 == '') return;
        a = Number(args1);
        b = firstOp;
        c = Number(workingArray.slice(0, this.index).join(''));
        args1 = operate(a,b,c);
        display.textContent = args1;
        longArray = [];
    } 
});
});
function clear() {
    workingArray.length = 0;
    display.textContent = '';
    longArray.length = 0;
}


    

    
 

