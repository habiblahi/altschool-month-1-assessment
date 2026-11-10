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