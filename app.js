const fs = require('fs');
const generatePage = require('./src/page-template.js');

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
            // adding (Required) will make it a required question
            message: 'What is your name? (Required)',
            // add validate function, must return a Boolean value
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Name must be entered');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            // add validate function, must return a Boolean value
            validate: usernameInput => {
                if (usernameInput) {
                    return true;
                }
                else {
                    console.log('Username must be entered');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Provide some information about yourself?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide info about yourself',
            // this is another function like validate
            // it says, hey if you reply true to confirmAbout we will add this section
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                }
                else {
                    return false;
                }
            }
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
            message: 'What is the name of your project? (Required)',
            // add validate function, must return a Boolean value
            validate: projectNameInput => {
                if (projectNameInput) {
                    return true;
                }
                else {
                    console.log('Project name must be entered');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            // add validate function, must return a Boolean value
            validate: projectDescriptionInput => {
                if (projectDescriptionInput) {
                    return true;
                }
                else {
                    console.log('Project description must be entered');
                    return false;
                }
            }
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
            message: 'Enter the GitHub link to your project. (Required)',
            // add validate function, must return a Boolean value
            validate: projectLinkInput => {
                if (projectLinkInput) {
                    return true;
                }
                else {
                    console.log('Project link must be entered');
                    return false;
                }
            }
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
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
        if (err) throw new Error(err);

        console.log('Page created! Check out index.html in this directory to see it!');
    });
});



////////////////////////////////////////////////







