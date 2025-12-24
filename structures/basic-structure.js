import { fileContents } from '../templates/file-contents.js';

export const basicStructure = {
  "src": {
    "app": {
      "api": {
        "users": {
          "route.ts": fileContents.apiUserRoute
        },
        "auth": {
          "login": {
            "route.ts": fileContents.authLoginRoute
          },
          "register": {
            "route.ts": fileContents.authRegisterRoute
          }
        },
        "health": {
          "route.ts": fileContents.healthRoute
        }
      },
      "layout.tsx": fileContents.layout,
      "page.tsx": fileContents.page,
      "globals.css": fileContents.globalCss
    },
    "lib": {
      "db": {
        "index.ts": fileContents.dbIndex
      },
      "auth": {
        "jwt.ts": fileContents.jwt,
        "bcrypt.ts": fileContents.bcrypt
      },
      "utils": {
        "response.ts": fileContents.responseUtil,
        "error.ts": fileContents.errorUtil
      }
    },
    "services": {
      "user.service.ts": fileContents.userService,
      "auth.service.ts": fileContents.authService
    },
    "types": {
      "index.ts": fileContents.types,
      "api.types.ts": fileContents.apiTypes
    },
    "middleware": {
      "auth.middleware.ts": fileContents.authMiddleware
    }
  },
  "prisma": {
    "schema.prisma": fileContents.prismaSchema,
    "seed.ts": fileContents.prismaSeed
  },
  "public": {
    "images": {
      ".gitkeep": ""
    }
  },
  ".env.example": fileContents.env,
  ".gitignore": fileContents.gitignore,
  "middleware.ts": fileContents.middleware,
  "instrumentation.ts": fileContents.instrumentation,
  "next.config.ts": fileContents.nextConfig,
  "tsconfig.json": fileContents.tsconfig,
  "package.json": fileContents.packageJson,
  "README.md": fileContents.readme
};

import { templates } from '../templates/index.js';

export function getBasicStructure() {
  return {
    "src": {
      "app": {
        "api": {
          "auth": {
            "login": {
              "route.ts": templates.api.auth.login
            },
            "register": {
              "route.ts": templates.api.auth.register
            },
            "logout": {
              "route.ts": templates.api.auth.logout
            }
          },
          "users": {
            "route.ts": templates.api.users.list,
            "[id]": {
              "route.ts": templates.api.users.single
            },
            "me": {
              "route.ts": templates.api.users.me
            }
          },
          "health": {
            "route.ts": templates.api.health
          }
        },
        "layout.tsx": templates.app.layout,
        "page.tsx": templates.app.page,
        "globals.css": templates.app.globalsCss,
        "error.tsx": templates.app.error,
        "loading.tsx": templates.app.loading,
        "not-found.tsx": templates.app.notFound
      },
      "lib": {
        "db": {
          "index.ts": templates.lib.db.index,
          "prisma.ts": templates.lib.db.prisma
        },
        "auth": {
          "jwt.ts": templates.lib.auth.jwt,
          "bcrypt.ts": templates.lib.auth.bcrypt,
          "session.ts": templates.lib.auth.session
        },
        "utils": {
          "response.ts": templates.lib.utils.response,
          "error.ts": templates.lib.utils.error,
          "validation.ts": templates.lib.utils.validation,
          "env.ts": templates.lib.utils.env
        }
      },
      "services": {
        "user.service.ts": templates.services.user,
        "auth.service.ts": templates.services.auth
      },
      "middleware": {
        "auth.middleware.ts": templates.middleware.auth
      },
      "types": {
        "index.ts": templates.types.index,
        "api.types.ts": templates.types.api,
        "user.types.ts": templates.types.user
      },
      "constants": {
        "index.ts": templates.constants.index,
        "errors.constants.ts": templates.constants.errors
      },
      "exceptions": {
        "base.exception.ts": templates.exceptions.base,
        "http.exception.ts": templates.exceptions.http
      }
    },
    "prisma": {
      "schema.prisma": templates.prisma.schema,
      "seed.ts": templates.prisma.seed
    },
    "public": {
      "images": {
        ".gitkeep": ""
      }
    },
    ".env.example": templates.root.envExample,
    ".gitignore": templates.root.gitignore,
    "middleware.ts": templates.root.middleware,
    "instrumentation.ts": templates.root.instrumentation,
    "next.config.ts": templates.root.nextConfig,
    "tsconfig.json": templates.root.tsconfig,
    "package.json": templates.root.packageJson,
    "README.md": templates.root.readme
  };
}