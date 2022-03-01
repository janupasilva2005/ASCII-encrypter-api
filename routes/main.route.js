const express = require("express");
const data = require("../data/ascii");
const check = require("../helpers/validByte");
const messages = require("../data/output");

const Route = express.Router();

Route.use(express.json());

Route.get("/", (req, res) => {
  res.json({ msg: messages.connected });
});

Route.post("/decryptOne", (req, res) => {
  const { code } = req.body;

  /**
   * If the code is not given
   */
  !code ? res.json({ error: messages.empty }) : "";

  /**
   * Binary code must be 7 characters
   */
  if (code.length !== 7) {
    res.json({ error: messages.length });
  } else {
    if (check(code) === 0) {
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
        res.json({ message: messages.notFound });
      }
    } else {
      res.json({ error: messages.invalid });
    }
  }
});

Route.post("/decrypt", (req, res) => {
  const { code } = req.body;

  !code ? res.json({ error: messages.empty }) : "";

  if (code.length < 7) {
    res.json({ error: messages.length });
  } else {
    // This stores all binary codes with each 7 digits
    var singleCodes = [];

    // Spliting the binary
    for (var i = 0, charsLength = code.length; i < charsLength; i += 7) {
      singleCodes.push(code.substring(i, i + 7));
    }

    let falseDigitCount = 0;

    /**
     * Check whether every binary code contains 7 digits
     */
    for (var i = 0; i < singleCodes.length; i++) {
      if (singleCodes[i].length < 7) {
        falseDigitCount++;
      }
    }

    if (falseDigitCount >= 1) {
      res.json({ error: messages.length });
    } else {
      res.json({ msg: "Nice" });
    }
  }
});

module.exports = Route;
