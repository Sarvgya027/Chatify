import jwt from "jsonwebtoken";

// This function generates a JWT token and sets it as a cookie in the response
const generateTokenAndSetCookie = (userId, res) => {
  // Create a JWT token with the userId as the payload, using the JWT_SECRET from the environment variables
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d", // The token will expire in 15 days
  });

  // Set the JWT token as a cookie in the response
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // The cookie will expire in 15 days (same as the token)
    httpOnly: true, // The cookie can only be accessed by the server, not client-side scripts
    sameSite: "strict", // The cookie will only be sent for same-site requests
    secure: process.env.NODE_ENV === "production", // The cookie will only be sent over HTTPS
  });
};
export default generateTokenAndSetCookie;
