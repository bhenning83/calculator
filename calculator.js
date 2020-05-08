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
const clear = document.querySelector('#clear');
const operator = document.querySelectorAll('.operator')
const equals = document.querySelector('#equals')
let buttonClicks = []
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
    if (e.target.value !== 'C') {
    buttonClicks.push(e.target.value)
    let screen = buttonClicks.join('')
    display.textContent = `${screen}`
    } else {
        buttonClicks.length = 0;
        display.textContent = '';
    }
    console.log(buttonClicks)
})
});
operator.forEach(x => {
    x.addEventListener('click', function (e) {
        e.target.style.backgroundColor = 'blue';
    })
})
equals.addEventListener('click', (e) => e.target.style.backgroundColor = 'red')

