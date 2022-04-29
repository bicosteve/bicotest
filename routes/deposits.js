const express = require("express");

const route = express();

const getCustomers = require("../src/datafunction");
const customers = getCustomers();

route.get("/deposits", (req, res) => {
  let deposits = [];
  for (customer of customers) {
    if (customer.transactionType === "deposit" && !customer.completed) {
      deposits.push(customer);
    }
  }
  return res.send(deposits);
});

route.get("/deposits/number/:number", (req, res) => {
  const number = req.params.number;

  const user = customers.find((customer) => customer.phoneNumber === number);

  if (!user) {
    return res.send({ msg: "User not found" });
  }

  return res.send(user);
});

route.get("/deposits/code/:code", (req, res) => {
  const code = req.params.code;

  const user = customers.find((customer) => customer.code === code);

  if (!user) {
    return res.send({ msg: "User not found" });
  }

  return res.send(user);
});

module.exports = route;
