function rpn(expression) {
  class RPN {
    constructor(expression) {
    this.data = 0;
    this.stack = [];
    this.operators = ["+", "-", "*", "/"];
    this.expression = expression.split(" ");   // not splitting data !!!!! 
    }

    push(value) {
    this.stack[this.data] = value;
    this.data++;
    }

    pop() {
    if (this.data === 0) {
      return undefined;
    }
    this.data--;
    const result = this.stack[this.data];
    delete this.stack[this.data];
    return result;
    }

    peek() {
    return this.stack[this.data - 1];
    }

    size() {
    return this.data;
    }

    evaluate() {
    const operators = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b
    };

    const tokens = this.expression;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (this.operators.includes(token)) {
        const a = this.pop();   // el orden de los factores si altera el producto
        const b = this.pop();
        const result = operators[token](a, b);
        this.push(result); //intercambio
      } else {
        this.push(parseFloat(token));
      }
    }
    return this.pop();
    }
  }

  const theRpn = new RPN(expression);
  return theRpn.evaluate();
}

// valida si los datos proveidos son validos
function validate(expression) {
  if (!/^[0-9+\-*/\s]+$/.test(expression)) {
    alert("Please insert a valid expression");
    return false;
  }
  if (expression.trim() === "") {
    alert("Please insert an expression");
    return false;
  }
  return true;
}


// boton calculate
function calcularResultado() {
  const expression = document.getElementById("val").value;
  if (!validate(expression)) {
    return;
  }
  const resultado = rpn(expression);
  document.getElementById("resultado").textContent = resultado;
}