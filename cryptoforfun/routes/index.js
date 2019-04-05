var express = require('express');
var router = express.Router();

router.use(express.static('public'));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
  //res.sendfile('index.html');
});

module.exports = router;
