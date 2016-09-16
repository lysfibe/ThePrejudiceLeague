const images = require("images");
const path = require('path');
const http = require('http');
const fs = require('fs');
const imageSearch = require('./imagesearch');
const ACTORS = require('../resources/actors');

if (!Array.isArray(ACTORS)) {
    console.error('INVALID ACTORS FILE - MUST BE ARRAY');
}


/**
 * Returns an image of an actor with a face.
 */
module.exports = function (query) {
    var actor = findActor(query.actorName);
    var result = findFace(query.faceName)
        .then(face => heroWithFace(actor, face))
        .then(function (combined) {
            combined.height(query.height)
            console.log('RESULT:\n', result);
            return combined;
        });
    return result;
};

/**
 * @param name Name of the person to search for.
 * @returns {{name: *, url: *}}
 */
function findFace(name) {
    //console.log('NAME: ', name);
    return imageSearch.getFirstUrl(name)
        .then(function (url) {
            var face = {name: name, url: url}
            console.log('FACE:\n', face);
            return face;
        });

}

/**
 * Gets ACTOR with name
 */
function findActor(name) {
    var actor = ACTORS.filter(actor => actor.name = name)[0];
    console.log('ACTOR:\n', actor);
    return actor;
}

/**
 * Applies face to hero
 * @param actor An element from ACTORS
 * @param face An object with url property
 */
const heroWithFace = (actor, face) => new Promise((resolve, reject) => {

    // e.g. {directory}/resources/four-Boris_Jonson.png
    var facePath = path.join(
        global.ROOT, 'resources',
        face.name.replace(' ', '_') + '.' + face.url.split('.').pop());

    console.log('BEFORE');

    imageFromURL(face.url, facePath).then(
        function (path) {
            console.log('AFTER');

            var faceImage = images(path).resize(actor.faceWidth);

            var combined = images(actor.name + '.png').draw(images(faceImage), actor.faceX, actor.faceY);

            resolve(combined);
        },
        function (err) {
            reject(err);
        });
});

/**
 * Gets image from url
 */
const imageFromURL = (url, path) => new Promise((resolve, reject) => {

    console.log('HERE');

    http.get(url, function (res) {
        var file = fs.createWriteStream(path);
        http.get(url, function (response) {
            response.pipe(file);
        });
        file.on('end', function(){
            console.log('THERE');
            resolve();
        });

    })
});