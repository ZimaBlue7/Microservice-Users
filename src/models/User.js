import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      unique: true,
    },
    correo: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    telefono: {
      type: String,
      require: true,
    },
    ciudad: {
      type: String,
      require: true,
    },
    direccion: {
      type: String,
      require: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivePassword) => {
  return await bcrypt.compare(password, receivePassword);
};

export default model("User", userSchema);
