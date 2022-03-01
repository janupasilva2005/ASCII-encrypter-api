/**
 * Helper function to check whether the binary code only contains 1s or 0s
 */
module.exports = (binaryCode) => {
  // Error count
  var errorCount = 0;

  /**
   * Looping through every character in the string to verify there is no unwanted characters except 1 or 0
   */
  for (var i = 0; i < binaryCode.length; i++) {
    if (binaryCode[i] === "1" || binaryCode[i] === "0") {
      continue;
    } else {
      errorCount++;
    }
  }

  return errorCount;
};
