class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not '${arg}'`);
    this.name = "OutOfRangeError";
  }
}

class InvalidExprError extends Error {
  constructor() {
    super("Expression should not have an invalid combination of expression");
    this.name = "InvalidExprError";
  }
}

function evalString(str) {
  try {
    str = str.trim();

    const validChars = /^[\d+\-*/\s]+$/;
    if (!validChars.test(str)) {
      const invalidChar = str.split('').find(ch => !ch.match(/[\d\s+\-*/]/));
      throw new OutOfRangeError(invalidChar);
    }

    const compact = str.replace(/\s+/g, '');
    if (/[\+\-\*\/]{2,}/.test(compact)) {
      throw new InvalidExprError();
    }

    if (/^[+\/*]/.test(compact)) {
      throw new SyntaxError("Expression should not start with invalid operator");
    }

    if (/[\+\-\*\/]$/.test(compact)) {
      throw new SyntaxError("Expression should not end with invalid operator");
    }

    const result = eval(compact);
    alert("passed");
    console.log(result);
  } catch (err) {
    alert("failed");
    throw err; // Cypress will catch this
  }
}

function evaluate() {
  const input = document.getElementById("input1").value;
  evalString(input);
}
