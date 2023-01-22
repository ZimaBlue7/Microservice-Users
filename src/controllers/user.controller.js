import User from "../models/User.js";

export const signup = async (req, res) => {
  const { nombre, correo, password, telefono, ciudad, direccion } = req.body;

  const newUser = new User({
    nombre,
    correo,
    password: await User.encryptPassword(password),
    telefono,
    ciudad,
    direccion,
  });

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
