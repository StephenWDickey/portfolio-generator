const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }
    ])
    .then (answers => console.log (answers));

/* const fs = require('fs');
const generatePage = require('./src/page-template.js');

// import temperate literal 
const pageHTML = generatePage(name, github);

// fs.writeFile() takes 3 arguments: name, template literal, and callback function for errors
fs.writeFile('index.html', pageHTML, err => {
    if (err) throw err;

    console.log ('Portfolio complete! See index.html for output!');

}); */



