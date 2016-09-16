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


document.getElementById('create-magic').addEventListener('click', function () {
    var url = inp.value
    // var url = 'https://www.thesun.co.uk/news/1797110/disgraced-politician-keith-vaz-reports-mp-to-sleaze-watchdog-claiming-they-have-harmed-his-reputation/'
    var req = new XMLHttpRequest()

    req.open('GET', '/judge?url=' + url, true)

    req.responseType = 'json'
    req.addEventListener('load', function (e) {
        var data = e.target.response
        var status = {
            homog: false,
            good: false
        }

        var resGood = []
        var resBad = []


			container.innerHTML = ''

			container.classList.remove('entry')
			container.classList.add('fight')
			container.innerHTML = '<div id="goodies"></div><div id="baddies"></div><div id="either"></div>';

			for (var i = 0; i < data.length; i += 1) {
       var item = data[i]
        // data.forEach(function (item) {
            if (item.morality > 0) {
                resGood.push(item)
            } else {
                resBad.push(item)
            }
        // })
			}

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
            console.log('ADDING HERO');
            // get the goodie element, and insert it into the goodie
            document.getElementById('goodies') .innerHTML +=  '<div class="character"><img src="' + goodie + '"</div>';
            // might need to set the element height too
            document.getElementById('goodies').style.height = '80vh';
            // insert the image into the goodie element
        }

        function throwInABaddy(baddie) {
            console.log('ADDING VILLIAN');
            // get the baddie element, and insert it into the baddie elements
            document.getElementById('baddies').innerHTML += '<div class="character"><img src="' + baddie + '"</div>';
            // might need to set the element height too
            document.getElementById('baddies').style.height = '80vh';
            // insert the image into the goodie element
        }

        function throwInAIDontCareIfYouAreGoodOrBad(either) {
            console.log('ADDING NEUTRAL');
            document.getElementById('either').innerHTML +=  '<div class="character"><img src="' + either + '"</div>';
            // might need to set the element height too
            document.getElementById('either').style.height = '80vh';
            // insert the image into the goodie element
        }

        resGood = resGood.slice(0, 5)
        resBad = resBad.slice(0, 5)

        // if (status.homog) {
        //     console.log('HOMOG');
        //     // they're all the same alignment
        //     if (status.good) {
        //         console.log('HOMOG - GOOD TOTAL: ' + resGood.length);
        //         // only loop through the goodies
        //         // loop through the goodies -> but were going to place in the center
        //         for (var i = 0; i < resGood.length; i++) {
        //             var goodieName = good.pop().name;
        //             req.open('GET', '/actorWithFace?actorName=' + goodieName + '&faceName=' + resGood[i].name, true)
        //             req.responseType = 'text'
        //             req.addEventListener('load', function (e) {
					// 						var dataURL = "data:image/png;base64," + e.target.responseText;
				//
					// 						throwInAIDontCareIfYouAreGoodOrBad(dataURL);
        //             })
					// 				req.send()
        //         }
        //     } else {
        //         console.log('HOMOG - BAD TOTAL: ' + resBad.length);
        //         // only loop through the baddies
        //         // loop through the baddies and center them in the middle
        //         for (var i = 0; i < resBad.length; i++) {
        //         	console.log(bad)
        //         	var currentBaddie = bad.shift()
        //             var baddieName = currentBaddie.name;
        //             req.open('GET', '/actorWithFace?actorName=' + baddieName + '&faceName=' + resBad[i].name, true)
        //             req.responseType = 'text'
        //             req.addEventListener('load', function (e) {
					// 						var dataURL = "data:image/png;base64," + e.target.responseText;
				//
					// 						throwInAIDontCareIfYouAreGoodOrBad(dataURL);
        //             })
					// 				req.send()
        //         }
        //     }
        // } else {
            console.log('MIXED TOTAL: good: ' + resGood.length + ' bad: ' + resBad.length);
            // do the other way, goodies on the left, baddies on the right
            // loop through the goodies
            for (var i = 0; i < resGood.length; i++) {
            		var int = Math.floor(Math.random() * good.length)
                    throwInAGoodie('/actorWithFace?actorName=' + good[int].name + '&faceName=' + resGood[i].name);
            	// var nreq = new XMLHttpRequest()
               //  nreq.open('GET', '/actorWithFace?actorName=' + 'breadshot' + '&faceName=' + resGood[i].name, true)
               //  nreq.responseType = 'text';
               //  nreq.addEventListener('load', function (e) {
								// 	console.log('length good', nreq.responseText.length)
               //      var dataURL = "data:image/jpg;base64," + decodeURIComponent(nreq.responseText);
							//
               //  })
								// nreq.send()
            }

            // loop through the baddies
            for (var i = 0; i < resBad.length; i++) {
							var int = Math.floor(Math.random() * bad.length)
									throwInABaddy('/actorWithFace?actorName=' + bad[int].name  + '&faceName=' + resBad[i].name);
							// var nreq = new XMLHttpRequest()
               //  nreq.open('GET', '/actorWithFace?actorName=' + 'breadshot' + '&faceName=' + resBad[i].name, true)
               //  nreq.responseType = 'text'
               //  nreq.addEventListener('load', function (e) {
							// 		console.log('length bad', nreq.responseText.length)
							// 		var dataURL = "data:image/jpg;base64," + nreq.responseText;
							//
               //      // dataUrl is the image, place it somewhere
               //  })
							// nreq.send()
            }
        // }

        // for first resGood , send a request    /actorWithFace?actorName=hero&faceName=&width= ???

        console.log(resGood.length + resBad.length);

    })

    req.send()

})
