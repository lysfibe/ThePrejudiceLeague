const alchemy = require('./alchemy');

const MULTIPLIERS = {
    joy: 12,
    fear: -5,
    anger: -4,
    disgust: -3,
    sadness: 0,
};

module.exports = function (target) {
    return alchemy(target).then(
        function (res) { // Resolved
            //console.log(res);

            // Only get people
            var people = res.filter(entity => entity.type === 'Person');

            // Remove unnecessary properties
            people = people.map(person => ({name: person.text, emotions: person.emotions}));

            // Judge them
            people = classify(people);

            return people;
        },
        function (err) { // Rejected
            console.error(err);
            return err;
        });
}

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