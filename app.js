const fs = require('fs');
const generatePage = require('./src/page-template.js');
// argv process creates an array of things typed in command line
const profileDataArgs = process.argv.slice(2);

// assignmnet destructuring 
// this is simpler than declaring two variables, we can do it on the same line
const [name, github] = profileDataArgs;



/* // passing in profileDataArr as parameter, arrow notation doesnt require () for one parameter
const printProfileData = profileDataArr => {
    for (let i=0; i < profileDataArr.length; i++) {
        console.log(profileDataArr[i]);
    }

    console.log('====================');

    // the forEach method is like a for loop, running a function on each item in array
    // this is an even more concise version of the expression we had before
    // we have a function with profileItem parameter, we do not write function because of arrow notation
    // because we are only passing in one parameter, we do not require () around it
    // we are only executing one action, which is to console.log the profileItem
    // thanks to arrow notation, if only one action is executed, we do not need {}
    profileDataArr.forEach(profileItem => console.log(profileItem));
};

// argument is defined earlier as profile data args
printProfileData(profileDataArgs); */

//////////////////////////////////////////////////////////


// in order to refactor/modularize our code we will move template literal to its own file

// we have two parameters, so () required
// with template literal ` we can insert variables into string
// furthermore we can create multi-line strings within the template literal using [enter]
// since we dont have just one expression after the arrow, we must use {}
// the ${} syntax allows interpolation of variables into template literal
/* const generatePage = (name, github) => {

    // so cool, we are writing html within multi-line template literal!
    // and within that html, we are interpolating variables into it!
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Portfolio Demo</title>
        </head>

        <body>
            <h1>${name}</h1>
            <h2><a href="https://github.com/${github}">Github</a></h2>
        </body>
        </html>
    `;
}; */

// fs.writeFile() takes 3 arguments: name, template literal, and callback function for errors
fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw err;

    console.log ('Portfolio complete! See index.html for output!');

});

