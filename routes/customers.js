const express = require("express");

const route = express();

const getCustomers = require("../src/datafunction");
const customers = getCustomers();

//GETTING ALL THE CUSTOMERS TRANSACTIONS
route.get("/customers", (req, res) => {
  res.send(customers);
});

module.exports = route;
