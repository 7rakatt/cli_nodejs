#!/user/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import fs from 'fs';
const program = new Command();

const filePath = "./courses.json";

const que = [
  {
    type: "input",
    name: "course name",
    message: "Enter course name",
  },
  {
    type: "number",
    name: "price",
    message: "Enter course price",
  }
];



program
  .name("myFirst-prog")
  .description("CLI to make courses")
  .version("1.0.0");

program
  .command("add")
  .alias("a")
  .description("Add a course")
  .action((param,options) => {
    inquirer
  .prompt(que)
  .then((answers) => {
    console.log(answers);
    if (fs.existsSync(filePath))
    {
      fs.readFile(filePath, 'utf-8', (err,fileContent) => {
        if (err) {
          console.log("Error", err);
          process.exit();
        };
        console.log("file content", fileContent);
        const fileContentAsjson = JSON.parse(fileContent);
        fileContentAsjson.push(answers);
          fs.writeFile(filePath, JSON.stringify(fileContentAsjson), "utf8", () => {
            console.log("Add courses done");
          });
})
    }
    else {
      fs.writeFile(filePath, JSON.stringify([answers]), "utf8", () => {
        console.log("Add courses done");
      });
    }
  })
  });
program
  .command("list")
  .alias("ls")
  .description("list of course")
  .action(() => {
    fs.readFile(filePath, 'utf-8', (err,content) => {
      if(err)
      {
        console.log("Error",err);
        process.exit();
      }
      console.table(JSON.parse(content));
    })
  });

program.parse(process.argv);
