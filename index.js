#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import boxen from 'boxen';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import all structures
import { getAllCategories, getAllFolders } from './structures/categories.js';
import { getBasicStructure } from './structures/basic-structure.js';
import { getFullStructure } from './structures/full-structure.js';
import { getAllLevels, getLevelFolders, LEVELS, LEVEL_INFO } from './structures/levels.js';

// Global state
let createdProjectPath = null;
let createdFiles = [];

// Display welcome banner
console.log(
  boxen(
    chalk.blue.bold('Next.js 16.1.1 Backend Generator') +
    '\n\n' +
    chalk.white('Create production-ready backend structure') +
    '\n' +
    chalk.gray('templates across 4 skill levels'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'blue',
    }
  )
);

async function main() {
  let continueLoop = true;

  while (continueLoop) {
    try {
      const result = await runSetup();
      
      if (result.success) {
        const confirmed = await confirmCreation();
        
        if (confirmed) {
          console.log(chalk.green('\n✅ Project setup completed successfully!\n'));
          continueLoop = false;
        } else {
          const action = await askWhatToDo();
          
          if (action === 'delete') {
            await deleteCreatedProject();
            const retry = await askRetry();
            continueLoop = retry;
          } else if (action === 'modify') {
            await modifyProject();
            const satisfied = await confirmCreation();
            continueLoop = !satisfied;
          } else if (action === 'restart') {
            await deleteCreatedProject();
            continueLoop = true;
          } else {
            continueLoop = false;
          }
        }
      } else {
        continueLoop = false;
      }
    } catch (error) {
      console.error(chalk.red('\n❌ An error occurred:'), error.message);
      const retry = await askRetry();
      continueLoop = retry;
    }
  }

  console.log(chalk.cyan('\n👋 Thank you for using Next.js Backend Generator!\n'));
  process.exit(0);
}

async function runSetup() {
  try {
    // STEP 1: Check App Router
    const { routerType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'routerType',
        message: chalk.cyan('📱 Select App Router Type:'),
        choices: [
          {
            name: chalk.green('App Router (Next.js 13+)') + chalk.gray(' - Recommended'),
            value: 'app',
          },
          {
            name: chalk.yellow('Pages Router') + chalk.gray(' - Classic Next.js'),
            value: 'pages',
          },
        ],
        default: 'app',
      },
    ]);

    if (routerType === 'pages') {
      console.log(
        boxen(
          chalk.yellow.bold('⚠️  Pages Router Selected') +
          '\n\n' +
          chalk.white('This tool is optimized for App Router.') +
          '\n' +
          chalk.gray('Some features may need adjustment for Pages Router.') +
          '\n\n' +
          chalk.cyan('Continue anyway?'),
          {
            padding: 1,
            borderColor: 'yellow',
            borderStyle: 'round',
          }
        )
      );

      const { continueWithPages } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'continueWithPages',
          message: 'Continue with Pages Router?',
          default: false,
        },
      ]);

      if (!continueWithPages) {
        return { success: false };
      }
    }

    // STEP 2: Select Backend Level
    console.log(
      boxen(
        chalk.cyan.bold('🎯 Choose Your Backend Complexity Level') +
        '\n\n' +
        chalk.white('Select based on your project needs and experience:'),
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: 'cyan',
        }
      )
    );

    const levels = getAllLevels();
    const { selectedLevel } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedLevel',
        message: chalk.cyan('Select backend level:'),
        choices: levels.map(level => ({
          name: `${level.icon} ${chalk.bold(level.name)} ${chalk.gray(`- ${level.description} (${level.fileCount} templates)`)}`,
          value: level.key,
        })),
        pageSize: 10,
      },
    ]);

    // STEP 3: Choose Structure Type for Selected Level
    console.log(
      boxen(
        chalk.blue.bold(`📦 Structure Type for ${LEVEL_INFO[selectedLevel].name}`) +
        '\n\n' +
        chalk.white('How would you like to set up your project?'),
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: 'blue',
        }
      )
    );

    const { structureType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'structureType',
        message: chalk.cyan('Choose structure type:'),
        choices: [
          {
            name: chalk.green('⚡ Basic Structure') + chalk.gray(' - Essential files only'),
            value: 'basic',
          },
          {
            name: chalk.blue('🚀 Full Auto') + chalk.gray(` - All ${LEVEL_INFO[selectedLevel].fileCount} templates automatically`),
            value: 'full-auto',
          },
          {
            name: chalk.magenta('🎛️  Modular (Pick & Choose)') + chalk.gray(' - Select specific templates'),
            value: 'modular',
          },
        ],
      },
    ]);

    let selectedFolders = [];

    // STEP 4: If Modular, show folder selection
    if (structureType === 'modular') {
      selectedFolders = await handleModularSelection(selectedLevel);
      
      if (selectedFolders.length === 0) {
        console.log(chalk.yellow('\n⚠️  No templates selected. Operation cancelled.\n'));
        return { success: false };
      }
    } else if (structureType === 'full-auto') {
      selectedFolders = getLevelFolders(selectedLevel);
    } else if (structureType === 'basic') {
      // Use a minimal subset from the level
      const allLevelFolders = getLevelFolders(selectedLevel);
      selectedFolders = allLevelFolders.slice(0, Math.min(10, allLevelFolders.length));
    }

    // STEP 5: Get installation path
    const { installPath } = await inquirer.prompt([
      {
        type: 'input',
        name: 'installPath',
        message: chalk.cyan('Enter the installation path:'),
        default: process.cwd(),
        validate: (input) => {
          const absolutePath = path.resolve(input);
          const parentDir = path.dirname(absolutePath);
          
          if (!fs.existsSync(parentDir)) {
            return chalk.red('Parent directory does not exist!');
          }
          return true;
        },
      },
    ]);

    // STEP 6: Get project name
    const { projectName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: chalk.cyan('Enter project folder name (leave empty to use current directory):'),
        default: '',
        validate: (input) => {
          if (input && !/^[a-zA-Z0-9-_]+$/.test(input)) {
            return chalk.red('Project name can only contain letters, numbers, hyphens, and underscores');
          }
          return true;
        },
      },
    ]);

    const baseDir = projectName ? path.join(installPath, projectName) : installPath;
    createdProjectPath = baseDir;

    // Check if directory exists
    if (fs.existsSync(baseDir)) {
      const files = fs.readdirSync(baseDir);
      if (files.length > 0) {
        const { overwrite } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: chalk.yellow(`Directory ${chalk.cyan(baseDir)} is not empty. Continue anyway?`),
            default: false,
          },
        ]);

        if (!overwrite) {
          console.log(chalk.yellow('\n⚠️  Operation cancelled.\n'));
          return { success: false };
        }
      }
    }

    // STEP 7: Show summary
    await showSummary(routerType, selectedLevel, structureType, baseDir, selectedFolders);

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: chalk.cyan('Create project structure with above configuration?'),
        default: true,
      },
    ]);

    if (!confirm) {
      console.log(chalk.yellow('\n⚠️  Operation cancelled.\n'));
      return { success: false };
    }

    // STEP 8: Create structure
    const spinner = ora({
      text: chalk.cyan('Creating project structure...'),
      color: 'cyan',
    }).start();

    try {
      // Build structure based on selections
      const structure = await buildStructureFromLevel(selectedLevel, structureType, selectedFolders);
      
      await fs.ensureDir(baseDir);
      
      createdFiles = [];
      await createStructure(baseDir, structure, spinner);

      spinner.succeed(chalk.green(`✅ Successfully created ${createdFiles.length} files!`));

      await showCreatedStructure(baseDir);

      return { success: true };

    } catch (error) {
      spinner.fail(chalk.red('Failed to create structure'));
      console.error(chalk.red('\n❌ Error:'), error.message);
      return { success: false };
    }

  } catch (error) {
    if (error.isTtyError) {
      console.error(chalk.red('\n❌ Prompt could not be rendered in the current environment'));
    } else {
      console.error(chalk.red('\n❌ An error occurred:'), error.message);
    }
    return { success: false };
  }
}

// Handle modular selection for a specific level
async function handleModularSelection(level) {
  const levelFolders = getLevelFolders(level);
  
  console.log(
    boxen(
      chalk.magenta.bold('🎨 Modular Selection Mode') +
      '\n\n' +
      chalk.white(`Select from ${levelFolders.length} available templates for ${LEVEL_INFO[level].name}`) +
      '\n' +
      chalk.gray('Use ↑↓ to navigate, Space to select, Enter to confirm'),
      {
        padding: 1,
        borderStyle: 'round',
        borderColor: 'magenta',
      }
    )
  );

  const { selectedFolders } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedFolders',
      message: chalk.cyan('Select templates to include:'),
      choices: levelFolders.map(folder => ({
        name: `📁 ${chalk.bold(folder)}`,
        value: folder,
        checked: false,
      })),
      pageSize: 15,
      validate: (answer) => {
        if (answer.length < 1) {
          return chalk.red('You must select at least one template.');
        }
        return true;
      },
    },
  ]);

  return selectedFolders;
}

// Build structure from level and selections
async function buildStructureFromLevel(level, structureType, selectedFolders) {
  // Import templates dynamically
  const { templates } = await import('./templates/index.js');
  
  let structure = {
    '.env.example': '',
    '.gitignore': generateGitignore(),
    'middleware.ts': '',
    'next.config.ts': '',
    'tsconfig.json': '',
    'package.json': generatePackageJson(),
    'README.md': generateReadme(level, structureType),
    'src': {}
  };

  // Add folders based on selection
  for (const folderName of selectedFolders) {
    // Check if template exists
    if (fs.existsSync(path.join(__dirname, 'templates', folderName))) {
      const folderPath = path.join(__dirname, 'templates', folderName);
      const files = fs.readdirSync(folderPath);
      
      structure.src[folderName] = {};
      
      for (const file of files) {
        if (file !== 'index.js') {
          const content = fs.readFileSync(path.join(folderPath, file), 'utf-8');
          structure.src[folderName][file] = content;
        }
      }
    }
  }

  return structure;
}

// Show summary
async function showSummary(routerType, level, structureType, baseDir, selectedFolders) {
  const levelInfo = LEVEL_INFO[level];
  
  let summaryText = chalk.bold('📋 Configuration Summary') + '\n\n';
  
  summaryText += chalk.white('Router Type: ') + chalk.cyan(routerType === 'app' ? 'App Router' : 'Pages Router') + '\n';
  summaryText += chalk.white('Backend Level: ') + levelInfo.icon + ' ' + chalk.cyan(levelInfo.name) + '\n';
  summaryText += chalk.white('Structure Type: ') + chalk.cyan(structureType.toUpperCase()) + '\n';
  summaryText += chalk.white('Installation Path: ') + chalk.cyan(baseDir) + '\n';
  
  if (structureType === 'modular') {
    summaryText += chalk.white('Selected Templates: ') + chalk.cyan(selectedFolders.length) + '\n';
  } else if (structureType === 'full-auto') {
    summaryText += chalk.white('Total Templates: ') + chalk.cyan(levelInfo.fileCount) + '\n';
  } else {
    summaryText += chalk.white('Templates: ') + chalk.cyan('Basic Subset (~10)') + '\n';
  }

  console.log(
    boxen(summaryText, {
      padding: 1,
      borderStyle: 'round',
      borderColor: 'cyan',
    })
  );
}

// Show created structure
async function showCreatedStructure(baseDir) {
  console.log(
    boxen(
      chalk.green.bold('📂 Created Structure Preview') +
      '\n\n' +
      chalk.white('Location: ') + chalk.cyan(baseDir) +
      '\n' +
      chalk.white('Total Files: ') + chalk.cyan(createdFiles.length) +
      '\n\n' +
      chalk.gray('Run "tree /f" to see full structure'),
      {
        padding: 1,
        borderStyle: 'round',
        borderColor: 'green',
      }
    )
  );
}

// Confirm creation
async function confirmCreation() {
  const { satisfied } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'satisfied',
      message: chalk.cyan('Are you satisfied with the created project structure?'),
      default: true,
    },
  ]);

  return satisfied;
}

// Ask what to do
async function askWhatToDo() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: chalk.cyan('What would you like to do?'),
      choices: [
        {
          name: chalk.green('🔄 Modify') + chalk.gray(' - Add or remove templates'),
          value: 'modify',
        },
        {
          name: chalk.yellow('🔁 Restart') + chalk.gray(' - Delete and start over'),
          value: 'restart',
        },
        {
          name: chalk.red('🗑️  Delete') + chalk.gray(' - Remove created files and exit'),
          value: 'delete',
        },
        {
          name: chalk.blue('✅ Keep') + chalk.gray(' - Keep as is and exit'),
          value: 'keep',
        },
      ],
    },
  ]);

  return action;
}

// Delete created project
async function deleteCreatedProject() {
  if (!createdProjectPath || !fs.existsSync(createdProjectPath)) {
    console.log(chalk.yellow('\n⚠️  No project to delete.\n'));
    return;
  }

  const { confirmDelete } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmDelete',
      message: chalk.red(`Are you sure you want to delete ${chalk.cyan(createdProjectPath)}?`),
      default: false,
    },
  ]);

  if (confirmDelete) {
    const spinner = ora('Deleting project...').start();
    
    try {
      await fs.remove(createdProjectPath);
      spinner.succeed(chalk.green('✅ Project deleted successfully!'));
      createdProjectPath = null;
      createdFiles = [];
    } catch (error) {
      spinner.fail(chalk.red('Failed to delete project'));
      console.error(chalk.red('Error:'), error.message);
    }
  } else {
    console.log(chalk.yellow('\n⚠️  Deletion cancelled.\n'));
  }
}

// Modify project
async function modifyProject() {
  if (!createdProjectPath) {
    console.log(chalk.red('\n❌ No project to modify.\n'));
    return;
  }

  const { modifyAction } = await inquirer.prompt([
    {
      type: 'list',
      name: 'modifyAction',
      message: chalk.cyan('What would you like to modify?'),
      choices: [
        {
          name: chalk.green('➕ Add') + chalk.gray(' - Add more templates'),
          value: 'add',
        },
        {
          name: chalk.red('➖ Remove') + chalk.gray(' - Remove specific templates'),
          value: 'remove',
        },
        {
          name: chalk.blue('⬅️  Back') + chalk.gray(' - Go back'),
          value: 'back',
        },
      ],
    },
  ]);

  if (modifyAction === 'add') {
    await addToProject();
  } else if (modifyAction === 'remove') {
    await removeFromProject();
  }
}

// Add to project
async function addToProject() {
  const levels = getAllLevels();
  
  const { levelToAdd } = await inquirer.prompt([
    {
      type: 'list',
      name: 'levelToAdd',
      message: chalk.cyan('Select level to add templates from:'),
      choices: levels.map(level => ({
        name: `${level.icon} ${level.name}`,
        value: level.key,
      })),
    },
  ]);

  const foldersToAdd = await handleModularSelection(levelToAdd);

  if (foldersToAdd.length === 0) {
    console.log(chalk.yellow('\n⚠️  No templates selected.\n'));
    return;
  }

  const spinner = ora('Adding templates...').start();

  try {
    const structure = await buildStructureFromLevel(levelToAdd, 'modular', foldersToAdd);
    await createStructure(createdProjectPath, structure, spinner);
    spinner.succeed(chalk.green(`✅ Added ${foldersToAdd.length} templates!`));
  } catch (error) {
    spinner.fail(chalk.red('Failed to add templates'));
    console.error(chalk.red('Error:'), error.message);
  }
}

// Remove from project
async function removeFromProject() {
  if (!createdProjectPath || !fs.existsSync(createdProjectPath)) {
    console.log(chalk.yellow('\n⚠️  No project found.\n'));
    return;
  }

  const srcPath = path.join(createdProjectPath, 'src');
  
  if (!fs.existsSync(srcPath)) {
    console.log(chalk.yellow('\n⚠️  No src directory found.\n'));
    return;
  }

  const folders = fs.readdirSync(srcPath).filter(item => {
    return fs.statSync(path.join(srcPath, item)).isDirectory();
  });

  if (folders.length === 0) {
    console.log(chalk.yellow('\n⚠️  No folders to remove.\n'));
    return;
  }

  const { foldersToRemove } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'foldersToRemove',
      message: chalk.cyan('Select templates to remove:'),
      choices: folders.map(folder => ({
        name: `📁 ${folder}`,
        value: folder,
      })),
      pageSize: 15,
    },
  ]);

  if (foldersToRemove.length === 0) {
    console.log(chalk.yellow('\n⚠️  No templates selected.\n'));
    return;
  }

  const { confirmRemove } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmRemove',
      message: chalk.red(`Remove ${foldersToRemove.length} template(s)?`),
      default: false,
    },
  ]);

  if (confirmRemove) {
    const spinner = ora('Removing templates...').start();

    try {
      for (const folder of foldersToRemove) {
        await fs.remove(path.join(srcPath, folder));
      }
      spinner.succeed(chalk.green(`✅ Removed ${foldersToRemove.length} templates!`));
    } catch (error) {
      spinner.fail(chalk.red('Failed to remove templates'));
      console.error(chalk.red('Error:'), error.message);
    }
  } else {
    console.log(chalk.yellow('\n⚠️  Removal cancelled.\n'));
  }
}

// Ask retry
async function askRetry() {
  const { retry } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'retry',
      message: chalk.cyan('Would you like to try again?'),
      default: true,
    },
  ]);

  return retry;
}

// Create structure recursively
async function createStructure(base, obj, spinner, currentPath = '') {
  for (const name in obj) {
    const fullPath = path.join(base, name);
    const relativePath = path.join(currentPath, name);

    if (typeof obj[name] === 'string') {
      spinner.text = chalk.cyan(`Creating: ${relativePath}`);
      await fs.outputFile(fullPath, obj[name]);
      createdFiles.push(fullPath);
    } else {
      await fs.ensureDir(fullPath);
      await createStructure(fullPath, obj[name], spinner, relativePath);
    }
  }
}

// Helper functions
function generateGitignore() {
  return `# Dependencies
node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
`;
}

function generatePackageJson() {
  return JSON.stringify({
    name: "nextjs-backend-project",
    version: "1.0.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint"
    },
    dependencies: {
      "next": "16.1.1",
      "react": "^19",
      "react-dom": "^19"
    },
    devDependencies: {
      "@types/node": "^20",
      "@types/react": "^19",
      "@types/react-dom": "^19",
      "typescript": "^5"
    }
  }, null, 2);
}

function generateReadme(level, structureType) {
  const levelInfo = LEVEL_INFO[level];
  
  return `# Next.js Backend Project

## Configuration

- **Backend Level**: ${levelInfo.icon} ${levelInfo.name}
- **Structure Type**: ${structureType}
- **Generated**: ${new Date().toISOString()}

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

This project was generated with ${levelInfo.description}.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)
`;
}

// Run the CLI
main();