const watson = require('watson-developer-cloud');
const API_KEY = 1b72f2aaaf9d29cd93d4805592c8991c828f9169; // Put API key here


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
module.exports = target => new Promise((resolve, reject) => {
	if (!target || !(target.html || target.url || target.text)) {
			reject('Could not invoke Alchemy API - No target');
	}

	if (!alchemy) {
			reject('No Alchemy connection');
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
				resolve(res.entities);
		}
		reject(err || 'No results');
	});
})
