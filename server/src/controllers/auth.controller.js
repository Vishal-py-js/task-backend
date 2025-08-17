// Authentication controller: register, login, logout.
// Issues JWT as httpOnly cookie on success.

import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { signToken, cookieOptions } from '../utils/token.js';

/**
 * POST /api/v1/auth/register
 * Creates a user, signs a JWT and sets cookie.
 */
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Prevent duplicate emails
  const existing = await User.findOne({ email });
  if (existing) return next(new ApiError(400, 'Email already in use'));

  const user = await User.create({ name, email, password });

  // Create JWT with subject = user._id
  const token = signToken({ sub: user._id.toString() });

  // send cookie + sanitized user
  res
    .status(201)
    .cookie('token', token, cookieOptions)
    .json({ success: true, message: 'Registered', data: user });
});

/**
 * POST /api/v1/auth/login
 * Validate credentials, issue cookie.
 */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new ApiError(401, 'Invalid credentials'));

  const ok = await user.comparePassword(password);
  if (!ok) return next(new ApiError(401, 'Invalid credentials'));

  const token = signToken({ sub: user._id.toString() });

  res.status(200).cookie('token', token, cookieOptions).json({
    success: true,
    message: 'Logged in',
    data: user
  });
  // res.json({
  //     token,
  //     user: { id: user._id, name: user.name, email: user.email }
  //   });
});

/**
 * POST /api/v1/auth/logout
 * Clear cookie
 */
export const logout = asyncHandler(async (_req, res) => {
  // Clear cookie by setting a past expiry and empty value
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: cookieOptions.secure });
  res.json({ success: true, message: 'Logged out' });
});

/**
 * GET /api/v1/auth/me
 * Return current user (optional convenience endpoint). Requires requireAuth.
 */
export const me = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;
  if (!userId) return next(new ApiError(401, 'Unauthorized'));
  const user = await User.findById(userId);
  if (!user) return next(new ApiError(404, 'User not found'));
  res.json({ success: true, data: user });
});
