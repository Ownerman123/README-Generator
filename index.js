// Include packages needed for this application
const  inquirer  = require("inquirer");
const fs = require('fs');
const colors = require('colors');

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt:  ['brightWhite', 'dim'],
    info: 'green',
    data: 'gray',
    savfile: ['bgWhite', 'black'],
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
  });



// TODO: Create an array of questions for user input
const questions = [
    //what is the title 
    {
        type: 'input',
        name: 'title',
        message: "What is the title of the project?".input,
        default: "Dont forget to add the title manually because that would be embarassing"
    },
    //Add a desciption
    {
        type: 'input',
        name: 'description',
        message: "Describe the project".data,
        default: 'Dont forget to add a description manually becasue that would be embarassing'
        
    },
    //Installation instructions
    {
        type: 'input',
        name: 'installation',
        message: "Instructions for install".data
    },
    //usage information
    {
        type: 'input',
        name: 'usage',
        message: "Usage instructions".data
    },
    //contribution guidlines
    {
        type: 'input',
        name: 'contribution',
        message: "How can user contribute".data
    },
    //test instructions
    {
        type: 'input',
        name: 'test',
        message: "instructions for testing project".data
    },
    //ScreenShot? 
    {
        type: 'confirm',
        name: 'screenshot',
        message: "Add a screenshot section?".data,
        default: false
    },
    //license
    {
        type: 'list',
        name: 'license',
        message: "What license is the project under".data,
        choices: ['MIT','Apache 2.0','GNU General Public License v3.0','BSD 2-clause "Simplified" License','BDS 3-Clause "New" or "Revised"', 'Boost Software License 1.0','Creative Commons Zero v1.0 Universal','Eclipse Public License 2.0','GNU Affero General Public License v3.0','GNU Lesser General Public License v2.1','Mozilla Public License 2.0','The Unlicense']
    },
    //github info
    {
        type: 'input',
        name: 'github',
        message: "What is your github".data
    },
    //email info
    {
        type: 'input',
        name: 'email',
        message: "What is your email".data
    },
    //any other additions?
    // {
    //     type: 'confirm',
    //     name: 'additions',
    //     message: "any other additions?".data,
    //     default: false
    // },
    {
        type: 'input',
        name: 'location',
        message: 'Where would you like the file saved to?',
        default: './outputs'
    }

];

// const additionalContent = [
//     {
//         type: 'input',
//         name: 'newContent',
//         message: 'new content title?'
//     },
//     {
//         type: 'input',
//         name: 'additions',
//         message: "Any more additions?".data,
//         default: false
//     }
// ];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    console.log(data);

    const file = fileName.concat('/README.md');
    
const title = data.title;
const description = data.description;
const install = data.installation;
const usage = data.usage;
const screenshot = data.screenshot;
const contribution = data.contribution;
const test = data.test;
const license = data.license;
const github = data.github;
const email = data.email;
// const dataarry = [title, description, install, usage, contribution, test, license, github, email]
let README = '';


if(title){
    README = README.concat(`# ${title} ![Static Badge](https://img.shields.io/badge/License-${license}-blue)`);
    console.log(typeof title);
}
if(description){
    README = README.concat(`\n## Description \n ${description}`);
}
README = README.concat('\n## Table of Contents')
console.log(Object.keys(data).length);
for(i=2; i< Object.keys(data).length; i++){
    if(data[Object.keys(data)[i]]){
        
       if(Object.keys(data)[i] === 'github' || Object.keys(data)[i] === 'email' || Object.keys(data)[i] === 'location'){}else{
        README = README.concat(`\n[${Object.keys(data)[i].charAt(0).toUpperCase() + Object.keys(data)[i].slice(1)}](#${Object.keys(data)[i]})\n`);
       }
    }
}
console.log(Object.keys(data).includes('github'));
if(github || email)
{
    README = README.concat(`\n[Contact](#contact)\n`);
}
if(install){
    README = README.concat(`\n## Installation \n${install}`);
}
if(usage){
    README = README.concat(`\n## Usage \n${usage}`);
}
if(screenshot){
    README = README.concat(`\n## Screenshot `);
}
if(contribution){
    README = README.concat(`\n## Contribution \n${contribution}`);
}
if(test){
    README = README.concat(`\n## Test \n${test}`);
}
if(license){
    README = README.concat(`\n## License \n![Static Badge](https://img.shields.io/badge/License-${license}-blue)`);
}
if(github){
    README = README.concat(`\n## Contact \n Ask me questions about the project here\n* Github: ${github}`);
    if(email){
        README = README.concat(`\n* Email: ${email}`);
    }
}
if(!github && email){
    README = README.concat(`\n## Contact \n Ask me questions about the project here`);
    if(email){
        README = README.concat(`\n* Email: ${email}`);
    }
}

console.log(`file to be saved \n `.info + `${README}`.savfile);

fs.writeFile(file, README, err => err?console.log(colors.red(err)): console.log(colors.green('File created!')));
    




}

// TODO: Create a function to initialize app
function init() {

inquirer.prompt(questions).then(data => writeToFile(data.location, data));



}

// Function call to initialize app
init();
