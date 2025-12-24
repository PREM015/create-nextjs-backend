// Import all template modules
import * as rootTemplates from './root/index.js';
import * as apiTemplates from './api/index.js';
import * as libTemplates from './lib/index.js';
import * as serviceTemplates from './services/index.js';
import * as middlewareTemplates from './middleware/index.js';
import * as validatorTemplates from './validators/index.js';
import * as typeTemplates from './types/index.js';
import * as constantTemplates from './constants/index.js';
import * as exceptionTemplates from './exceptions/index.js';
import * as dtoTemplates from './dto/index.js';
import * as repositoryTemplates from './repositories/index.js';
import * as decoratorTemplates from './decorators/index.js';
import * as filterTemplates from './filters/index.js';
import * as interceptorTemplates from './interceptors/index.js';
import * as policyTemplates from './policies/index.js';
import * as jobTemplates from './jobs/index.js';
import * as eventTemplates from './events/index.js';
import * as configTemplates from './config/index.js';
import * as helperTemplates from './helpers/index.js';
import * as providerTemplates from './providers/index.js';
import * as graphqlTemplates from './graphql/index.js';
import * as schemaTemplates from './schemas/index.js';
import * as hookTemplates from './hooks/index.js';
import * as localeTemplates from './locales/index.js';
import * as testTemplates from './tests/index.js';
import * as scriptTemplates from './scripts/index.js';
import * as docTemplates from './docs/index.js';
import * as appTemplates from './app/index.js';
import * as prismaTemplates from './prisma/index.js';
import * as drizzleTemplates from './drizzle/index.js';
import * as dockerTemplates from './docker/index.js';
import * as githubTemplates from './github/index.js';
import * as huskyTemplates from './husky/index.js';
import * as vscodeTemplates from './vscode/index.js';
import * as publicTemplates from './public/index.js';

export const templates = {
  root: rootTemplates,
  api: apiTemplates,
  lib: libTemplates,
  services: serviceTemplates,
  middleware: middlewareTemplates,
  validators: validatorTemplates,
  types: typeTemplates,
  constants: constantTemplates,
  exceptions: exceptionTemplates,
  dto: dtoTemplates,
  repositories: repositoryTemplates,
  decorators: decoratorTemplates,
  filters: filterTemplates,
  interceptors: interceptorTemplates,
  policies: policyTemplates,
  jobs: jobTemplates,
  events: eventTemplates,
  config: configTemplates,
  helpers: helperTemplates,
  providers: providerTemplates,
  graphql: graphqlTemplates,
  schemas: schemaTemplates,
  hooks: hookTemplates,
  locales: localeTemplates,
  tests: testTemplates,
  scripts: scriptTemplates,
  docs: docTemplates,
  app: appTemplates,
  prisma: prismaTemplates,
  drizzle: drizzleTemplates,
  docker: dockerTemplates,
  github: githubTemplates,
  husky: huskyTemplates,
  vscode: vscodeTemplates,
  public: publicTemplates,
};