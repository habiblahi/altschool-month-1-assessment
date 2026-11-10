function createCounter() {
    // Create a private variable
    let count = 0;

    // Return an object containing methods and a getter
    return {
        increment() {
            count++;
        },

        decrement() {
            count--;
        },

        get value() {
            return count;
        }
    };
}

const counter = createCounter()
counter.increment()
counter.increment()
counter.decrement()
console.log(counter.value)  // 1
console.log(counter.count)  // undefined — not directly accessible