const { assert } = require('chai');

module.exports = (voice, text, fromExpected, toExpected) => ({
  calls: {
    create: ({ from, to, twiml }) => new Promise((resolve, reject) => {
      try {
        assert.equal(fromExpected, from);
        assert.equal(toExpected, to);
        assert.equal(
          `<Response><Say voice="${voice}">${text}</Say></Response>`, twiml
        );
        resolve();
      } catch ({ message }) {
        reject(message);
      }
    })
  }
});
