const express = require('express');
const router = express.Router();
const search = require('../services/imagesearch')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/imagefor', (req, res) => res.render('eno', {}))
router.get('/imagefor/:term', (req, res) => {
  search.getFirstUrl(req.params.term)
    .then(
      data => res.status(200).send(data),
      err => res.status(500).json(err)
    )
})

module.exports = router;
