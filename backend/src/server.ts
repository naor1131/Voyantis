import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import queueRoutes from "./routes/queue";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", queueRoutes);

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start the server: ", err);
    process.exit(1);
  }
};

startServer();
