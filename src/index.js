#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import vm from 'vm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const problemsPath = path.join(__dirname, "../problems/problems.json");

const program = new Command();

program
  .command('generate')
  .description('Generate a problem based on difficulty')
  .option('--difficulty <level>', 'Set the difficulty level (easy, medium, hard)', 'easy')
  .action(async (options) => {
    console.log(chalk.green(`Generating problems with ${options.difficulty} difficulty...`));

    const problem = await generateProblem(options.difficulty);
    console.log(chalk.blue(`Problem: ${problem.title}`));
    console.log(`Description: ${problem.description}`);
    console.log(`Example Input: ${problem.exampleInput}`);
    console.log(`Example Output: ${problem.exampleOutput}`);

    let userCode = await askForCode(problem);  

    let retries = 3;
    let success = false;

    while (retries > 0 && !success) {
      success = await evaluateUserCode(userCode, problem);
      if (!success) {
        console.log(chalk.yellow(`You have ${retries - 1} attempts left. Please fix your code and try again.`));
        retries--;
        if (retries > 0) {
          const retryCode = await askForCode(problem);
          userCode = retryCode;  
        }
      }
    }

    if (success) {
      console.log(chalk.green('Great job! Your solution is correct.'));
    } else {
      console.log(chalk.red('Oops! Your solution is still incorrect. Please review your code.'));
      console.log('You can keep trying or manually exit the CLI with Ctrl+C.');
    }
  });

program
  .command('solve <problemTitle>')
  .description('Solve a specific problem by title')
  .action(async (problemTitle) => {
    console.log(chalk.green(`You selected the problem: ${problemTitle}`));

    const problem = await getProblemByTitle(problemTitle);
    if (!problem) {
      console.log(chalk.red('Problem not found.'));
      return;
    }

    console.log(chalk.blue(`Problem: ${problem.title}`));
    console.log(`Description: ${problem.description}`);
    console.log(`Example Input: ${problem.exampleInput}`);
    console.log(`Example Output: ${problem.exampleOutput}`);

    const userCode = await askForCode(problem);
    await evaluateUserCode(userCode, problem);
  });

program
  .command('evaluate')
  .description('Evaluate your code solution')
  .action(async () => {
    console.log(chalk.green('Please provide your JavaScript code to evaluate.'));
    const userCode = await inquirer.prompt({
      type: 'editor',
      name: 'userCode',
      message: 'Write your JavaScript code here:',
    });
    console.log('Evaluating your code...');
    await evaluateUserCode(userCode.userCode, { exampleInput: 'test', exampleOutput: 'test' });
  });

async function generateProblem(difficulty) {
  const problems = JSON.parse(fs.readFileSync(problemsPath, 'utf-8'));
  
  const filteredProblems = problems.filter(p => p.difficulty === difficulty);
  const problem = filteredProblems[Math.floor(Math.random() * filteredProblems.length)];

  return problem;
}

async function getProblemByTitle(title) {
  const problems = JSON.parse(fs.readFileSync(problemsPath, 'utf-8'));
  return problems.find(p => p.title.toLowerCase() === title.toLowerCase());
}

async function askForCode(problem) {
  const answers = await inquirer.prompt([
    {
      type: 'editor',
      name: 'userCode',
      message: `Write your JavaScript code to solve the problem: ${chalk.bold(problem.title)}`,
      default: `// Write your solution for: ${problem.title}`,
      validate(input) {
        if (input.trim() === '') {
          return 'Code cannot be empty';
        }
        return true;
      },
    },
  ]);

  return answers.userCode;
}
async function evaluateUserCode(userCode, problem) {
    const input = problem.exampleInput;
    const expectedOutput = problem.exampleOutput; 
    const runUserCode = (code, input) => {
      try {
        const userFunction = new Function('input', `
          return (${code})(input);
        `);
        const output = userFunction(input);
        return output;
      } catch (error) {
        console.log("Error running user code:", error);
        return null;
      }
    };
  
    const result = runUserCode(userCode, input);
  
    if (result === null || result === undefined) {
      return false;
    }
  
    const cleanedUserOutput = typeof result === 'string' ? result.replace(/^"|"$/g, '') : String(result);
    const cleanedExpectedOutput = expectedOutput.replace(/^"|"$/g, '');
  
    if (cleanedUserOutput === cleanedExpectedOutput) {
      return true;
    } else {
      console.log('Output mismatch:');
      console.log(`Expected Output: ${expectedOutput}`);
      console.log(`Your Output: ${result}`);
      return false; 
    }
  }
  
program.parse(process.argv);
