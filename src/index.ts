require("dotenv").config();
import app from "./app";
import { connectDB } from "./database/service/dbService";

app.listen(process.env.PORT || 3000, async () => {
  console.log("Server Started");
  await connectDB();
});
