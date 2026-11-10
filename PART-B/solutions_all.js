// ========================================
// Problem 1 — Deep Equal
// ========================================

function deepEqual(objA, objB) {
  // If both values are strictly equal, return true
  if (objA === objB) {
    return true;
  }

  // Check if either value is null or not an object
  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return false;
  }

  // Get the keys of both objects
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // Check if both objects have the same number of keys
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Loop through the keys and compare their values
  for (const key of keysA) {
    if (!Object.hasOwn(objB, key)) {
      return false;
    }

    if (!deepEqual(objA[key], objB[key])) {
      return false;
    }
  }

  // If all checks pass, return true
  return true;
}

console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })) // true
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })) // false
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 }))                     // false

// ========================================
// Problem 2 — Object Diff
// ========================================

function diffObjects(oldObj, newObj) {
    // Create an object to store the differences
    const result = {
        added: {},
        removed: {},
        changed: {}
    };

    // Get the keys from both objects
    const oldKeys = Object.keys(oldObj);
    const newKeys = Object.keys(newObj);

    // Convert the keys into Sets
    const oldKeySet = new Set(oldKeys);
    const newKeySet = new Set(newKeys);

    // Find added and changed properties
    for (const key of newKeys) {
        if (!oldKeySet.has(key)) {
            result.added[key] = newObj[key];
        } else if (oldObj[key] !== newObj[key]) {
            result.changed[key] = {
                from: oldObj[key],
                to: newObj[key]
            };
        }
    }

    // Find removed properties
    for (const key of oldKeys) {
        if (!newKeySet.has(key)) {
            result.removed[key] = oldObj[key];
        }
    }

    // Return the differences
    return result;
}
console.log(diffObjects(
    { name: 'Setemi', role: 'Engineer', country: 'Jamaica' },
    { name: 'Setemi', role: 'Senior Engineer', city: 'Kingston' }
))
// { added: { city: 'Kingston' }, removed: { country: 'Jamaica' }, changed: { role: { from: 'Engineer', to: 'Senior Engineer' } } }

// ========================================
// Problem 3 — Deep Freeze
// ========================================

function deepFreeze(obj) {
    // Check if the value is not an object or is null
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    // Get all the object's property values
    const values = Object.values(obj);

    // Recursively freeze nested objects
    for (const value of values) {
        deepFreeze(value);
    }

    // Freeze the current object
    return Object.freeze(obj);
}

const config = deepFreeze({ api: { baseUrl: 'https://x.com', retries: 3 }, debug: false })
config.api.baseUrl = 'https://changed.com' // should be ignored
config.debug = true                        // should be ignored
console.log(config.api.baseUrl, config.debug) // "https://x.com" false
console.log(Object.isFrozen(config.api))       // true

// ========================================
// Problem 4 — Private Counter Factory 
// ========================================

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

// ========================================
// Problem 5 — Schema Validator
// ========================================

function validateSchema(obj, schema) {
    // Create an empty array for error messages
    const errors = [];

    // Get the schema entries
    const entries = Object.entries(schema);

    // Loop through each schema entry
    for (const [key, expectedType] of entries) {

        // Check if the property exists
        if (!Object.hasOwn(obj, key)) {
            errors.push(`${key}: missing property`);
            continue;
        }

        // Check if the property's type matches
        const actualType = typeof obj[key];

        if (actualType !== expectedType) {
            errors.push(
                `${key}: expected ${expectedType}, got ${actualType}`
            );
        }
    }

    // Return the errors
    return errors;
}
const schema = { name: 'string', age: 'number', isAdmin: 'boolean' }
console.log(validateSchema({ name: 'Ada', age: 21, isAdmin: false }, schema))
// []
console.log(validateSchema({ name: 'Ada', age: '21' }, schema))
// ['age: expected number, got string', 'isAdmin: missing property']

