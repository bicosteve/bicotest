const express = require("express");

const app = express();
const port = 5000;

let customers = [];

const depositRouter = require("../routes/deposits");
const withdrawalRouter = require("../routes/withdrawals");
const customersRouter = require("../routes/customers");

/*
use fs nodejs file management system to get data from a json file which acts like the specified api end point with all the transactions that is withdrawals and deposits

the customer array will be used to hold all the data from transactions then loop through it to get all the failed transactions

*/

app.use(depositRouter);
app.use(withdrawalRouter);
app.use(customersRouter);

module.exports = {
  getCustomers: () => customers,
};

app.listen(port, () => {
  console.log(`Listening to ${port}...`);
});
