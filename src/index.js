const fs = require("fs");

const express = require("express");

const app = express();
const port = 5000;

let customers = [];

/*
use fs nodejs file management system to get data from a json file which acts like the specified api end point with all the transactions that is withdrawals and deposits

the customer array will be used to hold all the data from transactions then loop through it to get all the failed transactions

*/
try {
  const userData = fs.readFileSync("./api/data.json");
  const customerList = JSON.parse(userData);
  customers = customerList;
} catch (error) {
  console.log(error);
}

//console.log(customers);

//GETTING ALL THE CUSTOMERS TRANSACTIONS
app.get("/customers", (req, res) => {
  res.send(customers);
});

//ALL FAILED WITHDRAWALS
app.get("/withdrawals", (req, res) => {
  let withdrawals = [];
  for (customer of customers) {
    if (customer.transactionType === "deposit" && !customer.completed) {
      withdrawals.push(customer);
    }
  }
  return res.send(withdrawals);
});

//ALL FAILED DEPOSITS
app.get("/deposits", (req, res) => {
  let deposits = [];
  for (customer of customers) {
    if (customer.transactionType === "withdrawal" && !customer.completed) {
      deposits.push(customer);
    }
  }
  return res.send(deposits);
});

//GETTING FAILED DEPOSIT WITH PHONE NUMBERS AND TRANSACTION CODE
app.get("/withdrawals/number/:number", (req, res) => {
  const number = req.params.number;

  const user = customers.find((customer) => customer.phoneNumber === number);

  if (!user) {
    return res.send({ msg: "User not found" });
  }

  return res.send(user);
});

app.get("/withdrawals/code/:code", (req, res) => {
  const code = req.params.code;

  const user = customers.find((customer) => customer.code === code);

  if (!user) {
    return res.send({ msg: "User not found" });
  }

  return res.send(user);
});

app.get("/deposits/number/:number", (req, res) => {
  const number = req.params.number;

  const user = customers.find((customer) => customer.phoneNumber === number);

  if (!user) {
    return res.send({ msg: "User not found" });
  }

  return res.send(user);
});

app.get("/deposits/code/:code", (req, res) => {
  const code = req.params.code;

  const user = customers.find((customer) => customer.code === code);

  if (!user) {
    return res.send({ msg: "User not found" });
  }

  return res.send(user);
});

app.listen(port, () => {
  console.log(`Listening to ${port}...`);
});
