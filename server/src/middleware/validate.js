// Middleware to validate req.body against a zod schema.
// If validation fails, throws a ZodError which our errorHandler converts.

export const validateBody = (schema) => (req, _res, next) => {
  // parseAsync supports async refinements; using parse is fine here
  try {
    req.body = schema.parse(req.body);
    return next();
  } catch (err) {
    return next(err); // will be handled by errorHandler (recognizes ZodError)
  }
};
