import User from "../models/User.js";

export const checkDuplicateUser = async (req, res, next) => {
  const user = await User.findOne({ nombre: req.body.nombre });

  if (user) return res.status(400).json({ message: "The user already exist" });

  const correo = await User.findOne({ correo: req.body.correo });

  if (correo)
    return res.status(400).json({ message: "The user already exist" });
  next();
};
