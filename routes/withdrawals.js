const express = require("express");

// THIS ROUTER IS FOR ALL FAILED WITHDRAWALS TRANSACTIONS

const getCustomers = require("../src/datafunction");
const customers = getCustomers();

const route = express();

//ALL WITHDRAWAL FAILS
route.get("/withdrawals", (req, res) => {
  let withdrawals = [];
  for (customer of customers) {
    if (customer.transactionType === "withdrawal" && !customer.completed) {
      withdrawals.push(customer);
    }
  }
  return res.status(200).send({
    msg: `There are ${withdrawals.length} failed withdrawal transactions`,
    data: withdrawals,
  });
});

//GETTING SPECIFIC WITHDRAWALS WITH PHONE NUMBER
route.get("/withdrawals/number/:number", async (req, res) => {
  const number = req.params.number;

  const user = await customers.find((customer) => customer.phoneNumber === number);

  if (!user) {
    return res.status(404).send({ msg: "User not found" });
  }

  return res.status(200).send(user);
});

//GETTING SPECIFIC WITHDRAWAL WITH TRANSACTION CODE
route.get("/withdrawals/code/:code", async (req, res) => {
  const code = req.params.code;

  const user = await customers.find((customer) => customer.code === code);

  if (!user) {
    return res.status(404).send({ msg: "User not found" });
  }

  return res.status(200).send(user);
});

module.exports = route;
