
# Getting Started

Get your Next.js backend up and running in under 5 minutes.

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **npm, yarn, or pnpm** package manager
- **Basic TypeScript knowledge** (recommended)
- **Next.js familiarity** (helpful but not required)

::: tip Check Your Node Version
```bash
node --version
# Should be 18.0.0 or higher
```
:::

## ⚡ Quick Installation

The fastest way to get started is using NPX:

::: code-group

```bash [NPX (Recommended)]
npx create-nextjs-backend
```

```bash [npm]
npm create nextjs-backend
```

```bash [yarn]
yarn create nextjs-backend
```

```bash [pnpm]
pnpm create nextjs-backend
```

```bash [bun]
bunx create-nextjs-backend
```

:::

::: warning First Time?
The first run will download the package. Subsequent runs will be instant.
:::

## 🎬 Interactive Setup Walkthrough

### Step 1: Router Type Selection

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   Next.js 16.1.1 Backend Generator             │
│                                                 │
│   Create production-ready backend structure    │
│   365 templates across 4 skill levels          │
│                                                 │
└─────────────────────────────────────────────────┘

? Select App Router Type:
  ❯ App Router (Next.js 13+) - Recommended
    Pages Router - Classic Next.js
```

**What to choose:**
- **App Router** ✅ - Modern, recommended for new projects
- **Pages Router** - Legacy, for existing projects only

::: tip Why App Router?
- React Server Components
- Streaming & Suspense
- Built-in layouts
- Better performance
- Future of Next.js
:::

---

### Step 2: Skill Level Selection

```
? Choose Your Backend Complexity Level:
  ❯ 🟢 Beginner - Essential features (50 templates)
    🟡 Intermediate - Common features (150 templates)
    🟠 Advanced - Complex features (100 templates)
    🔴 Expert - Cutting-edge features (65 templates)
```

**Skill Level Guide:**

| Level | Best For | Time to Production | Complexity |
|-------|----------|-------------------|------------|
| 🟢 **Beginner** | MVPs, Learning, Side Projects | 1-2 weeks | Low |
| 🟡 **Intermediate** | SaaS, Startups, Production Apps | 3-4 weeks | Medium |
| 🟠 **Advanced** | Enterprise, Microservices | 2-3 months | High |
| 🔴 **Expert** | R&D, Blockchain, AI Platforms | 6+ months | Very High |

::: details 🟢 Choose Beginner If...
- Building your first backend
- Creating an MVP or prototype
- Learning Next.js backend development
- Need basic CRUD operations
- Simple authentication required
:::

::: details 🟡 Choose Intermediate If...
- Building a production SaaS product
- Need OAuth, analytics, real-time features
- Want background job processing
- Require payment integration
- Planning to scale to thousands of users
:::

::: details 🟠 Choose Advanced If...
- Building enterprise applications
- Need microservices architecture
- Require AI/ML integration
- Need data pipelines and warehouses
- Planning to scale to millions of users
:::

::: details 🔴 Choose Expert If...
- Working with blockchain/Web3
- Building AI platforms
- Quantum computing projects
- Research & development
- Cutting-edge technology exploration
:::

---

### Step 3: Structure Type Selection

```
? Choose structure type:
  ❯ ⚡ Basic Structure - Essential files only
    🚀 Full Auto - All templates automatically
    🎛️  Modular (Pick & Choose) - Select specific templates
```

**Structure Type Comparison:**

| Type | Files Created | Setup Time | Best For |
|------|--------------|------------|----------|
| ⚡ **Basic** | ~20 files | 30 seconds | Quick start, minimal setup |
| 🚀 **Full Auto** | All templates for level | 2 minutes | Complete feature set |
| 🎛️ **Modular** | Your selection | 3-5 minutes | Custom needs, specific features |

#### ⚡ Basic Structure

Generates only essential files:
- API routes setup
- Database connection
- TypeScript configuration
- Environment variables
- Basic middleware

**Example:**
```
my-backend/
├── src/
│   ├── app/
│   ├── lib/
│   ├── types/
│   ├── database/
│   └── middleware/
├── .env.example
├── next.config.ts
├── tsconfig.json
└── package.json
```

#### 🚀 Full Auto

Generates ALL templates for your chosen skill level:
- Beginner: 50 templates
- Intermediate: 150 templates
- Advanced: 100 templates
- Expert: 65 templates

**Use when:**
- Want complete feature set
- Building comprehensive application
- Don't want to pick templates manually
- Need everything your level offers

#### 🎛️ Modular (Pick & Choose)

Select only templates you need:

```
? Select templates to include:
  ❯ ◯ database
    ◯ auth-strategies
    ◯ payments
    ◯ notifications
    ◯ media
    ◯ analytics
    ◯ realtime
    ◯ background-jobs
    (Move up and down to reveal more choices)
```

**Use when:**
- Know exactly what you need
- Want minimal dependencies
- Building specific features
- Starting small, expanding later

---

### Step 4: Installation Path

```
? Enter the installation path:
  D:\projects\my-backend
```

**Options:**
- **Absolute path**: `D:\projects\my-backend`
- **Relative path**: `./my-backend`
- **Current directory**: `.` (leave project name empty)

::: warning Directory Check
If the directory exists and is not empty, you'll be asked to confirm overwrite.
:::

---

### Step 5: Project Name (Optional)

```
? Enter project folder name (leave empty to use current directory):
  my-nextjs-backend
```

**Naming conventions:**
- Use lowercase
- Separate words with hyphens
- No spaces or special characters
- Examples: `my-backend`, `saas-api`, `ecommerce-server`

---

### Step 6: Modular Template Selection

*Only appears if you chose Modular structure*

```
? Select templates to include: (Press <space> to select, <a> to toggle all)
  ❯ ◉ database
    ◉ auth-strategies
    ◉ payments
    ◉ notifications
    ◯ media
    ◯ analytics
    ◯ realtime
    ◯ background-jobs
    ◯ graphql
    ◯ docker
```

**Navigation:**
- `↑/↓` - Move selection
- `Space` - Toggle selection
- `a` - Select/deselect all
- `Enter` - Confirm selection

::: tip Template Dependencies
Some templates work better together. The CLI will suggest related templates.
:::

---

### Step 7: Configuration Summary

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   📋 Configuration Summary                      │
│                                                 │
│   Router Type: App Router                      │
│   Backend Level: 🟡 Intermediate               │
│   Structure Type: MODULAR                      │
│   Installation Path: D:\projects\my-backend    │
│   Selected Templates: 8                        │
│                                                 │
└─────────────────────────────────────────────────┘

? Create project structure with above configuration? (Y/n)
```

**Review carefully before confirming!**

---

### Step 8: Project Generation

```
⠹ Creating project structure...
  ✔ Created: .env.example
  ✔ Created: .gitignore
  ✔ Created: middleware.ts
  ✔ Created: next.config.ts
  ✔ Created: tsconfig.json
  ✔ Created: package.json
  ✔ Created: README.md
  ✔ Created: src/app/layout.tsx
  ✔ Created: src/app/page.tsx
  ✔ Created: src/database/mongodb.ts
  ✔ Created: src/auth-strategies/jwt.ts
  ...

✅ Successfully created 47 files!
```

::: tip Generation Speed
- Basic: ~10 files in 5 seconds
- Full Auto: ~100-200 files in 30 seconds
- Modular: Depends on selection
:::

---

### Step 9: Post-Generation

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   📂 Created Structure Preview                  │
│                                                 │
│   Location: D:\projects\my-backend             │
│   Total Files: 47                              │
│                                                 │
│   Run "tree /f" to see full structure          │
│                                                 │
└─────────────────────────────────────────────────┘

? Are you satisfied with the created project structure? (Y/n)
```

**If YES:**
- ✅ Project ready to use
- ✅ CLI exits successfully

**If NO:**
```
? What would you like to do?
  ❯ 🔄 Modify - Add or remove templates
    🔁 Restart - Delete and start over
    🗑️  Delete - Remove created files and exit
    ✅ Keep - Keep as is and exit
```

## 📁 Generated Project Structure

After generation, you'll have:

```
my-nextjs-backend/
├── 📄 .env.example          # Environment variables template
├── 📄 .gitignore           # Git ignore rules
├── 📄 middleware.ts        # Next.js middleware
├── 📄 next.config.ts       # Next.js configuration
├── 📄 tsconfig.json        # TypeScript configuration
├── 📄 package.json         # Dependencies & scripts
├── 📄 README.md           # Project documentation
│
└── 📂 src/
    ├── 📂 app/
    │   ├── 📂 api/         # API routes
    │   ├── layout.tsx      # Root layout
    │   └── page.tsx        # Home page
    │
    ├── 📂 lib/             # Utilities
    ├── 📂 types/           # TypeScript types
    ├── 📂 utils/           # Helper functions
    │
    └── 📂 [your-selected-templates]/
        ├── 📂 database/
        ├── 📂 auth-strategies/
        ├── 📂 payments/
        └── ...
```

## 🔧 Post-Installation Setup

### 1. Install Dependencies

```bash
cd my-nextjs-backend
npm install
```

::: code-group

```bash [npm]
npm install
```

```bash [yarn]
yarn install
```

```bash [pnpm]
pnpm install
```

```bash [bun]
bun install
```

:::

**Installation time:** 1-3 minutes depending on selected templates

---

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Authentication (if selected)
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Payment Gateway (if selected)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# AI/ML (if selected)
OPENAI_API_KEY="sk-..."
PINECONE_API_KEY="..."

# Email (if selected)
SENDGRID_API_KEY="SG...."

# Storage (if selected)
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
CLOUDINARY_URL="cloudinary://..."
```

::: danger Security Warning
**Never commit `.env` to Git!**  
It's already in `.gitignore`, but always double-check.
:::

---

### 3. Set Up Database

If you selected database templates:

#### PostgreSQL
```bash
# Install PostgreSQL locally or use cloud service
# Create database
createdb mydb

# Run migrations (if using Prisma)
npx prisma migrate dev
```

#### MongoDB
```bash
# Start MongoDB locally or use MongoDB Atlas
# No migration needed - Mongoose handles schemas
```

#### MySQL
```bash
# Install MySQL
# Create database
mysql -u root -p -e "CREATE DATABASE mydb;"
```

---

### 4. Start Development Server

```bash
npm run dev
```

**Your backend is now running at:**
- 🌐 **Local**: http://localhost:3000
- 📡 **API**: http://localhost:3000/api

::: tip First API Request
```bash
curl http://localhost:3000/api/hello
# Response: {"message":"Hello from Next.js Backend!"}
```
:::

---

### 5. Test Your First API Route

The CLI generates a test route at `src/app/api/hello/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Hello from Next.js Backend!',
    timestamp: new Date().toISOString()
  });
}
```

**Test it:**

::: code-group

```bash [cURL]
curl http://localhost:3000/api/hello
```

```bash [HTTPie]
http GET http://localhost:3000/api/hello
```

```javascript [Fetch]
fetch('http://localhost:3000/api/hello')
  .then(res => res.json())
  .then(data => console.log(data));
```

```bash [Postman]
GET http://localhost:3000/api/hello
```

:::

**Expected Response:**
```json
{
  "message": "Hello from Next.js Backend!",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🎯 Next Steps

### 1. Explore Generated Files

```bash
# View project structure
tree /f                    # Windows
tree -L 3                  # macOS/Linux

# Or use VS Code
code .
```

### 2. Read Template Documentation

Each template includes:
- 📝 Inline JSDoc comments
- 📚 Usage examples
- ⚙️ Configuration options
- 🔒 Security notes

**Example:**
```typescript
/**
 * JWT Authentication Strategy
 * 
 * @description Stateless token-based authentication
 * @security Uses HS256 algorithm with secret rotation
 * @example
 * ```typescript
 * import { signToken, verifyToken } from '@/auth-strategies/jwt';
 * 
 * const token = await signToken({ userId: '123' });
 * const payload = await verifyToken(token);
 * ```
 */
```

### 3. Configure Your Templates

Update template configurations to match your needs:

```typescript
// src/database/config.ts
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'mydb',
  // ... more options
};
```

### 4. Build Your First Feature

Follow our guides:
- [Building REST APIs](/guides/rest-apis)
- [Setting Up Authentication](/guides/authentication)
- [Adding Payment Processing](/guides/payments)
- [Real-time Features](/guides/realtime)

### 5. Deploy to Production

See our deployment guides:
- [Vercel Deployment](/guides/deployment#vercel)
- [AWS Deployment](/guides/deployment#aws)
- [Docker Deployment](/guides/deployment#docker)

## 🔄 Modifying Your Backend

### Adding More Templates

Run the CLI again in your project directory:

```bash
cd my-nextjs-backend
npx create-nextjs-backend
```

Then select:
```
? What would you like to do?
  ❯ 🔄 Modify - Add or remove templates
```

Choose templates to add:
```
? Select additional templates:
  ❯ ◯ analytics
    ◯ realtime
    ◯ background-jobs
    ◯ graphql
```

### Removing Templates

```bash
npx create-nextjs-backend

# Select: Modify → Remove
# Choose templates to remove
```

::: warning Data Loss
Removing templates will delete those files permanently!
:::

### Upgrading Skill Level

You can upgrade from Beginner → Intermediate → Advanced → Expert:

```bash
npx create-nextjs-backend

# Select: Modify → Add
# Choose templates from higher levels
```

## 🆘 Troubleshooting

### Common Issues

#### ❌ "Module not found" Error

**Problem:** Dependencies not installed

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

#### ❌ Database Connection Failed

**Problem:** Database not running or wrong credentials

**Solution:**
```bash
# Check if database is running
# PostgreSQL
pg_isready

# MongoDB
mongosh --eval "db.adminCommand('ping')"

# Update .env with correct credentials
```

---

#### ❌ Port 3000 Already in Use

**Problem:** Another process using port 3000

**Solution:**
```bash
# Use different port
PORT=3001 npm run dev

# Or kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

---

#### ❌ TypeScript Errors

**Problem:** Type definitions missing

**Solution:**
```bash
npm install --save-dev @types/node @types/react @types/react-dom
```

---

#### ❌ Environment Variables Not Loading

**Problem:** `.env` file not in root directory

**Solution:**
```bash
# Ensure .env is in project root
ls -la | grep .env

# If missing, create from example
cp .env.example .env
```

### Getting Help

If you're still stuck:

1. **Check Documentation** - [Full Docs](/guides/installation)
2. **Search Issues** - [GitHub Issues](https://github.com/prem015/create-nextjs-backend/issues)
3. **Ask on Discord** - [Join Discord](https://discord.gg/nextjs-backend)
4. **Open New Issue** - [Create Issue](https://github.com/prem015/create-nextjs-backend/issues/new)

## 📚 Additional Resources

### Official Guides
- [Configuration Guide](/guides/configuration)
- [Deployment Guide](/guides/deployment)
- [Best Practices](/guides/best-practices)
- [Security Guide](/guides/security)

### Template References
- [🟢 Beginner Templates](/templates/beginner)
- [🟡 Intermediate Templates](/templates/intermediate)
- [🟠 Advanced Templates](/templates/advanced)
- [🔴 Expert Templates](/templates/expert)

### Video Tutorials
- [Getting Started (10 min)](https://youtube.com/@nextjs-backend)
- [Building a SaaS Backend (45 min)](https://youtube.com/@nextjs-backend)
- [AI Platform Setup (30 min)](https://youtube.com/@nextjs-backend)

### Example Projects
- [SaaS Boilerplate](https://github.com/prem015/create-nextjs-backend-examples/tree/main/saas)
- [E-Commerce API](https://github.com/prem015/create-nextjs-backend-examples/tree/main/ecommerce)
- [AI Platform](https://github.com/prem015/create-nextjs-backend-examples/tree/main/ai-platform)

## 🎉 You're All Set!

Your Next.js backend is ready. Start building amazing features!

```bash
npm run dev
```

**Happy coding! 🚀**

---

**Next Steps:**
- [Build Your First API →](/guides/first-api)
- [Add Authentication →](/guides/authentication)
- [Deploy to Production →](/guides/deployment)
