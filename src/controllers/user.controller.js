import User from "../models/User.js";
import Role from "../models/Role.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

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

  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400, //24 horas
  });

  res.status(200).json({ token });
};

export const signin = async (req, res) => {
  const userFound = await User.findOne({ correo: req.body.correo }).populate(
    "roles"
  );
  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 84600,
  });

  res.json({ token });
};
