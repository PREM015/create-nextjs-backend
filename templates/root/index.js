export const envExample = `# App Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
PORT=3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-min-32-chars-change-this-in-production"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="your-refresh-secret-change-this"
JWT_REFRESH_EXPIRES_IN="30d"

# NextAuth (if using NextAuth.js)
NEXTAUTH_SECRET="your-nextauth-secret-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""
TWITTER_CLIENT_ID=""
TWITTER_CLIENT_SECRET=""

# Redis/Cache (Optional)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
REDIS_URL="redis://localhost:6379"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=""
SMTP_PASSWORD=""
SMTP_FROM="noreply@example.com"
RESEND_API_KEY=""
SENDGRID_API_KEY=""

# File Storage
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="us-east-1"
AWS_BUCKET_NAME=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""

# Payment Gateways
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""
PAYPAL_CLIENT_ID=""
PAYPAL_CLIENT_SECRET=""
PAYPAL_MODE="sandbox"
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""

# Monitoring & Analytics
SENTRY_DSN=""
SENTRY_AUTH_TOKEN=""
SENTRY_PROJECT=""
SENTRY_ORG=""
DATADOG_API_KEY=""
NEWRELIC_LICENSE_KEY=""
GOOGLE_ANALYTICS_ID=""

# Rate Limiting
RATE_LIMIT_WINDOW="10s"
RATE_LIMIT_MAX_REQUESTS=10

# Logging
LOG_LEVEL="info"
LOG_FILE_PATH="./logs"

# Queue/Jobs
BULL_REDIS_HOST="localhost"
BULL_REDIS_PORT=6379
BULL_REDIS_PASSWORD=""

# WebSocket
WS_PORT=8080
WS_PATH="/ws"

# CORS
CORS_ORIGIN="http://localhost:3000"
CORS_CREDENTIALS=true

# Security
CSRF_SECRET="your-csrf-secret-change-this"
ENCRYPTION_KEY="your-encryption-key-32-chars-min"

# Feature Flags
ENABLE_REGISTRATION=true
ENABLE_SOCIAL_LOGIN=true
ENABLE_2FA=false
ENABLE_EMAIL_VERIFICATION=true

# API Versioning
DEFAULT_API_VERSION="v1"

# Pagination
DEFAULT_PAGE_SIZE=10
MAX_PAGE_SIZE=100
`;

export const envDevelopment = `NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
LOG_LEVEL=debug
`;

export const envProduction = `NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
LOG_LEVEL=error
`;

export const envTest = `NODE_ENV=test
DATABASE_URL="postgresql://user:password@localhost:5432/mydb_test?schema=public"
JWT_SECRET="test-secret-key-min-32-characters-long"
`;

export const envLocalExample = `# Copy this file to .env.local and fill in your values
# .env.local is gitignored and safe for secrets

DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
JWT_SECRET="generate-a-random-secret-here"
NEXTAUTH_SECRET="generate-another-secret-here"
`;

export const gitignore = `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output/
*.lcov

# Next.js
.next/
out/
build/
dist/

# Production
.vercel
.netlify

# Environment
.env
.env.local
.env*.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# OS
.DS_Store
*.pem
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Misc
*.tsbuildinfo
.cache/

# Uploads
public/uploads/*
!public/uploads/.gitkeep

# Database
*.db
*.sqlite
*.sqlite3
prisma/migrations/

# Debug
.output/
.nuxt/
.cache/
.temp/
`;

export const gitattributes = `* text=auto eol=lf
*.{cmd,[cC][mM][dD]} text eol=crlf
*.{bat,[bB][aA][tT]} text eol=crlf
`;

export const mailmap = `# This file maps different email addresses to canonical names
`;

export const eslintrc = `{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
`;

export const eslintignore = `node_modules/
.next/
out/
build/
dist/
*.config.js
*.config.ts
`;

export const prettierrc = `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
`;

export const prettierignore = `node_modules/
.next/
out/
build/
dist/
coverage/
*.min.js
*.min.css
package-lock.json
yarn.lock
pnpm-lock.yaml
`;

export const editorconfig = `root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
`;

export const nvmrc = `18.17.0
`;

export const middleware = `import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('/api/health')
  ) {
    return NextResponse.next()
  }

  // API Rate Limiting
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
    // Implement your rate limiting logic here
  }

  // Auth Protection for protected routes
  if (pathname.startsWith('/api/protected') || pathname.startsWith('/dashboard')) {
    const token = request.headers.get('authorization')?.split(' ')[1]
    
    if (!token) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Unauthorized - No token provided' },
          { status: 401 }
        )
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      await verifyToken(token)
    } catch (error) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Unauthorized - Invalid token' },
          { status: 401 }
        )
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // CORS Headers for API routes
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
`;

export const instrumentation = `export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('🚀 Initializing server instrumentation...')
    
    // Initialize monitoring (Sentry)
    if (process.env.SENTRY_DSN) {
      console.log('📊 Initializing Sentry...')
      await import('./lib/monitoring/sentry')
    }
    
    // Initialize database connection
    console.log('💾 Initializing database...')
    await import('./lib/db')
    
    // Initialize cache (Redis)
    if (process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL) {
      console.log('⚡ Initializing Redis cache...')
      await import('./lib/cache/redis')
    }
    
    // Initialize logger
    console.log('📝 Initializing logger...')
    await import('./lib/logger/winston')
    
    console.log('✅ Server instrumentation complete')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    console.log('🌐 Edge runtime detected')
  }
}

export async function onRequestError(
  err: Error,
  request: Request,
  context: {
    routerKind: 'Pages Router' | 'App Router'
    routePath: string
    routeType: 'render' | 'route' | 'action' | 'middleware'
  }
) {
  console.error('Request error:', {
    error: err.message,
    stack: err.stack,
    url: request.url,
    method: request.method,
    context,
  })
  
  // Report to monitoring service
  if (process.env.SENTRY_DSN) {
    const Sentry = await import('@sentry/nextjs')
    Sentry.captureException(err, {
      contexts: {
        request: {
          url: request.url,
          method: request.method,
          headers: Object.fromEntries(request.headers),
        },
        next: context,
      },
    })
  }
}
`;

export const nextConfig = `import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000'],
    },
    instrumentationHook: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: process.env.CORS_ORIGIN || '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/api',
        destination: '/api/health',
        permanent: true,
      },
    ]
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })

    return config
  },

  poweredByHeader: false,
}

export default config
`;

export const tsconfig = `{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    },
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "instrumentation.ts"
  ],
  "exclude": ["node_modules"]
}
`;

export const tsconfigBuild = `{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts", "**/*.spec.ts"]
}
`;

export const tsconfigServer = `{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2020",
    "noEmit": true
  },
  "include": ["src/**/*.ts", "instrumentation.ts"],
  "exclude": ["node_modules", "src/app/**/*"]
}
`;

export const jestConfig = `const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
`;

export const vitestConfig = `import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
`;

export const playwrightConfig = `import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
`;

export const commitlintConfig = `module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
  },
}
`;

export const renovateJson = `{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:base"],
  "packageRules": [
    {
      "matchUpdateTypes": ["minor", "patch"],
      "automerge": true
    }
  ]
}
`;

export const sonarProperties = `sonar.projectKey=my-nextjs-backend
sonar.organization=my-org
sonar.sources=src
sonar.tests=tests
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.exclusions=**/*.test.ts,**/*.spec.ts,**/node_modules/**
`;

export const packageJson = `{
  "name": "my-nextjs-backend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \\"**/*.{js,jsx,ts,tsx,json,md}\\"",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "prepare": "husky install"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@prisma/client": "^6.0.0",
    "bcryptjs": "^2.4.3",
    "jose": "^5.2.0",
    "zod": "^3.22.4",
    "winston": "^3.11.0",
    "@upstash/redis": "^1.28.0",
    "@upstash/ratelimit": "^1.0.0",
    "nodemailer": "^6.9.7",
    "resend": "^3.0.0",
    "stripe": "^14.10.0",
    "aws-sdk": "^2.1508.0",
    "cloudinary": "^1.41.0",
    "bull": "^4.12.0",
    "socket.io": "^4.6.0",
    "@sentry/nextjs": "^7.91.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.6",
    "@types/react": "^18.2.46",
    "@types/react-dom": "^18.2.18",
    "@types/bcryptjs": "^2.4.6",
    "@types/nodemailer": "^6.4.14",
    "typescript": "^5.3.3",
    "eslint": "^8.56.0",
    "eslint-config-next": "^15.1.0",
    "prettier": "^3.1.1",
    "prisma": "^6.0.0",
    "jest": "^29.7.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "vitest": "^1.1.0",
    "@playwright/test": "^1.40.1",
    "husky": "^8.0.3",
    "@commitlint/cli": "^18.4.3",
    "@commitlint/config-conventional": "^18.4.3",
    "tsx": "^4.7.0"
  },
  "engines": {
    "node": ">=18.17.0",
    "npm": ">=9.0.0"
  }
}
`;

export const readme = `# Next.js Backend Application

Production-ready Next.js 16.1.1 backend with complete features.

## Features

- ✅ Next.js 16 App Router
- ✅ TypeScript
- ✅ Prisma ORM
- ✅ JWT Authentication
- ✅ Role-based Access Control
- ✅ Email Service (Nodemailer/Resend)
- ✅ File Upload (S3/Cloudinary)
- ✅ Payment Integration (Stripe)
- ✅ Redis Caching
- ✅ Job Queue (Bull)
- ✅ WebSocket Support
- ✅ Rate Limiting
- ✅ Logging (Winston)
- ✅ Monitoring (Sentry)
- ✅ Testing (Jest/Vitest/Playwright)
- ✅ Docker Support

## Getting Started

### Prerequisites

- Node.js 18.17+
- PostgreSQL
- Redis (optional)

### Installation

1. Clone the repository
\`\`\`bash
git clone <your-repo-url>
cd my-nextjs-backend
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Setup environment variables
\`\`\`bash
cp .env.example .env
\`\`\`

4. Generate Prisma client
\`\`\`bash
npm run db:generate
\`\`\`

5. Push database schema
\`\`\`bash
npm run db:push
\`\`\`

6. Start development server
\`\`\`bash
npm run dev
\`\`\`

Visit \`http://localhost:3000\`

## Project Structure

\`\`\`
src/
├── app/              # Next.js app directory
│   ├── api/          # API routes
│   └── (pages)/      # Page routes
├── lib/              # Core libraries
├── services/         # Business logic
├── middleware/       # Custom middleware
├── types/            # TypeScript types
└── utils/            # Utility functions
\`\`\`

## API Documentation

API documentation is available at \`/api/docs\`

## Testing

\`\`\`bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
\`\`\`

## Deployment

### Docker

\`\`\`bash
docker-compose up -d
\`\`\`

### Vercel

\`\`\`bash
vercel deploy
\`\`\`

## License

MIT
`;

export const changelog = `# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-01-15

### Added
- Initial project setup
- Complete backend structure
- Authentication system
- API routes with versioning
- Database integration
- File upload support
- Payment integration
- Testing setup
`;

export const security = `# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

Please report security vulnerabilities to: security@example.com

We will respond within 48 hours.
`;

export const contributing = `# Contributing

Thank you for considering contributing to this project!

## How to Contribute

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## Code Style

- Follow ESLint rules
- Write meaningful commit messages
- Add tests for new features
`;

export const codeOfConduct = `# Code of Conduct

## Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

## Our Standards

- Be respectful
- Be professional
- Be inclusive

## Enforcement

Report violations to: conduct@example.com
`;

export const license = `MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;