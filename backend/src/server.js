import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import { connectToMongo } from "./config/databaseConnection.js";

const port = process.env.PORT || 5000;
connectToMongo();

app.listen(port, () => {
  console.log(`server running on the port ${port}`);
});
