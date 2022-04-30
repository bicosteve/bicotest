const fs = require("fs");

/*
use fs nodejs file management system to get data from a json file which acts like the specified api end point with all the transactions that is withdrawals and deposits

the customer array will be used to hold all the data from transactions then loop through it to get all the failed transactions

The assumption is, the data from here is from the API which records all the transactions.

The data here will be used by my app which will filter transactions to find the failed deposits and failed withdrawals

*/

const getTransactions = function () {
  try {
    const userData = fs.readFileSync("./api/data.json");
    const customerList = JSON.parse(userData);
    return customerList;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = getTransactions;
