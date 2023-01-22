import Admin from "../models/Admin";

export const signup = async (req, res) => {
  const { nombre, correo, password, telefono, ciudad, direccion } = req.body;

  const newAdmin = new Admin({
    nombre,
    correo,
    password: await Admin.encryptPassword(password),
    telefono,
    ciudad,
    direccion,
  });

  const savedAdmin = await newAdmin.save();

  res.status(200).json(savedAdmin);
};

export const signin = async (req, res) => {
  const adminFound = await Admin.findOne({ email: req.body.email });
  if (!adminFound) return res.status(400).json({ message: "Admin not found" });

  const matchPassword = await Admin.comparePassword(
    req.body.password,
    adminFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ message: "Invalid password" });

  res.json(adminFound);
};
