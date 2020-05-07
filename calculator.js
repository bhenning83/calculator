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
let buttonClicks = []
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
    buttonClicks.push(e.target.value)
    let screen = buttonClicks.join('')
    console.log(buttonClicks)
    console.log(screen)
    display.textContent = `${screen}`
})
});


//make variable an array, and assign clicks to the indexes of array