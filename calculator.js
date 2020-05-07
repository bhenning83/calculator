add = (a, b) => a + b;
subtract = (a,b) => a - b;
multiply = (a,b) => a * b;
divide = (a,b) => a / b;

operate = (a,b,c) => {
    if (b == '+') return add(a, c);
    if (b == '-') return subtract(a, c);
    if (b == '*') return multiply(a, c);
    if (b == '/') return divide(a, c);
}

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
    e.display.textContent = 'test';
})
});

