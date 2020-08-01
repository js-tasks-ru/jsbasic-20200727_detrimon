/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  // ваш код...
  let iResult = 1;
  for (let i = 0; i < n; i++) {
    iResult *= n - i;
  }

  return iResult;
}
