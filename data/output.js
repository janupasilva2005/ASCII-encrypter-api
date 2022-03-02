/**
 * Output Messages
 */
module.exports = {
  /**
   * Connection message to check if the server is running without any problem
   */
  connected: "Connected",
  /**
   * Message to return if the request body is empty or empty strings
   */
  empty: "Please provide the inputs",
  /**
   * ASCII binary code must contain 7 digits, if not this will return
   */
  length: "Code must be 7 digits",
  /**
   * If a specific character is not found, this will returns
   */
  notFound: "Character not found",
  /**
   * If one of the provided binary digits are not valid, this will return
   *  ex - 100as01, 1aasf01
   */
  invalid: "Contains invalid binary digits",
};
