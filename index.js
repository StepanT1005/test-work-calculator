'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const calculatorScreen = document.querySelector('#calculatorScreen');
  const resultScreen = document.querySelector('#resultScreen');
  const calculatorKeys = document.querySelector('.calculator-keys');

  let displayValue = '';
  let result = '';

  const updateScreen = (value) => {
    calculatorScreen.value = value;
  };

  // Funkce pro sanitaci vstupního řetězce před jeho odesláním do evaluateExpression
  // Odstraní všechny znaky kromě povolených: 0123456789+-*/., aby se snížilo riziko spuštění škodlivého kódu
  const sanitizeInput = (input) => {
    const allowedChars = '0123456789+-*/.';
    let sanitized = '';
    for (const char of input) {
      if (allowedChars.includes(char)) {
        sanitized += char;
      }
    }
    return sanitized;
  };

  // Funkce pro provedení výpočtu na základě vstupního řetězce
  const evaluateExpression = (expression) => {
    const sanitizedExpression = sanitizeInput(expression);
    return Function('"use strict";return (' + sanitizedExpression + ')')();
  };

  // Funkce pro zpracování vstupu čísla
  const handleNumber = (number) => {
    const lastNumber = displayValue.split(/[+\-*/]/).pop();

    // Zamezuje zadání více nul na začátku čísla
    if (lastNumber === '0' && number === '0') {
      return;
    }

    // Zamezuje zadání jiného čísla než desetinné čárky po nule
    if (lastNumber === '0' && number !== '.') {
      displayValue = displayValue.slice(0, -1) + number;
    } else {
      displayValue += number;
    }

    // Aktualizuje obrazovku kalkulačky novou hodnotou
    updateScreen(displayValue);
    calculate();
  };

  // Funkce pro zpracování vstupu operátoru
  const handleOperator = (operator) => {
    const lastChar = displayValue.at(-1);

    // Pokud poslední znak je operátor, nahradí ho novým operátorem
    if (['+', '-', '*', '/'].includes(lastChar)) {
      displayValue = displayValue.slice(0, -1) + operator;
    } else {
      // Jinak přidá nový operátor na konec displayValue
      displayValue += operator;
    }
    updateScreen(displayValue);
  };

  // Funkce pro zpracování vstupu desetinné čárky
  const handleDecimal = () => {
    const lastNumber = displayValue.split(/[+\-*/]/).pop();

    // Pokud poslední číslo neobsahuje desetinnou čárku, přidá ji
    if (!lastNumber.includes('.')) {
      displayValue += '.';
      updateScreen(displayValue);
    }
  };

  // Funkce pro provedení výpočtu aktuálního výrazu
  const calculate = () => {
    const lastChar = displayValue.at(-1);

    if (['+', '-', '*', '/'].includes(lastChar)) {
      return;
    }

    if (!displayValue) {
      return;
    }

    try {
      result = evaluateExpression(displayValue).toString();

      // Kontroluje, zda je výsledek konečný číslo (například není dělení nulou)
      if (!isFinite(result)) {
        throw new Error('Division by zero is not allowed.');
      }
    } catch (error) {
      result = 'Error' + error;
    } finally {
      resultScreen.value = result;
    }
  };

  // Funkce pro zpracování stisku klávesy Backspace
  const handleBackspace = () => {
    displayValue = displayValue.slice(0, -1);
    updateScreen(displayValue);
    calculate();
  };

  // Funkce pro zpracování zobrazení výsledku
  const handleResult = () => {
    if (result.includes('Error')) {
      return;
    }

    displayValue = result;
    updateScreen(displayValue);
  };

  // Funkce pro vymazání všech hodnot
  const clearAll = () => {
    displayValue = '';
    updateScreen(displayValue);
    resultScreen.value = '';
  };

  // Funkce pro zpracování stisků kláves na klávesnici
  const handleKeyPress = (event) => {
    const { key } = event;
    if (!isNaN(key)) {
      handleNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
      handleOperator(key);
    } else if (key === '.') {
      handleDecimal();
    } else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      handleResult();
    } else if (key === 'Escape') {
      clearAll();
    } else if (key === 'Backspace' || key === 'Delete') {
      handleBackspace();
    }
  };

  // Přidává obsluhu událostí pro kliknutí na tlačítka kalkulačky
  calculatorKeys.addEventListener('click', (e) => {
    const { value } = e.target;
    if (!value) {
      return;
    }

    switch (value) {
      case 'all-clear':
        clearAll();
        break;
      case 'delete':
        handleBackspace();
        break;
      case '=':
        handleResult();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        handleOperator(value);
        break;
      case '.':
        handleDecimal();
        break;
      default:
        handleNumber(value);
    }
  });

  document.addEventListener('keydown', handleKeyPress);
});
