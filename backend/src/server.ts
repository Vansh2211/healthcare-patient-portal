import express from "express";
import cors from "cors";
import documentRoutes from "./routes/document";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/documents", documentRoutes);

app.listen(5000, () => console.log("Backend running on port 5000"));
