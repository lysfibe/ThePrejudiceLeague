var inp = document.getElementById('input') // Great name!
var container = document.getElementById('container')

var good = [
	{
		name: 'theflosh'
	},
	{
		name: 'theincrediblepulp'
	},
	{
		name: 'twat-man-and-joggin'
	},
	{
		name: 'captainbirdseye'
	},
	{
		name: 'four',
	}
]

var bad = [
	{
		name: 'chuggernaut',
	},
	{
		name: 'twobass',
	},
	{
		name: 'poker',
	},
	{
		name: 'mrfebreeze',
	},
	{
		name: 'thefiddler',
	},
	{
		name: 'breadshot',
	}
]

var current = []



document.getElementById('create-magic').addEventListener('click', function() {
	var url = inp.value
	// var url = 'https://www.thesun.co.uk/news/1797110/disgraced-politician-keith-vaz-reports-mp-to-sleaze-watchdog-claiming-they-have-harmed-his-reputation/'
	var req = new XMLHttpRequest()

	req.open('GET', '/judge?url=' + url, true)

	req.responseType = 'json'
	req.addEventListener('load', function(e) {
		var data = e.target.response
		var status = {
			homog: false,
			good: false
		}

		var resGood = []
		var resBad = []

		data.forEach(function(item) {
			if (item.morality > 0) {
				resGood.push(item)
			} else {
				resBad.push(item)
			}
		})

		if (resGood.length === 0) {
			status = {
				homog: true,
				good: false,
			}
		} else if (resBad.length === 0) {
			status = {
				homog: true,
				good: true,
			}
		}

		function throwInAGoodie(goodie) {
			// get the goodie element, and insert it into the goodie
			document.getElementById('goodies').insertAdjacentHTML('afterbegin', '<div class="character"><img src="' + goodie + '"</div>');
			// might need to set the element height too
			document.getElementById('goodies').style.height = '80vh';
			// insert the image into the goodie element
		}

		function throwInABaddy(baddie) {
			// get the baddie element, and insert it into the baddie elements
			document.getElementById('baddies').insertAdjacentHTML('afterbegin', '<div class="character"><img src="' + baddie + '"</div>');
			// might need to set the element height too
			document.getElementById('baddies').style.height = '80vh';
			// insert the image into the goodie element
		}

		function throwInAIDontCareIfYouAreGoodOrBad(either) {
			document.getElementById('either').insertAdjacentHTML('afterbegin', '<div class="character"><img src="' + either + '"</div>');
			// might need to set the element height too
			document.getElementById('either').style.height = '80vh';
			// insert the image into the goodie element
		}

		resGood = resGood.slice(0,5)
		resBad = resBad.slice(0,5)

		if (status.homog) {
			// they're all the same alignment
			if (status.good) {
				// only loop through the goodies
				// loop through the goodies -> but were going to place in the center
				for (var i = 0; i < resGood.length; i++) {
					var goodieName = good.pop().name;
					req.open('GET', '/actorWithFace?actorName=' + goodieName + '&faceName=' + resGood[i].name, true)
					req.responseType = 'arraybuffer'
					req.addEventListener('load', function(e) {
						var arr = new Uint8Array(this.response);

						// Convert the int array to a binary string
					   // We have to use apply() as we are converting an *array*
					   // and String.fromCharCode() takes one or more single values, not
					   // an array.
					   var raw = String.fromCharCode.apply(null,arr);

					   // This works!!!
					   var b64=btoa(raw);
					   var dataURL="data:image/png;base64,"+b64;

					   // dataUrl is the image, place it somewhere
					   throwInAIDontCareIfYouAreGoodOrBad(dataUrl);
				   }
				}
			} else {
				// only loop through the baddies
				// loop through the baddies and center them in the middle
				for (var i = 0; i < resGood.length; i++) {
					var baddieName = bad.pop().name;
					req.open('GET', '/actorWithFace?actorName=' + baddieName + '&faceName=' + resBad[i].name, true)
					req.responseType = 'arraybuffer'
					req.addEventListener('load', function(e) {
						var arr = new Uint8Array(this.response);

						// Convert the int array to a binary string
					   // We have to use apply() as we are converting an *array*
					   // and String.fromCharCode() takes one or more single values, not
					   // an array.
					   var raw = String.fromCharCode.apply(null,arr);

					   // This works!!!
					   var b64=btoa(raw);
					   var dataURL="data:image/png;base64,"+b64;

					   // dataUrl is the image, place it somewhere
					   throwInAIDontCareIfYouAreGoodOrBad(dataUrl);
				   }
				}
			}
		} else {
			// do the other way, goodies on the left, baddies on the right
			// loop through the goodies
			for (var i = 0; i < resGood.length; i++) {
				req.open('GET', '/actorWithFace?actorName=' + 'breadshot' + '&faceName=' + resGood[i].name, true)
				req.responseType = 'arraybuffer'
				req.addEventListener('load', function(e) {
					var arr = new Uint8Array(this.response);

					// Convert the int array to a binary string
				   // We have to use apply() as we are converting an *array*
				   // and String.fromCharCode() takes one or more single values, not
				   // an array.
				   var raw = String.fromCharCode.apply(null,arr);

				   // This works!!!
				   var b64=btoa(raw);
				   var dataURL="data:image/png;base64,"+b64;

				   // dataUrl is the image, place it somewhere
				   throwInAGoodie(dataUrl);
			   }
			}

			// loop through the baddies
			for (var i = 0; i < resGood.length; i++) {
				req.open('GET', '/actorWithFace?actorName=' + 'breadshot' + '&faceName=' + resBad[i].name, true)
				req.responseType = 'arraybuffer'
				req.addEventListener('load', function(e) {
					var arr = new Uint8Array(this.response);

					// Convert the int array to a binary string
				   // We have to use apply() as we are converting an *array*
				   // and String.fromCharCode() takes one or more single values, not
				   // an array.
				   var raw = String.fromCharCode.apply(null,arr);

				   // This works!!!
				   var b64=btoa(raw);
				   var dataURL="data:image/png;base64,"+b64;

				   // dataUrl is the image, place it somewhere
				   throwInABaddy(dataUrl);
			   }
			}
		}

		// for first resGood , send a request    /actorWithFace?actorName=hero&faceName=&width= ???

		console.log(resGood.length + resBad.length);

		container.innerHTML = ''

		container.classList.remove('entry')
		container.classList.add('fight')
		container.innerHTML = '<div class="goodies"></div><div class="baddies"></div><div class="either"></div>';
	})

	req.send()

})
