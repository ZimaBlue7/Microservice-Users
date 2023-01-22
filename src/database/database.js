import moongose from "mongoose";

moongose
  .connect("mongodb://localhost/ferreteria")
  .then((db) => console.log("DB is conected"))
  .catch((error) => console.log(error));
