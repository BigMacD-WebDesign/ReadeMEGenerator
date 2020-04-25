const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
var userInput = "";
inquirer.prompt([
    {
        name: "github",
        message: "Enter GitHub Username",
        type: "input"
    },
    {
        name: "Project",
        message: "Enter Project Repo Name",
        type: "input"
    },
    {
        name: "Description",
        message: "Enter project description",
        type: "input"
    },
    {
        name: "Installation",
        message: "Installation Software needed",
        type: "input",
        default: "npm install"
    },
    {
        name: "Contributors",
        message: "What is the information you have for the contributors?",
        type: "input"
    },
    {
        name: "Terms",
        message: "What is your usage?",
        type: "input"
    },
    {
        name: "Test",
        message: "Any tests to run?",
        type: "input",
        default: "npm test"
    },
    {
        name: "License",
        message: "Choose license",
        type: "list",
        choices: ["MIT", "ISC", "APACHE 2.0", "GPL 3.0"]
    },
]).then(function(userData) {
    console.log(userData);
    userInput = userData;
    return axios.get(`https://api.github.com/users/${userInput.github}`)
})
.then(function(axiosResponse) {
    console.log(axiosResponse.data);
    var readMeString = `
# About The Author
## Username, ${axiosResponse.data.login}
### Email: ${axiosResponse.data.email}
### Location: ${axiosResponse.data.location}
# Name: ${axiosResponse.data.name}
First Header | Second HEader
-------------|---------------
Installation | ${userInput.Installation}
License      | ${userInput.License}
Test         | ${userInput.Test}





![GitHub license] (https://img.shields.io/badge/license-${userInput.License}-blue.svg)

    `
    console.log(readMeString)
    
    fs.writeFileSync("./README.md", readMeString)
})