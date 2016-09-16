const alchemy = require('./alchemy');

const MULTIPLIERS = {
    joy: 12,
    fear: -5,
    anger: -4,
    disgust: -3,
    sadness: 0,
};

alchemy({url: process.argv[2]}).then(
    function (res) { // Resolved
        //console.log(res);

        var people = res.filter(entity => entity.type === 'Person');

        people = people.map(person => ({name: person.text, emotions: person.emotions}));

        people = classify(people);

        console.log(people);
    },
    function (err) { // Rejected
        console.log(err);
    });


function classify(people) {
    return people.map(function (person) {
        var morality = 0;
        for (var key in MULTIPLIERS) {
            morality += (MULTIPLIERS[key] * person.emotions[key]);
        }
        person.morality = morality;
        return person;
    });
}