// rate-limiting - Rate limiting strategies
// Auto-generated template file

export * from './token-bucket.ts';
export * from './leaky-bucket.ts';
export * from './fixed-window.ts';
export * from './sliding-window.ts';
export * from './redis-rate-limit.ts';
export * from './distributed-limiter.ts';

export default {
    name: 'rate-limiting',
    description: 'Rate limiting strategies',
    files: [
  "index.js",
  "token-bucket.ts",
  "leaky-bucket.ts",
  "fixed-window.ts",
  "sliding-window.ts",
  "redis-rate-limit.ts",
  "distributed-limiter.ts"
]
};
