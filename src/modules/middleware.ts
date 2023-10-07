import { validationResult } from "express-validator";



export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next()
  }
}

export const Admin = (req, res, next) => {
  // Check if user object and role exist
  if (!req.user || !req.user.role) {
    res.status(500).json({message: 'User data unavailable'});
    return;
  }
  
  const { role } = req.user;

  // Check user role
  if (role !== "admin") {
    res.status(401).json({message: 'Not authorized', error: 'insufficient_role'});
    return;
  }
  
  // Proceed to the next middleware/route
  next();
};
