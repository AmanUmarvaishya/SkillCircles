import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader || authHeader.startsWith(`Bearer`)) {
      return res
        .status(400)
        .json({ success: false, message: "Access token is missing" });
    }
    const token = authHeader.split(" ")[1];

   await jwt.verify(token, process.env.JWT_SECRET, async (errorMonitor, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(400)
            .json({
              success: false,
              message:
                "Access token has expired,use reference token gnerate again",
            });
        }
        return res
          .status(400)
          .json({ success: false, message: "Access token is missing" });
      }
      const { id } = decoded;
      const user = await User.findById(id);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User Not found" });
      }

      req.userId = user._id;
      next();
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
