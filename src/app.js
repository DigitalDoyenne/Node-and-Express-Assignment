const { NODE_ENV = "development" } = process.env;
const express = require("express");
const morgan = require("morgan");
const app = express();

// Application-level middleware
app.use(morgan("dev"));

// Router-level middleware
const validateZip = require("./middleware/validateZip");
const validateAdmin = require("./middleware/validateAdmin");
const getZoos = require("./utils/getZoos");

// Routes
app.get("/zoos/all", validateAdmin, (req, res, _next) => {
  const content = `All zoos: ${getZoos().join("; ")}`;
  res.send(content);
});

app.get("/check/:zip", validateZip, (req, res, _next) => {
  const { zip } = req.params;
  const zoos = getZoos(zip);
  const content = zoos
    ? `${zip} exists in our records.`
    : `${zip} does not exist in our records.`;
  res.send(content);
});

app.get("/zoos/:zip", validateZip, (req, res, _next) => {
  const { zip } = req.params;
  const zoos = getZoos(zip);
  const content = zoos.length > 0 
  ? `${zip} zoos: ${zoos.join("; ")}`
  : `${zip} has no zoos.`;
  res.send(content);
});

// Error handling
app.use((req, res, next) => {
  res.send("That route could not be found!");
});

app.use((err, req, res, next) => {
  err = err || "Internal server error!";
  res.send(err);
});

module.exports = app;