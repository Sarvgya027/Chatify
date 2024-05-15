// Import jwt library for token verification and the User model
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware function to protect routes
const protectRoute = async (req, res, next) => {
  try {
    // Retrieve token from request cookies
    const token = req.cookies.jwt;

    // Check if token is provided
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - no token provided" });
    }

    // Verify the token with the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token is valid
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    }

    // Find the user based on the decoded userId and exclude the password field
    const user = await User.findById(decoded.userId).select("-password");

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - invalid user" });
    }

    // Set the user in the request object for future use
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors that occur during token verification or user retrieval
    res.status(500).json({ message: error.message });
    console.log("error in protectRoute middleware", error);
  }
};

// Export the protectRoute middleware function
export default protectRoute;

