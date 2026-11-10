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