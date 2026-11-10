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