// Small helper to avoid repetitive try/catch in async route handlers.
// Usage: router.get('/', asyncHandler(async (req,res) => { ... }));

export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
