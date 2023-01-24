import User from "../models/User.js";
import Role from "../models/Role.js";

export const signup = async (req, res) => {
  const { nombre, correo, password, telefono, ciudad, direccion, roles } =
    req.body;

  const newUser = new User({
    nombre,
    correo,
    password: await User.encryptPassword(password),
    telefono,
    ciudad,
    direccion,
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "User" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  res.status(200).json(savedUser);
};

export const signin = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });
  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ message: "Invalid password" });

  res.json(userFound);
};
