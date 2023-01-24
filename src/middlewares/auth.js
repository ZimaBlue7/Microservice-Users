import User from "../models/User";
import Role from "../models/Role";

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
