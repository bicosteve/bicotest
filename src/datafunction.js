const fs = require("fs");

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
