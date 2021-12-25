class Calculator {
    #result;
    #shadow;
    #memory;
    #register;
    #operator;

    constructor() {
        this.#clear();
    }

    input(key) {

        if (isNaN(this.#result)) this.#clear();
  
        if (!isNaN(key) && key != ' ') {
            this.#addDigit(key)
        } else {
            switch (key) {
                case 'Enter':
                    this.#resolve();
                    break;
                case 'Backspace':
                    this.#deleteDigit();
                    break;
                case 'CA':
                    this.#clear();
                    break;
                case '.':
                    this.#addDecimal();
                    break;
                case 'negative': 
                    this.#negative();
                    break;
                default:
                    this.#setOperator(key);
            }
        }
        
        return this.#result;
    }

    #addDigit(digit) {
        if (this.#register.length < 13) this.#register += digit;
        this.#result = this.#register;
    }

    #addDecimal() {
        if(!this.#register.includes('.')) this.#addDigit('.');
    }

    #deleteDigit() {
        if (this.#register) {
            this.#register = this.#register.slice(0, this.#register.length - 1);
            this.#result = this.#register || '0';
        }
    }

    #saveToMemory(value) {
        this.#memory = this.#register || value;
        this.#register = '';
        this.#shadow = '';
    }

    #deleteMemory() {
        this.#memory = '';
        this.#register = '';
    }

    #negative() {
        let neg;
        if (neg = Number(this.#register)) this.#register = String(neg * -1);

        if (neg = Number(this.#result)) this.#result = String(neg * -1);
    }

    #setOperator(operator) {
        if (!this.#memory) this.#saveToMemory(this.#result);
        if (this.#register) {
            this.#result = this.#operate(this.#memory, this.#register, this.#operator);
            this.#register = '';
            this.#saveToMemory(this.#result);
        }
        this.#operator = operator;
    }

    #resolve() {
        let valueX = this.#memory || this.#register || this.#result;
        let valueY = this.#shadow || this.#register || this.#result;
        if (this.#memory) this.#shadow = this.#register || this.#result;
        
        this.#result = this.#operate(valueX, valueY, this.#operator);
        
        this.#deleteMemory();
    }

    #operate(a, b, operator) {
        let res;
        a = Number(a);
        b = Number(b);
        switch (operator) {
            case '+':
                res = a + b;
                break;
            case '-':
                res = a - b;
                break;
            case '*':
                res = a * b;
                break;
            case '/':
                res = a / b;
                break;
            default:
        }
        
        return (res !== undefined) ? this.#format(res) : this.#result;
    }

    #format(number) {
        if (!Number.isFinite(number)) return 'MathError';
        if (!(Math.abs(number) < 10000000000000)) return 'OutOfRange';
        let maxLength = (number > 0) ? 13 : 14;
        return String(Number(number.toFixed(11).slice(0, maxLength)));
    }

    #clear() {
        this.#result = '0';
        this.#shadow = '';
        this.#memory = '';
        this.#register = '';
        this.#operator = '';
    }
}

const screen = document.getElementById('display');
let calc = new Calculator();


document.getElementById('keyboard').addEventListener('click', event => {
    
    if (event.target.nodeName == 'BUTTON') {
        screen.textContent = calc.input(event.target.getAttribute('data-key'));
    }
    event.stopPropagation();
});

const keys = document.getElementsByTagName('button');
let changeBackground , pressedButton = 0;

window.addEventListener('keydown', event => {

    if (keyboard.has(event.key)) {
        let color =  '#5ad4a3d6';
        if (isNaN(event.key) && event.key != '.' && event.key != ' ') {
            switch (event.key) {
                case 'Backspace': 
                    color = '#e0b05dd6';
                    break;
                case 'Enter':
                    color = '#52bee2d6';
                    break;
                default:
                    color = '#f06161d6';
            }
        }
        
        clearTimeout(changeBackground);
        clerBackgroud();
        
        pressedButton = keyboard.get(event.key);
        keys[pressedButton].style.setProperty('--defaultColor', color);
        
        screen.textContent = calc.input(event.key);
        
        changeBackground = setTimeout(clerBackgroud, 200);
        event.preventDefault();
    }
});

function clerBackgroud() {
    keys[pressedButton].style.setProperty('--defaultColor', 'transparen'); 
}

const keyboard = new Map();
keyboard.set('0', 16);
keyboard.set('1', 10);
keyboard.set('2', 11);
keyboard.set('3', 12);
keyboard.set('4', 5);
keyboard.set('5', 6);
keyboard.set('6', 7);
keyboard.set('7', 0);
keyboard.set('8', 1);
keyboard.set('9', 2);
keyboard.set('.', 17);
keyboard.set('+', 14);
keyboard.set('-', 9);
keyboard.set('*', 13);
keyboard.set('/', 8);
keyboard.set('Enter', 18);
keyboard.set('Backspace', 4);