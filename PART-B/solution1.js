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