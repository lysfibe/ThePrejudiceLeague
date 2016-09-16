const judge = require('../services/judge');
const express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/judge', function (req, res, next) {
    judge(req.query).then(result => res.json(result));
});

module.exports = router;
