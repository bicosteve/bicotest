const express = require("express");

const app = express();
const port = 5000;

let customers = [];

const depositRouter = require("../routes/deposits");
const withdrawalRouter = require("../routes/withdrawals");
const customersRouter = require("../routes/customers");

app.use(depositRouter);
app.use(withdrawalRouter);
app.use(customersRouter);

module.exports = {
  getCustomers: () => customers,
};

app.listen(port, () => {
  console.log(`Listening to ${port}...`);
});
