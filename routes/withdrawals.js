const express = require("express");

// THIS ROUTER IS FOR ALL FAILED WITHDRAWALS TRANSACTIONS

const getCustomers = require("../src/datafunction");
const customers = getCustomers();

console.log(customers);

const route = express();

route.get("/withdrawals", (req, res) => {
  let withdrawals = [];
  for (customer of customers) {
    if (customer.transactionType === "withdrawal" && !customer.completed) {
      withdrawals.push(customer);
    }
  }
  return res.send({
    msg: `There are ${withdrawals.length} failed withdrawal transactions`,
    data: withdrawals,
  });
});

route.get("/withdrawals/number/:number", (req, res) => {
  const number = req.params.number;

  const user = customers.find((customer) => customer.phoneNumber === number);

  if (!user) {
    return res.send({ msg: "User not found" });
  }

  return res.send(user);
});

route.get("/withdrawals/code/:code", (req, res) => {
  const code = req.params.code;

  const user = customers.find((customer) => customer.code === code);

  if (!user) {
    return res.send({ msg: "User not found" });
  }

  return res.send(user);
});

module.exports = route;
