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

const button = document.querySelector('.button');
for (let i = 0; i < button.length; i++) {
	button[i].style.backgroundColor = blue;
}