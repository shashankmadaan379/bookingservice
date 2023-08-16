class AppError extends Error {
  constructor(message, name, explanation, statusCode) {
    super();
    this.name = name;
    this.message = message;
    this.explanation = explanation;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
