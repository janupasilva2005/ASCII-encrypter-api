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
    var singleDigits = [];

    // Spliting the binary
    for (var i = 0, charsLength = code.length; i < charsLength; i += 7) {
      singleDigits.push(code.substring(i, i + 7));
    }

    let falseDigitCount = 0;

    /**
     * Check whether every binary code contains 7 digits
     */
    for (var i = 0; i < singleDigits.length; i++) {
      if (singleDigits[i].length < 7) {
        falseDigitCount++;
      }
    }

    /**
     * If there are any false digit counts return error
     */
    if (falseDigitCount >= 1) {
      res.json({ error: messages.length });
    } else {
      // Digits cannot contain characters except 1s and 0s
      let invalidDigitCount = 0;

      /**
       * Checking each digit for invalid characters
       */
      singleDigits.forEach((digit) => {
        check(digit) === 0 ? "" : invalidDigitCount++;
      });

      if (invalidDigitCount != 0) {
        res.json({ error: messages.invalid });
      } else {
        /**
         * Final output decoded string
         */
        let outString = "";

        /**
         * Mapping the binaries and creating decimals
         */
        const decimalValues = singleDigits.map((digit) => {
          return parseInt(digit, 2).toString();
        });

        /**
         * Filtering each decimal to 3 digit decimal
         */
        const filteredDecimals = decimalValues.map((value) => {
          if (value.length == 2) {
            return "0" + value;
          } else {
            return value;
          }
        });

        /**
         * Final function
         */
        filteredDecimals.forEach((value) => {
          var result = data.find(({ decimal }) => decimal === value);
          if (result) {
            outString += result.char;
          } else {
            outString += "404";
          }
        });

        res.json({ data: { result: outString } });
      }
    }
  }
});

Route.post("/encrypt", (req, res) => {
  const { msg } = req.body;

  if (msg && msg.length >= 1) {
    const charArray = msg.split("");

    var binaryString = "";
    var invalidChar = 0;

    charArray.forEach((character) => {
      const result = data.find(({ char }) => char === character);

      if (result) {
        let toPush = parseInt(result.decimal).toString(2);
        if (toPush.length === 6) {
          toPush = "0" + toPush;
        }

        binaryString += toPush;
      } else {
        invalidChar = 1;
      }
    });

    invalidChar === 1 ? res.json({ error: messages.notFound }) : "";

    if (binaryString) {
      res.json({ data: binaryString });
    }
  } else {
    res.json({ error: messages.empty });
  }
});

module.exports = Route;
