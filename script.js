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
  str = str.trim();

  // Check for invalid characters
  const validChars = /^[\d+\-*/\s]+$/;
  if (!validChars.test(str)) {
    const invalidChar = str.split('').find(ch => !ch.match(/[\d\s+\-*/]/));
    throw new OutOfRangeError(invalidChar);
  }

  const compact = str.replace(/\s+/g, '');

  // Check for invalid combinations like ++, +/, etc.
  if (/[\+\-\*\/]{2,}/.test(compact)) {
    throw new InvalidExprError();
  }

  // Starts with invalid operator
  if (/^[+\/*]/.test(compact)) {
    throw new SyntaxError("Expression should not start with invalid operator");
  }

  // Ends with operator
  if (/[\+\-\*\/]$/.test(compact)) {
    throw new SyntaxError("Expression should not end with invalid operator");
  }

  // All good, evaluate
  const result = eval(compact);
  alert("passed");
  console.log("Result:", result);
}

function handleEvaluate() {
  try {
    const input = document.getElementById("input1").value;
    evalString(input);
  } catch (err) {
    alert("failed");
    throw err; // Required so Cypress can catch and check error details
  }
}
