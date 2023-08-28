function checkParenthesis(text) {
    const left = "([{";
    const right = ")]}";
    const stack = [];
    for (char of text) {
        if (left.includes(char)) {
            stack.push(char);
        } else if (right.includes(char)) {
            const stackTop = stack[stack.length - 1];
            if (stackTop === "(" && char === ")"  
                || stackTop === "[" && char === "]" 
                || stackTop === "{" && char === "}") {
                stack.pop();
            } else {
                return false;
            }
        }
    }
    return true;
}

const validText = "()[]{}";
const invalidText = "()}{";
const validFunction = "function test() {}"

console.log(checkParenthesis(validText));
console.log(checkParenthesis(invalidText));
console.log(checkParenthesis(validFunction));