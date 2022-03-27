

// we make sure inquirer is required
const inquirer = require('inquirer');


// prompt method receives array of objects
const promptUser = () => {
    return inquirer.prompt([
        {
            // we designate the type as an input from user
            type: 'input',
            // we give the key value pair a name for key
            name: 'name',
            // we write what prompt we will ask the user
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};


//////////////////////////////////////////////////////

// we are passing parameter called portfolioData so we can store multiple projects
const promptProject = portfolioData => {

    // here's our empty array so we can store multiple projects!
    // but we only want to initialize an empty array on the 'first pass'
    // therefore we must use an if statement
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    
    // here we are console logging a template literal
    console.log(`
    ==========================
    Add a New Project
    ==========================
    `);

    // now we ask user more quesitons
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
        },
        {
            // the checkbox type gives a list to choose from
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)'
        },
        {
            // the confirm type simply asks you to confirm yes or no
            // in this case, if the question is skipped, it is given a no answer
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])

    // here we take our 'projectData' and push it to our empty array
    // the projectData parameter is not defined yet
    .then(projectData => {
        portfolioData.projects.push(projectData);
        // now we see if the user wants to add another project
        // if yes, we will call the promptProject function again
        // if the confirmAddProject response is true...
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        }
        // if confirmAddProject = false...
        else {
            return portfolioData;
        }
    });
};



/////////////////////////////////////////////


// we call the function, and console log the answers
// the Promise received from inquire.prompt must be resolved by .then method
// here we are chaining together multiple functions using promises
// the order matters! we ask about project after we get profile questions
promptUser().then(promptProject).then(portfolioData => {
    console.log(portfolioData);
});



////////////////////////////////////////////////


// we commented out this code for now
/* const fs = require('fs');
const generatePage = require('./src/page-template.js');

// import temperate literal 
const pageHTML = generatePage(name, github);

// fs.writeFile() takes 3 arguments: name, template literal, and callback function for errors
fs.writeFile('index.html', pageHTML, err => {
    if (err) throw err;

    console.log ('Portfolio complete! See index.html for output!');

}); */



