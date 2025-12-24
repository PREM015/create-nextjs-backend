import { templates } from '../templates/index.js';

export function getFullStructure() {
  return {
    // Root configuration files
    ".env": "",
    ".env.local": "",
    ".env.development": templates.root.envDevelopment,
    ".env.production": templates.root.envProduction,
    ".env.test": templates.root.envTest,
    ".env.example": templates.root.envExample,
    ".env.local.example": templates.root.envLocalExample,
    ".gitignore": templates.root.gitignore,
    ".gitattributes": templates.root.gitattributes,
    ".mailmap": templates.root.mailmap,
    ".eslintrc.json": templates.root.eslintrc,
    ".eslintignore": templates.root.eslintignore,
    ".prettierrc": templates.root.prettierrc,
    ".prettierignore": templates.root.prettierignore,
    ".editorconfig": templates.root.editorconfig,
    ".nvmrc": templates.root.nvmrc,
    "next.config.ts": templates.root.nextConfig,
    "tsconfig.json": templates.root.tsconfig,
    "tsconfig.build.json": templates.root.tsconfigBuild,
    "tsconfig.server.json": templates.root.tsconfigServer,
    "middleware.ts": templates.root.middleware,
    "instrumentation.ts": templates.root.instrumentation,
    "jest.config.js": templates.root.jestConfig,
    "vitest.config.ts": templates.root.vitestConfig,
    "playwright.config.ts": templates.root.playwrightConfig,
    "commitlint.config.js": templates.root.commitlintConfig,
    "renovate.json": templates.root.renovateJson,
    "sonar-project.properties": templates.root.sonarProperties,
    "package.json": templates.root.packageJson,
    "README.md": templates.root.readme,
    "CHANGELOG.md": templates.root.changelog,
    "SECURITY.md": templates.root.security,
    "CONTRIBUTING.md": templates.root.contributing,
    "CODE_OF_CONDUCT.md": templates.root.codeOfConduct,
    "LICENSE": templates.root.license,

    // Husky
    ".husky": {
      "pre-commit": templates.husky.preCommit,
      "pre-push": templates.husky.prePush,
      "commit-msg": templates.husky.commitMsg
    },

    // VSCode
    ".vscode": {
      "settings.json": templates.vscode.settings,
      "extensions.json": templates.vscode.extensions,
      "launch.json": templates.vscode.launch
    },

    // GitHub
    ".github": {
      "workflows": {
        "ci.yml": templates.github.workflows.ci,
        "cd.yml": templates.github.workflows.cd,
        "tests.yml": templates.github.workflows.tests,
        "security-scan.yml": templates.github.workflows.security
      },
      "ISSUE_TEMPLATE": {
        "bug_report.md": templates.github.issueTemplate.bug,
        "feature_request.md": templates.github.issueTemplate.feature
      },
      "PULL_REQUEST_TEMPLATE.md": templates.github.prTemplate,
      "CODEOWNERS": templates.github.codeowners,
      "dependabot.yml": templates.github.dependabot
    },

    // Source directory
    "src": getSourceStructure(),

    // Prisma
    "prisma": {
      "schema.prisma": templates.prisma.schema,
      ".env": "",
      "migrations": {},
      "seed.ts": templates.prisma.seed,
      "seed-dev.ts": templates.prisma.seedDev,
      "seed-prod.ts": templates.prisma.seedProd,
      "seed-data": {
        "users.json": templates.prisma.seedData.users,
        "posts.json": templates.prisma.seedData.posts
      }
    },

    // Drizzle
    "drizzle": {
      "schema.ts": templates.drizzle.schema,
      "migrations": {},
      "config.ts": templates.drizzle.config
    },

    // Public
    "public": {
      "uploads": {},
      "static": {},
      "images": {
        "placeholder.png": ""
      },
      "fonts": {},
      "favicon.ico": "",
      "robots.txt": templates.public.robots,
      "sitemap.xml": templates.public.sitemap,
      "manifest.json": templates.public.manifest
    },

    // Tests
    "tests": getTestsStructure(),

    // Scripts
    "scripts": getScriptsStructure(),

    // Docs
    "docs": getDocsStructure(),

    // Docker
    "docker": {
      "Dockerfile": templates.docker.dockerfile,
      "docker-compose.yml": templates.docker.compose,
      "docker-compose.dev.yml": templates.docker.composeDev,
      ".dockerignore": templates.docker.dockerignore
    }
  };
}

function getSourceStructure() {
  return {
    "app": getAppStructure(),
    "lib": getLibStructure(),
    "services": getServicesStructure(),
    "repositories": getRepositoriesStructure(),
    "middleware": getMiddlewareStructure(),
    "validators": getValidatorsStructure(),
    "dto": getDtoStructure(),
    "types": getTypesStructure(),
    "constants": getConstantsStructure(),
    "exceptions": getExceptionsStructure(),
    "decorators": getDecoratorsStructure(),
    "filters": getFiltersStructure(),
    "interceptors": getInterceptorsStructure(),
    "policies": getPoliciesStructure(),
    "jobs": getJobsStructure(),
    "events": getEventsStructure(),
    "config": getConfigStructure(),
    "helpers": getHelpersStructure(),
    "providers": getProvidersStructure(),
    "graphql": getGraphqlStructure(),
    "schemas": getSchemasStructure(),
    "hooks": getHooksStructure(),
    "locales": getLocalesStructure(),
    "components": {}
  };
}

function getAppStructure() {
  return {
    "api": {
      "security": {
        "helmet.ts": templates.app.api.security.helmet,
        "xss-protection.ts": templates.app.api.security.xss,
        "sql-injection.ts": templates.app.api.security.sqlInjection,
        "sanitize.ts": templates.app.api.security.sanitize
      },
      "v1": getApiV1Structure(),
      "v2": getApiV2Structure(),
      "auth": getAuthRoutesStructure(),
      "users": getUsersRoutesStructure(),
      "admin": getAdminRoutesStructure(),
      "upload": getUploadRoutesStructure(),
      "webhooks": getWebhooksStructure(),
      "notifications": getNotificationsRoutesStructure(),
      "health": {
        "route.ts": templates.api.health
      },
      "liveness": {
        "route.ts": templates.api.liveness
      },
      "readiness": {
        "route.ts": templates.api.readiness
      },
      "metrics": {
        "route.ts": templates.api.metrics
      },
      "docs": {
        "route.ts": templates.api.docs
      },
      "graphql": {
        "route.ts": templates.api.graphql
      },
      "cron": {
        "cleanup": {
          "route.ts": templates.api.cron.cleanup
        },
        "backup": {
          "route.ts": templates.api.cron.backup
        },
        "reports": {
          "route.ts": templates.api.cron.reports
        }
      }
    },
    "(auth)": {
      "login": {
        "page.tsx": templates.app.pages.login
      },
      "register": {
        "page.tsx": templates.app.pages.register
      },
      "forgot-password": {
        "page.tsx": templates.app.pages.forgotPassword
      }
    },
    "(dashboard)": {
      "dashboard": {
        "page.tsx": templates.app.pages.dashboard
      },
      "layout.tsx": templates.app.dashboardLayout
    },
    "robots.ts": templates.app.robots,
    "sitemap.ts": templates.app.sitemap,
    "manifest.ts": templates.app.manifest,
    "opengraph-image.tsx": templates.app.ogImage,
    "twitter-image.tsx": templates.app.twitterImage,
    "layout.tsx": templates.app.layout,
    "page.tsx": templates.app.page,
    "globals.css": templates.app.globalsCss,
    "error.tsx": templates.app.error,
    "global-error.tsx": templates.app.globalError,
    "loading.tsx": templates.app.loading,
    "not-found.tsx": templates.app.notFound,
    "template.tsx": templates.app.template
  };
}

function getApiV1Structure() {
  return {
    "auth": {
      "login": { "route.ts": templates.api.v1.auth.login },
      "register": { "route.ts": templates.api.v1.auth.register },
      "logout": { "route.ts": templates.api.v1.auth.logout },
      "refresh": { "route.ts": templates.api.v1.auth.refresh },
      "verify-email": { "route.ts": templates.api.v1.auth.verifyEmail },
      "forgot-password": { "route.ts": templates.api.v1.auth.forgotPassword },
      "reset-password": { "route.ts": templates.api.v1.auth.resetPassword },
      "change-password": { "route.ts": templates.api.v1.auth.changePassword },
      "two-factor": { "route.ts": templates.api.v1.auth.twoFactor },
      "session": { "route.ts": templates.api.v1.auth.session }
    },
    "users": {
      "route.ts": templates.api.v1.users.list,
      "[id]": {
        "route.ts": templates.api.v1.users.single,
        "profile": { "route.ts": templates.api.v1.users.profile },
        "avatar": { "route.ts": templates.api.v1.users.avatar }
      },
      "me": { "route.ts": templates.api.v1.users.me },
      "search": { "route.ts": templates.api.v1.users.search }
    },
    "admin": {
      "users": { "route.ts": templates.api.v1.admin.users },
      "analytics": { "route.ts": templates.api.v1.admin.analytics },
      "settings": { "route.ts": templates.api.v1.admin.settings }
    },
    "upload": {
      "route.ts": templates.api.v1.upload.main,
      "[id]": { "route.ts": templates.api.v1.upload.single }
    },
    "webhooks": {
      "stripe": { "route.ts": templates.api.v1.webhooks.stripe },
      "github": { "route.ts": templates.api.v1.webhooks.github }
    },
    "notifications": {
      "route.ts": templates.api.v1.notifications.list,
      "[id]": { "route.ts": templates.api.v1.notifications.single }
    },
    "posts": {
      "route.ts": templates.api.v1.posts.list,
      "[id]": { "route.ts": templates.api.v1.posts.single }
    },
    "payments": {
      "route.ts": templates.api.v1.payments.list,
      "[id]": { "route.ts": templates.api.v1.payments.single }
    }
  };
}

function getApiV2Structure() {
  // Same structure as V1 for now
  return getApiV1Structure();
}

function getLibStructure() {
  return {
    "db": {
      "index.ts": templates.lib.db.index,
      "prisma.ts": templates.lib.db.prisma,
      "drizzle.ts": templates.lib.db.drizzle,
      "connection.ts": templates.lib.db.connection,
      "schema": {
        "user.schema.ts": templates.lib.db.schema.user,
        "post.schema.ts": templates.lib.db.schema.post,
        "index.ts": templates.lib.db.schema.index
      },
      "migrations": {},
      "seed.ts": templates.lib.db.seed
    },
    "auth": {
      "index.ts": templates.lib.auth.index,
      "config.ts": templates.lib.auth.config,
      "session.ts": templates.lib.auth.session,
      "jwt.ts": templates.lib.auth.jwt,
      "bcrypt.ts": templates.lib.auth.bcrypt,
      "tokens.ts": templates.lib.auth.tokens,
      "oauth.ts": templates.lib.auth.oauth,
      "csrf.ts": templates.lib.auth.csrf,
      "two-factor.ts": templates.lib.auth.twoFactor,
      "password-policy.ts": templates.lib.auth.passwordPolicy,
      "email-verification.ts": templates.lib.auth.emailVerification,
      "providers": {
        "google.ts": templates.lib.auth.providers.google,
        "github.ts": templates.lib.auth.providers.github,
        "facebook.ts": templates.lib.auth.providers.facebook,
        "twitter.ts": templates.lib.auth.providers.twitter,
        "credentials.ts": templates.lib.auth.providers.credentials
      },
      "guards": {
        "auth.guard.ts": templates.lib.auth.guards.auth,
        "roles.guard.ts": templates.lib.auth.guards.roles,
        "permissions.guard.ts": templates.lib.auth.guards.permissions
      }
    },
    "cache": {
      "redis.ts": templates.lib.cache.redis,
      "memory.ts": templates.lib.cache.memory,
      "index.ts": templates.lib.cache.index
    },
    "queue": {
      "index.ts": templates.lib.queue.index,
      "bull.ts": templates.lib.queue.bull,
      "jobs": {
        "email.job.ts": templates.lib.queue.jobs.email,
        "notification.job.ts": templates.lib.queue.jobs.notification,
        "cleanup.job.ts": templates.lib.queue.jobs.cleanup
      },
      "workers": {
        "email.worker.ts": templates.lib.queue.workers.email,
        "notification.worker.ts": templates.lib.queue.workers.notification
      }
    },
    "email": {
      "index.ts": templates.lib.email.index,
      "nodemailer.ts": templates.lib.email.nodemailer,
      "resend.ts": templates.lib.email.resend,
      "sendgrid.ts": templates.lib.email.sendgrid,
      "templates": {
        "welcome.ts": templates.lib.email.templates.welcome,
        "reset-password.ts": templates.lib.email.templates.resetPassword,
        "verify-email.ts": templates.lib.email.templates.verifyEmail,
        "notification.ts": templates.lib.email.templates.notification
      },
      "config.ts": templates.lib.email.config
    },
    "storage": {
      "index.ts": templates.lib.storage.index,
      "s3.ts": templates.lib.storage.s3,
      "cloudinary.ts": templates.lib.storage.cloudinary,
      "local.ts": templates.lib.storage.local,
      "uploadthing.ts": templates.lib.storage.uploadthing,
      "config.ts": templates.lib.storage.config
    },
    "payment": {
      "stripe.ts": templates.lib.payment.stripe,
      "paypal.ts": templates.lib.payment.paypal,
      "razorpay.ts": templates.lib.payment.razorpay
    },
    "notifications": {
      "index.ts": templates.lib.notifications.index,
      "push.ts": templates.lib.notifications.push,
      "websocket.ts": templates.lib.notifications.websocket,
      "sse.ts": templates.lib.notifications.sse
    },
    "logger": {
      "index.ts": templates.lib.logger.index,
      "winston.ts": templates.lib.logger.winston,
      "pino.ts": templates.lib.logger.pino,
      "config.ts": templates.lib.logger.config
    },
    "monitoring": {
      "sentry.ts": templates.lib.monitoring.sentry,
      "datadog.ts": templates.lib.monitoring.datadog,
      "newrelic.ts": templates.lib.monitoring.newrelic
    },
    "rate-limit": {
      "index.ts": templates.lib.rateLimit.index,
      "upstash.ts": templates.lib.rateLimit.upstash,
      "config.ts": templates.lib.rateLimit.config
    },
    "websocket": {
      "index.ts": templates.lib.websocket.index,
      "server.ts": templates.lib.websocket.server,
      "handlers.ts": templates.lib.websocket.handlers
    },
    "realtime": {
      "pusher.ts": templates.lib.realtime.pusher,
      "ably.ts": templates.lib.realtime.ably,
      "socket-manager.ts": templates.lib.realtime.socketManager
    },
    "api": {
      "client.ts": templates.lib.api.client,
      "interceptors.ts": templates.lib.api.interceptors,
      "config.ts": templates.lib.api.config
    },
    "file-processing": {
      "image-optimization.ts": templates.lib.fileProcessing.imageOptimization,
      "video-processing.ts": templates.lib.fileProcessing.videoProcessing,
      "pdf-generation.ts": templates.lib.fileProcessing.pdfGeneration,
      "csv-parser.ts": templates.lib.fileProcessing.csvParser,
      "excel-processor.ts": templates.lib.fileProcessing.excelProcessor
    },
    "encryption": {
      "crypto.ts": templates.lib.encryption.crypto,
      "hash.ts": templates.lib.encryption.hash
    },
    "i18n": {
      "config.ts": templates.lib.i18n.config,
      "server.ts": templates.lib.i18n.server,
      "client.ts": templates.lib.i18n.client
    },
    "performance": {
      "tracing.ts": templates.lib.performance.tracing,
      "profiling.ts": templates.lib.performance.profiling,
      "metrics-collector.ts": templates.lib.performance.metricsCollector
    },
    "utils": {
      "response.ts": templates.lib.utils.response,
      "error.ts": templates.lib.utils.error,
      "pagination.ts": templates.lib.utils.pagination,
      "date.ts": templates.lib.utils.date,
      "string.ts": templates.lib.utils.string,
      "validation.ts": templates.lib.utils.validation,
      "helpers.ts": templates.lib.utils.helpers,
      "cn.ts": templates.lib.utils.cn,
      "env.ts": templates.lib.utils.env
    }
  };
}

function getServicesStructure() {
  return {
    "auth.service.ts": templates.services.auth,
    "user.service.ts": templates.services.user,
    "email.service.ts": templates.services.email,
    "upload.service.ts": templates.services.upload,
    "notification.service.ts": templates.services.notification,
    "payment.service.ts": templates.services.payment,
    "analytics.service.ts": templates.services.analytics,
    "webhook.service.ts": templates.services.webhook,
    "admin.service.ts": templates.services.admin
  };
}

function getRepositoriesStructure() {
  return {
    "base.repository.ts": templates.repositories.base,
    "user.repository.ts": templates.repositories.user,
    "post.repository.ts": templates.repositories.post,
    "session.repository.ts": templates.repositories.session,
    "notification.repository.ts": templates.repositories.notification
  };
}

function getMiddlewareStructure() {
  return {
    "auth.middleware.ts": templates.middleware.auth,
    "error.middleware.ts": templates.middleware.error,
    "validation.middleware.ts": templates.middleware.validation,
    "rate-limit.middleware.ts": templates.middleware.rateLimit,
    "cors.middleware.ts": templates.middleware.cors,
    "logger.middleware.ts": templates.middleware.logger,
    "compression.middleware.ts": templates.middleware.compression,
    "security.middleware.ts": templates.middleware.security,
    "role.middleware.ts": templates.middleware.role,
    "api-version.middleware.ts": templates.middleware.apiVersion,
    "csrf.middleware.ts": templates.middleware.csrf,
    "chain.ts": templates.middleware.chain
  };
}

function getValidatorsStructure() {
  return {
    "auth.validator.ts": templates.validators.auth,
    "user.validator.ts": templates.validators.user,
    "post.validator.ts": templates.validators.post,
    "upload.validator.ts": templates.validators.upload,
    "payment.validator.ts": templates.validators.payment,
    "common.validator.ts": templates.validators.common
  };
}

function getDtoStructure() {
  return {
    "auth": {
      "login.dto.ts": templates.dto.auth.login,
      "register.dto.ts": templates.dto.auth.register,
      "reset-password.dto.ts": templates.dto.auth.resetPassword
    },
    "user": {
      "create-user.dto.ts": templates.dto.user.create,
      "update-user.dto.ts": templates.dto.user.update,
      "user-response.dto.ts": templates.dto.user.response
    },
    "common": {
      "pagination.dto.ts": templates.dto.common.pagination,
      "response.dto.ts": templates.dto.common.response
    }
  };
}

function getTypesStructure() {
  return {
    "api.types.ts": templates.types.api,
    "auth.types.ts": templates.types.auth,
    "user.types.ts": templates.types.user,
    "database.types.ts": templates.types.database,
    "request.types.ts": templates.types.request,
    "response.types.ts": templates.types.response,
    "global.d.ts": templates.types.global,
    "next-auth.d.ts": templates.types.nextAuth,
    "prisma.d.ts": templates.types.prisma,
    "environment.d.ts": templates.types.environment,
    "index.ts": templates.types.index
  };
}

function getConstantsStructure() {
  return {
    "api.constants.ts": templates.constants.api,
    "errors.constants.ts": templates.constants.errors,
    "roles.constants.ts": templates.constants.roles,
    "permissions.constants.ts": templates.constants.permissions,
    "status.constants.ts": templates.constants.status,
    "routes.constants.ts": templates.constants.routes,
    "index.ts": templates.constants.index
  };
}

function getExceptionsStructure() {
  return {
    "base.exception.ts": templates.exceptions.base,
    "http.exception.ts": templates.exceptions.http,
    "validation.exception.ts": templates.exceptions.validation,
    "auth.exception.ts": templates.exceptions.auth,
    "database.exception.ts": templates.exceptions.database,
    "index.ts": templates.exceptions.index
  };
}

function getDecoratorsStructure() {
  return {
    "auth.decorator.ts": templates.decorators.auth,
    "roles.decorator.ts": templates.decorators.roles,
    "validation.decorator.ts": templates.decorators.validation,
    "cache.decorator.ts": templates.decorators.cache
  };
}

function getFiltersStructure() {
  return {
    "http-exception.filter.ts": templates.filters.httpException,
    "validation.filter.ts": templates.filters.validation,
    "all-exceptions.filter.ts": templates.filters.allExceptions
  };
}

function getInterceptorsStructure() {
  return {
    "logging.interceptor.ts": templates.interceptors.logging,
    "transform.interceptor.ts": templates.interceptors.transform,
    "timeout.interceptor.ts": templates.interceptors.timeout,
    "cache.interceptor.ts": templates.interceptors.cache
  };
}

function getPoliciesStructure() {
  return {
    "user.policy.ts": templates.policies.user,
    "post.policy.ts": templates.policies.post,
    "admin.policy.ts": templates.policies.admin
  };
}

function getJobsStructure() {
  return {
    "scheduled": {
      "cleanup.job.ts": templates.jobs.scheduled.cleanup,
      "backup.job.ts": templates.jobs.scheduled.backup,
      "report.job.ts": templates.jobs.scheduled.report
    },
    "queue": {
      "email.queue.ts": templates.jobs.queue.email,
      "notification.queue.ts": templates.jobs.queue.notification
    },
    "scheduler.ts": templates.jobs.scheduler,
    "cron-config.ts": templates.jobs.cronConfig
  };
}

function getEventsStructure() {
  return {
    "emitter.ts": templates.events.emitter,
    "listeners": {
      "user.listener.ts": templates.events.listeners.user,
      "email.listener.ts": templates.events.listeners.email
    },
    "events": {
      "user.events.ts": templates.events.events.user,
      "auth.events.ts": templates.events.events.auth
    }
  };
}

function getConfigStructure() {
  return {
    "app.config.ts": templates.config.app,
    "database.config.ts": templates.config.database,
    "auth.config.ts": templates.config.auth,
    "email.config.ts": templates.config.email,
    "storage.config.ts": templates.config.storage,
    "cache.config.ts": templates.config.cache,
    "queue.config.ts": templates.config.queue,
    "cors.config.ts": templates.config.cors,
    "rate-limit.config.ts": templates.config.rateLimit,
    "index.ts": templates.config.index
  };
}

function getHelpersStructure() {
  return {
    "password.helper.ts": templates.helpers.password,
    "token.helper.ts": templates.helpers.token,
    "url.helper.ts": templates.helpers.url,
    "file.helper.ts": templates.helpers.file,
    "format.helper.ts": templates.helpers.format
  };
}

function getProvidersStructure() {
  return {
    "database.provider.ts": templates.providers.database,
    "cache.provider.ts": templates.providers.cache,
    "queue.provider.ts": templates.providers.queue,
    "email.provider.ts": templates.providers.email
  };
}

function getGraphqlStructure() {
  return {
    "schema.ts": templates.graphql.schema,
    "context.ts": templates.graphql.context,
    "resolvers": {
      "user.resolver.ts": templates.graphql.resolvers.user,
      "post.resolver.ts": templates.graphql.resolvers.post,
      "index.ts": templates.graphql.resolvers.index
    },
    "directives": {
      "auth.directive.ts": templates.graphql.directives.auth,
      "index.ts": templates.graphql.directives.index
    },
    "types": {
      "user.type.ts": templates.graphql.types.user,
      "post.type.ts": templates.graphql.types.post
    }
  };
}

function getSchemasStructure() {
  return {
    "zod": {
      "user.schema.ts": templates.schemas.zod.user,
      "post.schema.ts": templates.schemas.zod.post,
      "auth.schema.ts": templates.schemas.zod.auth,
      "index.ts": templates.schemas.zod.index
    },
    "yup": {
      "user.schema.ts": templates.schemas.yup.user,
      "index.ts": templates.schemas.yup.index
    },
    "json-schema": {
      "user.json": templates.schemas.jsonSchema.user,
      "post.json": templates.schemas.jsonSchema.post
    },
    "graphql": {
      "user.graphql": templates.schemas.graphql.user,
      "post.graphql": templates.schemas.graphql.post
    }
  };
}

function getHooksStructure() {
  return {
    "useAuth.ts": templates.hooks.useAuth,
    "useUser.ts": templates.hooks.useUser,
    "useApi.ts": templates.hooks.useApi
  };
}

function getLocalesStructure() {
  return {
    "en": {
      "common.json": templates.locales.en.common,
      "errors.json": templates.locales.en.errors,
      "auth.json": templates.locales.en.auth
    },
    "es": {
      "common.json": templates.locales.es.common,
      "errors.json": templates.locales.es.errors,
      "auth.json": templates.locales.es.auth
    },
    "fr": {
      "common.json": templates.locales.fr.common,
      "errors.json": templates.locales.fr.errors,
      "auth.json": templates.locales.fr.auth
    }
  };
}

function getTestsStructure() {
  return {
    "unit": {
      "services": {
        "user.service.test.ts": templates.tests.unit.services.user,
        "auth.service.test.ts": templates.tests.unit.services.auth
      },
      "repositories": {
        "user.repository.test.ts": templates.tests.unit.repositories.user
      },
      "utils": {
        "helpers.test.ts": templates.tests.unit.utils.helpers
      }
    },
    "integration": {
      "api": {
        "auth.test.ts": templates.tests.integration.api.auth,
        "users.test.ts": templates.tests.integration.api.users
      },
      "database": {
        "queries.test.ts": templates.tests.integration.database.queries
      }
    },
    "e2e": {
      "api": {
        "auth-flow.test.ts": templates.tests.e2e.api.authFlow
      }
    },
    "fixtures": {
      "data.json": templates.tests.fixtures.data
    },
    "mocks": {
      "services.mock.ts": templates.tests.mocks.services
    },
    "helpers": {
      "test-utils.ts": templates.tests.helpers.testUtils,
      "db-helpers.ts": templates.tests.helpers.dbHelpers
    },
    "__mocks__": {
      "prisma.ts": templates.tests.mocks.prisma
    },
    "setup.ts": templates.tests.setup,
    "setup-env.ts": templates.tests.setupEnv,
    "jest.setup.js": templates.tests.jestSetup
  };
}

function getScriptsStructure() {
  return {
    "db": {
      "migrate.ts": templates.scripts.db.migrate,
      "seed.ts": templates.scripts.db.seed,
      "reset.ts": templates.scripts.db.reset,
      "backup.ts": templates.scripts.db.backup
    },
    "deploy": {
      "build.ts": templates.scripts.deploy.build,
      "deploy.ts": templates.scripts.deploy.deploy
    },
    "backup": {
      "database-backup.ts": templates.scripts.backup.database,
      "file-backup.ts": templates.scripts.backup.file,
      "restore.ts": templates.scripts.backup.restore
    },
    "utils": {
      "generate-keys.ts": templates.scripts.utils.generateKeys,
      "setup-env.ts": templates.scripts.utils.setupEnv,
      "check-env.js": templates.scripts.utils.checkEnv
    },
    "clean.js": templates.scripts.clean
  };
}

function getDocsStructure() {
  return {
    "api": {
      "openapi.yaml": templates.docs.api.openapi,
      "swagger.ts": templates.docs.api.swagger,
      "postman.json": templates.docs.api.postman,
      "api-reference.md": templates.docs.api.reference
    },
    "architecture": {
      "diagrams.md": templates.docs.architecture.diagrams,
      "decisions.md": templates.docs.architecture.decisions
    },
    "deployment": {
      "guide.md": templates.docs.deployment.guide
    },
    "setup.md": templates.docs.setup
  };
}

function getAuthRoutesStructure() {
  return {
    "login": { "route.ts": templates.api.auth.login },
    "register": { "route.ts": templates.api.auth.register },
    "logout": { "route.ts": templates.api.auth.logout },
    "refresh": { "route.ts": templates.api.auth.refresh },
    "verify-email": { "route.ts": templates.api.auth.verifyEmail },
    "forgot-password": { "route.ts": templates.api.auth.forgotPassword },
    "reset-password": { "route.ts": templates.api.auth.resetPassword },
    "change-password": { "route.ts": templates.api.auth.changePassword },
    "session": { "route.ts": templates.api.auth.session }
  };
}

function getUsersRoutesStructure() {
  return {
    "route.ts": templates.api.users.list,
    "[id]": {
      "route.ts": templates.api.users.single,
      "profile": { "route.ts": templates.api.users.profile },
      "avatar": { "route.ts": templates.api.users.avatar }
    },
    "me": { "route.ts": templates.api.users.me },
    "search": { "route.ts": templates.api.users.search }
  };
}

function getAdminRoutesStructure() {
  return {
    "users": { "route.ts": templates.api.admin.users },
    "analytics": { "route.ts": templates.api.admin.analytics },
    "settings": { "route.ts": templates.api.admin.settings }
  };
}

function getUploadRoutesStructure() {
  return {
    "route.ts": templates.api.upload.main,
    "[id]": { "route.ts": templates.api.upload.single }
  };
}

function getWebhooksStructure() {
  return {
    "stripe": { "route.ts": templates.api.webhooks.stripe },
    "github": { "route.ts": templates.api.webhooks.github }
  };
}

function getNotificationsRoutesStructure() {
  return {
    "route.ts": templates.api.notifications.list,
    "[id]": { "route.ts": templates.api.notifications.single }
  };
}