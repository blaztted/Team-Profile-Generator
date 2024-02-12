const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

async function ManagerInfo() {
  const managerQuestions = [
    {
      type: "input",
      name: "name",
      message: "Enter the manager's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the manager's employee ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the manager's email address:",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Enter the manager's office number:",
    },
  ];

  return inquirer.prompt(managerQuestions).then((managerAnswers) => {
    return new Manager(
      managerAnswers.name,
      managerAnswers.id,
      managerAnswers.email,
      managerAnswers.officeNumber
    );
  });
}

async function NextAction() {
  const nextActionQuestion = {
    type: "list",
    name: "nextAction",
    message: "What would you like to do next?",
    choices: ["Add an engineer", "Add an intern", "Finish building the team"],
  };
  return inquirer.prompt(nextActionQuestion).then(({ nextAction }) => {
    return nextAction;
  });
}

async function EngineerInfo() {
  const engineerQuestions = [
    {
      type: "input",
      name: "name",
      message: "Enter the engineer's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the engineer's ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the engineer's email address:",
    },
    {
      type: "input",
      name: "github",
      message: "Enter the engineer's GitHub username:",
    },
  ];

  return inquirer.prompt(engineerQuestions).then((engineerAnswers) => {
    return new Engineer(
      engineerAnswers.name,
      engineerAnswers.id,
      engineerAnswers.email,
      engineerAnswers.github
    );
  });
}

async function InternInfo() {
  const internQuestions = [
    {
      type: "input",
      name: "name",
      message: "Enter the intern's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the intern's ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the intern's email address:",
    },
    {
      type: "input",
      name: "school",
      message: "Enter the intern's school:",
    },
  ];

  return inquirer.prompt(internQuestions).then((internAnswers) => {
    return new Intern(
      internAnswers.name,
      internAnswers.id,
      internAnswers.email,
      internAnswers.school
    );
  });
}

function startApp() {
  try {
    ManagerInfo().then((manager) => {
      console.log("Manager Information:", manager);

      const teamMembers = [manager];

      async function processNextAction() {
        let continueBuildingTeam = true;

        while (continueBuildingTeam) {
          const nextAction = await NextAction();

          switch (nextAction) {
            case "Add an engineer":
              const engineer = await EngineerInfo();
              teamMembers.push(engineer);
              console.log("Engineer Information:", engineer);
              break;

            case "Add an intern":
              const intern = await InternInfo();
              teamMembers.push(intern);
              console.log("Intern Information:", intern);
              break;

            case "Finish building the team":
              console.log("Finish building the team");
              console.log("Team Members:", teamMembers);
              continueBuildingTeam = false;
              break;

            default:
              console.log("Invalid choice. Please try again.");
          }
        }
      }

      processNextAction();
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

startApp();
