var express = require('express');
var router = express.Router();

var MySemaphore = require('../api/semaphore');
var semaphore = new MySemaphore().getInstance();

const MS_INSIDE_SEMAPHORE = 1000;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/semaphore', function(req, res, next) {
  console.log((new Date()).toISOString() + ' - /get start');

  semaphore.getA()
    .acquire()
    .then(function(result) {
      console.log((new Date()).toISOString() + ' - /get semaphore acquired');

      setTimeout(function() {
        semaphore.getA().release();
        console.log((new Date()).toISOString() + ' - /get semaphore released');
        console.log((new Date()).toISOString() + ' - /get end');
        res.render('semaphore', { title: 'Access controlled by semaphores' });
      }, MS_INSIDE_SEMAPHORE);
    });
});


module.exports = router;
