// Authentication middleware: reads httpOnly cookie "token", verifies JWT,
// attaches user info to req.user (containing id).
// If no token or invalid token -> throw 401 ApiError.

import { ApiError } from '../utils/ApiError.js';
import { verifyToken } from '../utils/token.js';

export const requireAuth = async(req, _res, next) => {
  //Cookie parser must populate req.cookies
  const token = req.cookies?.token;
  if (!token) return next(new ApiError(401, 'Unauthorized: no token'));

  try {
    const payload = verifyToken(token);
    // Standard practice: put user id in sub claim
    req.user = { id: payload.sub };
    return next();
  } catch (err) {
    return next(new ApiError(401, 'Unauthorized: invalid or expired token'));
  }

  // try {
  //   // ✅ Get token from Authorization header
  //   const authHeader = req.headers.authorization;
  //   console.log(authHeader);

  //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //     return _res.status(401).json({ message: "No token, authorization denied" });
  //   }

  //   const token = authHeader.split(" ")[1]; // Extract token part

  //   // Verify token
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   // Attach user to request
  //   req.user = await User.findById(decoded.id).select("-password");

  //   next();
  // } catch (err) {
  //   _res.status(401).json({ message: "Token is not valid" });
  // }
};
