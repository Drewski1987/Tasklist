import app from "#app";
import db from "#db/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const PORT = process.env.PORT ?? 3000;



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
