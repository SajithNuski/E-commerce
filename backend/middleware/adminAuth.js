import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || req.headers.token;
    if (!header) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }
    const token =
      typeof header === "string" && header.startsWith("Bearer ")
        ? header.split(" ")[1]
        : header;
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if (
      tokenDecoded.email !== process.env.ADMIN_EMAIL ||
      tokenDecoded.password !== process.env.ADMIN_PASSWORD
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
