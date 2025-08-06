// Custom Error Classes

class OutOfRangeError extends Error {
    constructor(arg) {
        super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
        this.name = "OutOfRangeError";
    }
}

class InvalidExprError extends Error {
    constructor() {
        super("Expression should not have an invalid combination of expression");
        this.name = "InvalidExprError";
    }
}

// Evaluation function
function evalString(str) {
    try {
        str = str.trim();

        // Check for invalid characters (only digits, spaces, +, -, *, / allowed)
        const validChars = /^[\d+\-*/\s]+$/;
        if (!validChars.test(str)) {
            // Find the first invalid character
            const invalidChar = str.split('').find(ch => !ch.match(/[\d\s+\-*/]/));
            throw new OutOfRangeError(invalidChar);
        }

        // Check for invalid operator combinations
        const invalidCombo = /[\+\-\*\/]{2,}/; // e.g., ++, --, //, **, +-, etc.
        if (invalidCombo.test(str.replace(/\s+/g, ''))) {
            throw new InvalidExprError();
        }

        // Check if expression starts or ends with invalid operators
        const trimmed = str.replace(/\s+/g, '');
        if (/^[+\/*]/.test(trimmed)) {
            throw new SyntaxError("Expression should not start with invalid operator");
        }
        if (/[\+\-\*\/]$/.test(trimmed)) {
            throw new SyntaxError("Expression should not end with invalid operator");
        }

        // If everything is valid, evaluate the expression
        let result = eval(str);
        console.log(result);
    } catch (err) {
        console.log(`${err.name}: ${err.message}`);
    }
}
