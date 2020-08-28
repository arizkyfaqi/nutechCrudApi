const express = require("express");
const produkRoutes = require("./routes/produkRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());

app.use("/api/v1/produks", produkRoutes);

app.use(globalErrorHandler);

module.exports = app;
