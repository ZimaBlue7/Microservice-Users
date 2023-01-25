import User from "../models/User.js";
import Role from "../models/Role.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "No token provider" });

    const decoded = jwt.verify(token, config.SECRET);
    req.id = decoded.id;
    const user = User.findById(req.id, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorize" });
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.id);
  const role = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < role.length; i++) {
    if (role[i].name === "Admin") {
      next();
      return;
    }
  }

  return res.status(403).json({ message: "Require admin role" });
};
