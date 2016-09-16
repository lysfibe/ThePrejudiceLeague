const watson = require('watson-developer-cloud');
const API_KEY = ; // Put API key here


// Connect to Watson Alchemy Language service
if (API_KEY) {
    var alchemy = watson.alchemy_language({
        api_key: API_KEY
    });
} else {
    console.error('Could not connect to Alchemy API - No API key');
}


/**
 * Uses the Watson Alchemy API to generate a tag-cloud for target.
 * target should be an object with one of the properties html or url.
 */
module.exports = function (target, callback) {
    if (!target || !(target.html || target.url || target.text)) {
        return callback('Could not invoke Alchemy API - No target');
    }

    if (!alchemy) {
        return callback('No Alchemy connection');
    }

    // Refer to the following link for more information:
    // http://www.ibm.com/watson/developercloud/alchemy-language/api/v1/?node#entities
    var parameters = Object.assign({
      structuredEntities: 0,
      emotion: 1
    }, target);

    // Make API call
    alchemy.entities(parameters, function(err, res){
      if (!err && res && Array.isArray(res.entities)) {
          return callback(null, res.entities);
      }
      callback(err || 'No results');
    });
};
