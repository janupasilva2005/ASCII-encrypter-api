const express = require("express");
const data = require("../data/ascii");

const Route = express.Router();

Route.use(express.json());

Route.get("/", (req, res) => {
  res.json({ msg: "connected" });
});

Route.post("/decryptOne", (req, res) => {
  const { code } = req.body;

  /**
   * If the code is not given
   */
  !code ? res.json({ error: "Please supply the code" }) : "";

  /**
   * Binary code must be 7 characters
   */
  if (code.length !== 7) {
    res.json({ error: "Code must be atleast 7 digits" });
  } else {
    /**
     * Converting binary to decimal
     */
    var decimalNumber = parseInt(code, 2).toString();

    /**
     * If the decimal number is 2 characters adding 0 to the beginning
     */
    if (decimalNumber.length == 2) {
      decimalNumber = "0" + decimalNumber;
    }

    /**
     * Finding the exact character by looping through the data array
     */
    const result = data.find(({ decimal }) => decimal === decimalNumber);

    if (result) {
      res.json({ character: result.char });
    } else {
      res.json({ message: "Character not found" });
    }
  }
});

module.exports = Route;
