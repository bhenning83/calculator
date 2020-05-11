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
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
    let pick = e.target.value;
    let targetClass = e.target.getAttribute('class')
    if (pick == 'C') {
        return clear()
    } else if (targetClass == 'number button') {
        workingArray.push(pick)
        let screen = workingArray.join('')
        display.textContent = `${screen}`;
        console.log(workingArray);
    } else if (targetClass == 'operator button') {
        args1 = workingArray.slice(0, this.index).join('')
        firstOp = this.value;
        display.textContent = pick
        workingArray = [];
    } else if (pick == '=') {
        if (args1 == '') return;
        a = Number(args1);
        b = firstOp;
        c = Number(workingArray.slice(0, this.index).join(''));
        console.log(a)
        console.log(b)
        console.log(c)
        let result = operate(a,b,c);
        display.textContent = result;
    }
});
});
function clear() {
    workingArray.length = 0;
    display.textContent = '';
}



//once operator is pressed, set the array to Args1. if operator is pressed again, args 2 becomes args 1. 