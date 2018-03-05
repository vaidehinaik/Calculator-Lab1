var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/doOperation', function(req, res, next) {
      var arg_1 = parseInt(req.body.arg_1);
      var arg_2 = parseInt(req.body.arg_2);
      var opr = req.body.operation;
      console.dir(req.body);
      var result = null;
      if (opr === 'Add') {
          result = arg_1 + arg_2;
      }
      else if (opr === 'Subtract') {
          result = arg_1 - arg_2;
      }
      else if (opr === 'Multiply') {
          result = arg_1 * arg_2;
      }
      else if (opr === 'Divide') {
          result = arg_1/arg_2;
      }

      var json_obj = {message: "The result of operation " + opr + ": ", result: result};
      if (result === null) {
          res.status(401).json(json_obj);
      } else {
          res.status(200).json(json_obj);
      }
});

module.exports = router;
