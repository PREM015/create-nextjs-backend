// structures/levels.js
// Level-based categorization of all 368 templates

export const LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate', 
  ADVANCED: 'advanced',
  EXPERT: 'expert'
};

export const LEVEL_INFO = {
  [LEVELS.BEGINNER]: {
    name: '🟢 Beginner / Basic',
    description: 'Essential templates for getting started',
    fileCount: 50,
    icon: '🟢',
    color: 'green'
  },
  [LEVELS.INTERMEDIATE]: {
    name: '🟡 Intermediate / Medium',
    description: 'Standard production features',
    fileCount: 100,
    icon: '🟡',
    color: 'yellow'
  },
  [LEVELS.ADVANCED]: {
    name: '🟠 Advanced',
    description: 'Complex enterprise features',
    fileCount: 120,
    icon: '🟠',
    color: 'blue'
  },
  [LEVELS.EXPERT]: {
    name: '🔴 Expert / Cutting-Edge',
    description: 'Specialized & emerging technologies',
    fileCount: 98,
    icon: '🔴',
    color: 'magenta'
  }
};

export const LEVEL_FOLDERS = {
  [LEVELS.BEGINNER]: [
    'api', 'app', 'config', 'constants', 'docs', 'exceptions', 'helpers',
    'lib', 'middleware', 'public', 'root', 'types', 'validators', 'api-docs',
    'file-formats', 'compression', 'sanitization', 'custom-middleware',
    'validation', 'currency', 'timezone', 'regional', 'language-detection',
    'smoke-testing', 'health-checks', 'graceful-shutdown', 'api-versioning',
    'email-marketing', 'sms-marketing', 'push-campaigns', 'feedback', 'teams',
    'onboarding', 'referrals', 'invoicing', 'subscriptions', 'licensing',
    'support', 'crm', 'calendar', 'reports', 'data-transfer', 'notifications',
    'media', 'cms', 'payments', 'search', 'caching', 'database'
  ],

  [LEVELS.INTERMEDIATE]: [
    'services', 'repositories', 'providers', 'decorators', 'filters',
    'interceptors', 'hooks', 'events', 'jobs', 'schemas', 'dto', 'policies',
    'scripts', 'tests', 'locales', 'drizzle', 'prisma', 'graphql', 'docker',
    'github', 'husky', 'vscode', 'api-clients', 'auth-providers',
    'auth-strategies', 'analytics', 'realtime', 'background-jobs',
    'geolocation', 'communication', 'social-media', 'rate-limiting',
    'security', 'error-tracking', 'feature-flags', 'ab-testing',
    'load-balancing', 'api-tracking', 'api-keys', 'audit-logging',
    'data-masking', 'ip-control', 'password-policies', 'bot-protection',
    'compliance', 'data-privacy', 'data-retention', 'multi-tenancy',
    'api-mocking', 'load-testing', 'contract-testing', 'video-processing',
    'audio-processing', 'image-recognition', 'ocr', 'content-moderation',
    'translation', 'leaderboards', 'achievements', 'matchmaking',
    'live-streaming', 'iap', 'affiliates', 'loyalty', 'contests',
    'personalization', 'customer-journey', 'retargeting', 'cro',
    'bi-tools', 'data-aggregation', 'timeseries-db', 'cdp', 'etl',
    'chatbots', 'nlp', 'recommendations', 'speech', 'tts',
    'influencer', 'config-management', 'secrets-rotation',
    'deployment-strategies', 'auto-scaling', 'networking',
    'cost-optimization', 'acl', 'compliance-reporting',
    'vulnerability-scanning', 'incident-response', 'drm', 'ediscovery',
    'serverless', 'devops', 'waf', 'web3', 'healthcare', 'fintech', 'elearning'
  ],

  [LEVELS.ADVANCED]: [
    'ai-ml', 'ai-agents', 'vector-db', 'mlops', 'computer-vision',
    'predictive-analytics', 'workflow-automation', 'rpa', 'rules-engine',
    'microservices', 'data-pipeline', 'message-queues', 'circuit-breakers',
    'service-discovery', 'throttling', 'distributed-tracing', 'observability',
    'chaos-testing', 'chaos-engineering', 'iac', 'orchestration',
    'disaster-recovery', 'data-warehouse', 'event-streaming', 'data-lakes',
    'stream-processing', 'cep', 'deduplication', 'data-quality',
    'data-catalog', 'mdm', 'data-virtualization', 'cdc', 'anonymization',
    'synthetic-data', 'oauth-sso', 'security-testing', 'dlp',
    'identity-governance', 'zero-trust', 'behavioral-analytics', 'honeypots',
    'security-automation', 'credential-stuffing', 'secrets-advanced', 'hsm',
    'blockchain-security', 'api-security-testing', 'rasp',
    'graphql-federation', 'grpc', 'websockets-advanced', 'sse',
    'long-polling', 'webhook-management', 'api-gateway', 'bff',
    'api-composition', 'api-transformation', 'real-estate', 'food-delivery',
    'fleet-management', 'iot', 'smart-home', 'agritech', 'supply-chain',
    'edge', 'edge-ai', 'algo-trading', 'robo-advisory', 'credit-scoring',
    'fraud-detection', 'regtech', 'insurtech', 'bnpl', 'crypto-exchange',
    'cross-border-payments', 'micro-lending', 'property-valuation',
    'smart-building', 'tenant-management', 'construction-mgmt',
    'facility-management', 'coworking', 'real-estate-crm',
    'property-inspection', 'rental-marketplace', 'mortgage-processing',
    'precision-agriculture', 'livestock', 'hydroponics', 'carbon-credits',
    'renewable-energy', 'waste-management', 'water-quality',
    'environmental-compliance', 'circular-economy', 'sustainable-supply',
    'telemedicine', 'medical-imaging', 'clinical-decision', 'wearables',
    'pharmacy', 'lis', 'clinical-trials', 'medical-billing',
    'patient-portal', 'population-health', 'mes', 'predictive-maintenance',
    'digital-twin-mfg', 'qms', 'supply-chain-visibility', 'asset-management',
    'energy-management', 'warehouse-automation', 'production-optimization',
    'safety-management'
  ],

  [LEVELS.EXPERT]: [
    'metaverse', 'ar-vr', 'quantum', '5g', 'digital-twins', 'bci',
    'biometrics', 'sustainability', 'did', 'defi', 'nft-marketplace',
    'crypto-wallets', 'blockchain-indexing', 'ipfs', 'oracles', 'bridges',
    'tokenomics', 'contract-auditing', 'decentralized-storage',
    'content-recommendation', 'drm-advanced', 'live-broadcasting',
    'music-streaming', 'vod', 'podcast', 'interactive-video',
    'content-moderation-ai', 'subtitle-generation', 'virtual-events',
    'emergency-dispatch', 'disaster-management', 'crisis-communication',
    'public-safety', 'fire-detection', 'medical-emergency', 'weather-alerts',
    'search-rescue', 'panic-button', 'incident-reporting', 'e-government',
    'voting-systems', 'public-records', 'citizen-engagement', 'procurement',
    'case-management', 'permits-licensing', 'transit-planning',
    'social-services', 'immigration', 'lims', 'research-data',
    'bioinformatics', 'astronomy', 'particle-physics', 'climate-modeling',
    'chemical-inventory', 'peer-review', 'grant-management',
    'scientific-collaboration', 'dam', '3d-models', 'font-management',
    'color-palette', 'design-versioning', 'creative-workflow', 'stock-media',
    'print-on-demand', 'brand-assets', 'creative-briefs', 'workout-planning',
    'nutrition', 'mental-health', 'sleep-tracking', 'wellness-challenges',
    'trainer-matching', 'meditation', 'supplements', 'equipment-rental',
    'corporate-wellness', 'game-state', 'anti-cheat', 'game-analytics',
    'multiplayer-sync', 'virtual-economy', 'tournaments', 'guilds',
    'seasons', 'telemetry', 'esports', 'connected-car', 'ride-sharing',
    'ev-management', 'traffic-management', 'autonomous-vehicle',
    'quantum-crypto', 'dna-storage', 'nuclear-facility', 'space-mission', 'submarine-nav'
  ]
};

export function getLevelFolders(level) {
  return LEVEL_FOLDERS[level] || [];
}

export function getAllLevels() {
  return Object.keys(LEVELS).map(key => ({
    key: LEVELS[key],
    ...LEVEL_INFO[LEVELS[key]]
  }));
}

export function getFolderLevel(folderName) {
  for (const [level, folders] of Object.entries(LEVEL_FOLDERS)) {
    if (folders.includes(folderName)) {
      return level;
    }
  }
  return null;
}