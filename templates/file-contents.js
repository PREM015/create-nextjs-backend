export const fileContents = {
  // Environment
  env: `# App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
PORT=3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# Auth
JWT_SECRET="your-super-secret-jwt-key-min-32-chars-change-this"
JWT_EXPIRES_IN="7d"
NEXTAUTH_SECRET="your-nextauth-secret-change-this"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Redis/Cache (Optional)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=""
SMTP_PASSWORD=""
RESEND_API_KEY=""

# Storage (Optional)
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="us-east-1"
AWS_BUCKET_NAME=""

# Payment (Optional)
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

# Monitoring (Optional)
SENTRY_DSN=""

# Rate Limiting
RATE_LIMIT_WINDOW="10s"
RATE_LIMIT_MAX_REQUESTS=10
`,

  // Middleware
  middleware: `import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // API Rate Limiting
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
    // Implement rate limiting logic here
  }

  // Auth Protection
  if (pathname.startsWith('/api/protected')) {
    const token = request.headers.get('authorization')?.split(' ')[1]
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
  ],
}
`,

  // Instrumentation
  instrumentation: `export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Initialize monitoring
    if (process.env.SENTRY_DSN) {
      await import('./lib/monitoring/sentry')
    }
    
    // Initialize database
    await import('./lib/db')
    
    // Initialize cache (if configured)
    if (process.env.UPSTASH_REDIS_REST_URL) {
      await import('./lib/cache/redis')
    }
  }
}
`,

  // Next Config
  nextConfig: `import type { NextConfig } from 'next'

const config: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },
}

export default config
`,

  // Database Index
  dbIndex: `import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

export default db
`,

  // JWT
  jwt: `import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-min-32-chars'
)

export async function signToken(payload: any, expiresIn = '7d') {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret)
}

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, secret)
    return verified.payload
  } catch (error) {
    throw new Error('Invalid token')
  }
}
`,

  // Bcrypt
  bcrypt: `import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}
`,

  // Response Util
  responseUtil: `import { NextResponse } from 'next/server'

export function successResponse<T>(
  data: T,
  message = 'Success',
  status = 200
) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  )
}

export function errorResponse(
  message: string,
  status = 500,
  errors?: any
) {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    },
    { status }
  )
}

export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
) {
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    timestamp: new Date().toISOString(),
  })
}
`,

  // Error Util
  errorUtil: `export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403)
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404)
  }
}
`,

  // User Service
  userService: `import { db } from '@/lib/db'
import { hashPassword } from '@/lib/auth/bcrypt'
import { NotFoundError, ValidationError } from '@/lib/utils/error'

export class UserService {
  async createUser(data: {
    email: string
    password: string
    name?: string
  }) {
    const existingUser = await db.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new ValidationError('Email already exists')
    }

    const hashedPassword = await hashPassword(data.password)

    return await db.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })
  }

  async findById(id: string) {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return user
  }

  async findByEmail(email: string) {
    return await db.user.findUnique({
      where: { email },
    })
  }

  async updateUser(
    id: string,
    data: Partial<{ name: string; email: string }>
  ) {
    const user = await this.findById(id)

    return await db.user.update({
      where: { id: user.id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        updatedAt: true,
      },
    })
  }

  async deleteUser(id: string) {
    const user = await this.findById(id)

    await db.user.delete({
      where: { id: user.id },
    })

    return { message: 'User deleted successfully' }
  }

  async listUsers(page = 1, limit = 10) {
    const skip = (page - 1) * limit

    const [users, total] = await Promise.all([
      db.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      db.user.count(),
    ])

    return { users, total, page, limit }
  }
}

export const userService = new UserService()
`,

  // Auth Service
  authService: `import { signToken } from '@/lib/auth/jwt'
import { comparePassword } from '@/lib/auth/bcrypt'
import { userService } from './user.service'
import { UnauthorizedError, ValidationError } from '@/lib/utils/error'

export class AuthService {
  async login(email: string, password: string) {
    const user = await userService.findByEmail(email)

    if (!user) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    }
  }

  async register(data: {
    email: string
    password: string
    name?: string
  }) {
    if (!data.email || !data.password) {
      throw new ValidationError('Email and password are required')
    }

    if (data.password.length < 8) {
      throw new ValidationError('Password must be at least 8 characters')
    }

    const user = await userService.createUser(data)

    const token = await signToken({
      userId: user.id,
      email: user.email,
    })

    return { token, user }
  }

  async verifyToken(token: string) {
    try {
      const payload = await verifyToken(token)
      return payload
    } catch {
      throw new UnauthorizedError('Invalid or expired token')
    }
  }
}

export const authService = new AuthService()
`,

  // Continue with more files...
};