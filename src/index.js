const express = require("express");

const app = express();
const port = 5000;

app.use("/api", require("../routes/deposits"));
app.use("/api", require("../routes/withdrawals"));
app.use("/api", require("../routes/customers"));

app.listen(port, () => {
  console.log(`Listening to ${port}...`);
});
