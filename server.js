/* eslint-disable @typescript-eslint/no-var-requires */
const compression = require("compression");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(express.static("dist"));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running  http://localhost:${PORT}`);
});
