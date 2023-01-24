import Role from "../models/Role.js";

export const createRole = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "User" }).save(),
      new Role({ name: "Admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.log(error);
  }
};
