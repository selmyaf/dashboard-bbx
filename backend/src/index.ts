import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import unitRoutes from "./routes/unitRoutes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// route utama
app.use("/api/units", unitRoutes);

// server listen
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
