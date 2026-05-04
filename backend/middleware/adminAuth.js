import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }
    const tokenDecocde = jwt.verify(token, process.env.JWT_SECRET);
    if (
      tokenDecocde.email !== process.env.ADMIN_EMAIL ||
      tokenDecocde.password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
export default adminAuth;
