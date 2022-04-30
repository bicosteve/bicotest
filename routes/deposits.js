const express = require("express");

const route = express();

// THIS ROUTER IS FOR ALL FAILED DEPOSIT TRANSACTIONS

const getCustomers = require("../src/datafunction");
const customers = getCustomers();

route.get("/deposits", (req, res) => {
  //filter all the failed deposit and push then into an array
  let deposits = [];
  for (customer of customers) {
    if (customer.transactionType === "deposit" && !customer.completed) {
      deposits.push(customer);
    }
  }
  return res.status(200).send({
    msg: `There are ${deposits.length} failed deposit transactions`,
    data: deposits,
  });
});

//GET SPECIFIC FAILED DEPOSIT WITH PHONE NUMBER
route.get("/deposits/number/:number", (req, res) => {
  const number = req.params.number;

  const user = customers.find((customer) => customer.phoneNumber === number);

  if (!user) {
    return res.status(404).send({ msg: "User not found" });
  }

  return res.status(200).send(user);
});

//GET SPECIFIC FAILED DEPOSIT WITH TRANSACTION CODE
route.get("/deposits/code/:code", (req, res) => {
  const code = req.params.code;

  const transaction = customers.find((customer) => customer.code === code);

  if (!transaction) {
    return res.status(404).send({ msg: "Transaction not found not found" });
  }

  return res.status(200).send(transaction);
});

module.exports = route;
