#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import structure definitions
import { fullStructure } from './structures/full-structure.js';
import { basicStructure } from './structures/basic-structure.js';
import { folderCategories } from './structures/categories.js';
import { fileContents } from './templates/file-contents.js';

console.log(chalk.blue.bold('\n🚀 Next.js 16 Backend Structure Generator\n'));

async function main() {
  try {
    // Step 1: Check App Router
    const { usesAppRouter } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'usesAppRouter',
        message: 'Does your Next.js project use App Router?',
        default: true,
      },
    ]);

    if (!usesAppRouter) {
      console.log(chalk.red('\n❌ This tool is designed for Next.js App Router only.'));
      console.log(chalk.yellow('Please use Next.js 13+ with App Router.\n'));
      process.exit(0);
    }

    // Step 2: Choose setup type
    const { setupType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'setupType',
        message: 'Choose your setup type:',
        choices: [
          { name: '🎯 Basic Setup (Essential files only)', value: 'basic' },
          { name: '🔧 Custom Setup (Choose specific folders)', value: 'custom' },
          { name: '🚀 Full Setup (All files and folders)', value: 'full' },
        ],
      },
    ]);

    let selectedFolders = [];

    if (setupType === 'custom') {
      // Step 3: Select folder categories
      const { folders } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'folders',
          message: 'Select the folders you want to create:',
          choices: folderCategories.map(cat => ({
            name: `${cat.icon} ${cat.name} (${cat.description})`,
            value: cat.key,
            checked: cat.required,
          })),
          validate: (answer) => {
            if (answer.length < 1) {
              return 'You must choose at least one folder.';
            }
            return true;
          },
        },
      ]);

      selectedFolders = folders;
    }

    // Step 4: Get installation path
    const { installPath } = await inquirer.prompt([
      {
        type: 'input',
        name: 'installPath',
        message: 'Enter the installation path (leave empty for current directory):',
        default: process.cwd(),
        validate: (input) => {
          const absolutePath = path.resolve(input);
          if (!fs.existsSync(path.dirname(absolutePath))) {
            return 'Parent directory does not exist!';
          }
          return true;
        },
      },
    ]);

    // Step 5: Get project name
    const { projectName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter project name (optional, creates subfolder):',
        default: '',
      },
    ]);

    const baseDir = projectName 
      ? path.join(installPath, projectName)
      : installPath;

    // Step 6: Confirm creation
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Create structure in ${chalk.cyan(baseDir)}?`,
        default: true,
      },
    ]);

    if (!confirm) {
      console.log(chalk.yellow('\n⚠️  Operation cancelled.\n'));
      process.exit(0);
    }

    // Step 7: Create structure
    const spinner = ora('Creating project structure...').start();

    try {
      let structure;
      
      if (setupType === 'basic') {
        structure = basicStructure;
      } else if (setupType === 'full') {
        structure = fullStructure;
      } else {
        structure = buildCustomStructure(selectedFolders);
      }

      await createStructure(baseDir, structure);
      
      spinner.succeed(chalk.green('✅ Backend structure created successfully!'));
      
      // Show summary
      showSummary(baseDir, setupType, selectedFolders);
      
    } catch (error) {
      spinner.fail(chalk.red('Failed to create structure'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }

  } catch (error) {
    console.error(chalk.red('\n❌ An error occurred:'), error.message);
    process.exit(1);
  }
}

// Recursive structure creation
async function createStructure(base, obj) {
  for (const name in obj) {
    const fullPath = path.join(base, name);
    
    if (typeof obj[name] === 'string') {
      // It's a file
      await fs.outputFile(fullPath, obj[name]);
    } else {
      // It's a folder
      await fs.ensureDir(fullPath);
      await createStructure(fullPath, obj[name]);
    }
  }
}

// Build custom structure based on selected folders
function buildCustomStructure(selectedFolders) {
  const structure = {
    "src": {},
    ".env.example": fileContents.env,
    "middleware.ts": fileContents.middleware,
    "next.config.ts": fileContents.nextConfig,
  };

  selectedFolders.forEach(folder => {
    const category = folderCategories.find(cat => cat.key === folder);
    if (category && category.structure) {
      mergeStructure(structure, category.structure);
    }
  });

  return structure;
}

// Merge structures
function mergeStructure(target, source) {
  for (const key in source) {
    if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      mergeStructure(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

// Show summary
function showSummary(baseDir, setupType, selectedFolders) {
  console.log(chalk.blue.bold('\n📊 Summary:\n'));
  console.log(chalk.white(`Installation Path: ${chalk.cyan(baseDir)}`));
  console.log(chalk.white(`Setup Type: ${chalk.cyan(setupType)}`));
  
  if (setupType === 'custom' && selectedFolders.length > 0) {
    console.log(chalk.white(`\nSelected Folders:`));
    selectedFolders.forEach(folder => {
      const cat = folderCategories.find(c => c.key === folder);
      console.log(chalk.gray(`  • ${cat.name}`));
    });
  }
  
  console.log(chalk.yellow.bold('\n📝 Next Steps:\n'));
  console.log(chalk.white('1. Install dependencies:'));
  console.log(chalk.cyan('   npm install\n'));
  console.log(chalk.white('2. Set up environment variables:'));
  console.log(chalk.cyan('   cp .env.example .env\n'));
  console.log(chalk.white('3. Configure your database:'));
  console.log(chalk.cyan('   npx prisma generate\n   npx prisma db push\n'));
  console.log(chalk.white('4. Start development server:'));
  console.log(chalk.cyan('   npm run dev\n'));
}

main();


## Part 2: Main Index File

### `index.js`
```javascript
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
import { getAllCategories } from './structures/categories.js';
import { getBasicStructure } from './structures/basic-structure.js';
import { getFullStructure } from './structures/full-structure.js';

// Display welcome banner
console.log(
  boxen(
    chalk.blue.bold('Next.js 16.1.1 Backend Generator') +
    '\n\n' +
    chalk.white('Create production-ready backend structure') +
    '\n' +
    chalk.gray('473+ files ready to use'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'blue',
    }
  )
);

async function main() {
  try {
    // Step 1: Check App Router
    const { usesAppRouter } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'usesAppRouter',
        message: chalk.cyan('Does your Next.js project use App Router (Next.js 13+)?'),
        default: true,
      },
    ]);

    if (!usesAppRouter) {
      console.log(
        boxen(
          chalk.red.bold('❌ App Router Required') +
          '\n\n' +
          chalk.white('This tool is designed for Next.js App Router only.') +
          '\n' +
          chalk.yellow('Please use Next.js 13+ with App Router configuration.'),
          {
            padding: 1,
            borderColor: 'red',
            borderStyle: 'round',
          }
        )
      );
      process.exit(0);
    }

    // Step 2: Choose setup type
    const { setupType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'setupType',
        message: chalk.cyan('Choose your setup type:'),
        choices: [
          {
            name: chalk.green('🎯 Basic Setup') + chalk.gray(' - Essential files only (~50 files)'),
            value: 'basic',
          },
          {
            name: chalk.yellow('🔧 Custom Setup') + chalk.gray(' - Choose specific folders'),
            value: 'custom',
          },
          {
            name: chalk.blue('🚀 Full Setup') + chalk.gray(' - All 473+ files and folders'),
            value: 'full',
          },
        ],
      },
    ]);

    let selectedFolders = [];
    let selectedCategories = [];

    if (setupType === 'custom') {
      const categories = getAllCategories();
      
      // Step 3a: Select main categories
      const { mainCategories } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'mainCategories',
          message: chalk.cyan('Select the main categories you want to include:'),
          choices: categories.map((cat) => ({
            name: `${cat.icon} ${chalk.bold(cat.name)} ${chalk.gray(`- ${cat.description} (${cat.fileCount} files)`)}`,
            value: cat.key,
            checked: cat.required,
          })),
          validate: (answer) => {
            if (answer.length < 1) {
              return chalk.red('You must choose at least one category.');
            }
            return true;
          },
        },
      ]);

      selectedCategories = mainCategories;

      // Step 3b: For each category, select sub-folders
      for (const categoryKey of mainCategories) {
        const category = categories.find((c) => c.key === categoryKey);
        
        if (category.subFolders && category.subFolders.length > 0) {
          const { subFolders } = await inquirer.prompt([
            {
              type: 'checkbox',
              name: 'subFolders',
              message: chalk.cyan(`Select folders for ${chalk.bold(category.name)}:`),
              choices: category.subFolders.map((sub) => ({
                name: `${chalk.white(sub.name)} ${chalk.gray(`- ${sub.description}`)}`,
                value: `${categoryKey}.${sub.key}`,
                checked: sub.required,
              })),
            },
          ]);

          selectedFolders.push(...subFolders);
        } else {
          selectedFolders.push(categoryKey);
        }
      }
    }

    // Step 4: Get installation path
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

    // Step 5: Get project name (optional)
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

    const baseDir = projectName
      ? path.join(installPath, projectName)
      : installPath;

    // Check if directory exists and is not empty
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
          process.exit(0);
        }
      }
    }

    // Step 6: Show summary and confirm
    console.log(
      boxen(
        chalk.bold('📋 Configuration Summary') +
        '\n\n' +
        chalk.white('Setup Type: ') + chalk.cyan(setupType.toUpperCase()) +
        '\n' +
        chalk.white('Installation Path: ') + chalk.cyan(baseDir) +
        '\n' +
        (setupType === 'custom'
          ? chalk.white('Selected Categories: ') + chalk.cyan(selectedCategories.length) + '\n'
          : '') +
        (setupType === 'full'
          ? chalk.white('Total Files: ') + chalk.cyan('473+') + '\n'
          : '') +
        (setupType === 'basic'
          ? chalk.white('Total Files: ') + chalk.cyan('~50') + '\n'
          : ''),
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: 'cyan',
        }
      )
    );

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
      process.exit(0);
    }

    // Step 7: Create structure
    const spinner = ora({
      text: chalk.cyan('Creating project structure...'),
      color: 'cyan',
    }).start();

    try {
      let structure;
      let fileCount = 0;

      if (setupType === 'basic') {
        structure = getBasicStructure();
        fileCount = 50;
      } else if (setupType === 'full') {
        structure = getFullStructure();
        fileCount = 473;
      } else {
        structure = buildCustomStructure(selectedFolders, selectedCategories);
        fileCount = countFiles(structure);
      }

      // Ensure base directory exists
      await fs.ensureDir(baseDir);

      // Create the structure
      await createStructure(baseDir, structure, spinner);

      spinner.succeed(chalk.green(`✅ Successfully created ${fileCount}+ files!`));

      // Show next steps
      showNextSteps(baseDir, setupType);

    } catch (error) {
      spinner.fail(chalk.red('Failed to create structure'));
      console.error(chalk.red('\n❌ Error:'), error.message);
      if (process.env.DEBUG) {
        console.error(error.stack);
      }
      process.exit(1);
    }

  } catch (error) {
    if (error.isTtyError) {
      console.error(chalk.red('\n❌ Prompt could not be rendered in the current environment'));
    } else {
      console.error(chalk.red('\n❌ An error occurred:'), error.message);
    }
    process.exit(1);
  }
}

// Recursive structure creation with progress
async function createStructure(base, obj, spinner, currentPath = '') {
  for (const name in obj) {
    const fullPath = path.join(base, name);
    const relativePath = path.join(currentPath, name);

    if (typeof obj[name] === 'string') {
      // It's a file
      spinner.text = chalk.cyan(`Creating: ${relativePath}`);
      await fs.outputFile(fullPath, obj[name]);
    } else {
      // It's a folder
      await fs.ensureDir(fullPath);
      await createStructure(fullPath, obj[name], spinner, relativePath);
    }
  }
}

// Build custom structure based on selections
function buildCustomStructure(selectedFolders, selectedCategories) {
  const categories = getAllCategories();
  const structure = {
    '.env.example': '', // Will be filled from templates
    '.gitignore': '',
    'middleware.ts': '',
    'instrumentation.ts': '',
    'next.config.ts': '',
    'tsconfig.json': '',
    'package.json': '',
    'README.md': '',
  };

  // Add selected categories
  for (const categoryKey of selectedCategories) {
    const category = categories.find((c) => c.key === categoryKey);
    if (category && category.structure) {
      mergeStructure(structure, category.structure);
    }
  }

  // Add selected sub-folders
  for (const folderPath of selectedFolders) {
    const [categoryKey, subKey] = folderPath.split('.');
    const category = categories.find((c) => c.key === categoryKey);
    
    if (category && subKey && category.subFolders) {
      const subFolder = category.subFolders.find((s) => s.key === subKey);
      if (subFolder && subFolder.structure) {
        mergeStructure(structure, subFolder.structure);
      }
    }
  }

  return structure;
}

// Merge structures recursively
function mergeStructure(target, source) {
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
      if (!target[key]) {
        target[key] = {};
      }
      mergeStructure(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

// Count total files in structure
function countFiles(obj) {
  let count = 0;
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      count++;
    } else {
      count += countFiles(obj[key]);
    }
  }
  return count;
}

// Show next steps
function showNextSteps(baseDir, setupType) {
  const steps = [
    {
      step: '1',
      title: 'Navigate to project',
      command: `cd ${path.basename(baseDir)}`,
    },
    {
      step: '2',
      title: 'Install dependencies',
      command: 'npm install',
    },
    {
      step: '3',
      title: 'Setup environment',
      command: 'cp .env.example .env',
    },
    {
      step: '4',
      title: 'Generate Prisma client',
      command: 'npx prisma generate',
    },
    {
      step: '5',
      title: 'Push database schema',
      command: 'npx prisma db push',
    },
    {
      step: '6',
      title: 'Start development server',
      command: 'npm run dev',
    },
  ];

  console.log('\n');
  console.log(
    boxen(
      chalk.bold.green('🎉 Project Created Successfully!') +
      '\n\n' +
      chalk.white('Next Steps:') +
      '\n\n' +
      steps
        .map(
          (s) =>
            chalk.cyan(`${s.step}.`) +
            ' ' +
            chalk.white(s.title) +
            '\n   ' +
            chalk.gray(s.command)
        )
        .join('\n\n'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green',
      }
    )
  );

  console.log(chalk.gray('\n📚 Documentation: https://nextjs.org/docs'));
  console.log(chalk.gray('🐛 Report issues: https://github.com/yourusername/create-nextjs-backend/issues\n'));
}

// Run the CLI
main().catch((error) => {
  console.error(chalk.red('\n💥 Unexpected error:'), error);
  process.exit(1);
});