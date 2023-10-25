import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const User = require("../models/User");

const protect = async (req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    req.token = req.headers.authorization.split(" ")[1];
  }
  if (!req.token || req.token === "null") {
    return res
      .status(401)
      .json({ success: false, message: "Not authorize to access this route" });
  }
  try {

    const decoded = jwt.verify(req.token, process.env.JWT_SECRET || "") as JwtPayload;
    console.log(decoded);
    req.user = await User.findById(decoded.id || 0);
    next();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.stack);
    }
    return res
      .status(401)
      .json({ success: false, message: "Not authorize to access this route" });
  }
};

const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user?.role} is not authorized to access this route`,
      });
    }
    next();
  };
};

export { protect, authorize };
