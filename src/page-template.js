// in order to refactor/modularize our code we will move template literal to its own file

// we have two parameters, so () required
// with template literal ` we can insert variables into string
// furthermore we can create multi-line strings within the template literal using [enter]
// since we dont have just one expression after the arrow, we must use {}
// the ${} syntax allows interpolation of variables into template literal
const generatePage = (name, github) => {

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
}; 

// export this module 
module.exports = generatePage;