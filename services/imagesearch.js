const googleimages = require('google-images')

const client = googleimages('005079478486385241719:vxs-5htg_zg', 'AIzaSyBYy0GbTy3dwLz3svqg5MQaX7GtezPQYkg')

module.exports = {
	getFirstUrl: term => client.search(term.replace('_', ' ')).then(data => data[0].url)
}
