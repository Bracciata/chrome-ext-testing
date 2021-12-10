const pa11y = require('pa11y');

pa11y('https://google.com/').then((results) => {
console.log(results);
});