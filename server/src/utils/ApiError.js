// Custom error class to standardize errors across the app.
// Controllers and middleware should throw ApiError to get consistent responses.

export class ApiError extends Error {
  /**
   * @param {number} statusCode HTTP status code to return
   * @param {string} message Short human-readable message
   * @param {Array} errors Optional array of field-level errors
   */
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
