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
		name: 'twat-man-and-floggin'
	},
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

		resGood = resGood.slice(0,5)
		resBad = resBad.slice(0,5)

		container.innerHTML = ''

		container.classList.remove('entry')
		container.classList.add('fight')
	})

	req.send()

})