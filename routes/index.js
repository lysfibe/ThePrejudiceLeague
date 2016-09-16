const express = require('express');
const router = express.Router();
const search = require('../services/imagesearch');
const judge = require('../services/judge');
const actorWithFace = require('../services/actorwithface');
const fs = require('fs');

/* GET home page. */

router.get('/', function (req, res, next) {
    res.render('index', {title: 'The Prejudice League'});
});


// query should contain url, html or text
router.get('/judge', function (req, res, next) {
    judge(req.query).then(result => res.json(result));
});


// query should contain actorName, faceName, height
router.get('/actorWithFace', function (req, res, next) {
    actorWithFace(req.query)
        .then(result => {
          const stamp = Date.now()
          const path = `./tmp/${stamp}.png`
          result.write(path, (err, r) => {
            const f = fs.createReadStream(path)
            f.pipe(res)
          })
        })
        .catch(err => console.error(err || 'UNKNOWN ERROR'));
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
