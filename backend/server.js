require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDatabase = require("./config/database");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const reviewRoutes = require("./routes/reviewRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const port = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

app.set("trust proxy", 1); // needed for correct rate limiting behind hosting proxies
app.use(helmet());
app.use(cors({ origin: frontendUrl, methods: ["GET", "POST", "PATCH", "DELETE"] }));
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

connectDatabase();
app.listen(port, () => console.log(`API running on port ${port}`));
