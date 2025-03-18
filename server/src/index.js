import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import api from "./route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", api);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
