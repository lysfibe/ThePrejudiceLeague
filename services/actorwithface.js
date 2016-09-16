const images = require("images");
const path = require('path');
const http = require('http');
const fs = require('fs');
const imageSearch = require('./imagesearch');
const ACTORS = require('../resources/actors');

const Jimp = require('jimp')

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
        // .then(function (combined) {
        //     combined.height(query.height)
        //     console.log('COMBINED:\n', combined);
        //     return combined;
        // })
        .catch(function(err){
            console.error(err);
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
    var actor = ACTORS.filter(actor => actor.name === name)[0];
    console.log('ACTOR:\n', actor);
    return actor;
}

/**
 * Applies face to hero
 * @param actor An element from ACTORS
 * @param face An object with url property
 */
const heroWithFace = (actor, face) =>  {

    // e.g. {directory}/resources/four-Boris_Jonson.png

    var dir = path.join(global.ROOT, 'resources', 'faces');
    var fileName = face.name.replace(' ', '_') + '.' + face.url.split('.').pop();
    var facePath = path.join(dir, fileName);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }


    return imageFromURL(face.url, actor.faceWidth)
      .then(
        face => Jimp
          .read(ROOT + '/resources/' + actor.name + '.png')
          .then(act => act.composite(face, actor.faceX, actor.faceY))
      )
};

/**
 * Gets image from url
 */
const imageFromURL = (url, width) => Jimp.read(/(.*)\??/.exec(url)[1]).then(face => face.resize(width, Jimp.AUTO))