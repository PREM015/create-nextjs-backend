// waf - Web Application Firewall configurations
// Auto-generated template file

export * from './cloudflare-waf.ts';
export * from './aws-waf.ts';
export * from './modsecurity.ts';
export * from './imperva.ts';

export default {
    name: 'waf',
    description: 'Web Application Firewall configurations',
    files: [
  "index.js",
  "cloudflare-waf.ts",
  "aws-waf.ts",
  "modsecurity.ts",
  "imperva.ts"
]
};
