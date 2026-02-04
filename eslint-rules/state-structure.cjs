/**
 * ESLint rule to enforce state domain folder structure
 *
 * Required structure for src/state/{domain}/:
 *   ├── types.ts         # State, Actions, API types
 *   ├── store.ts         # createStateFactory + compose actions
 *   ├── index.ts         # Must re-export from types.ts
 *   └── actions/         # Action creators directory
 *       └── *.ts         # Action files (e.g., init.ts, comment.ts)
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = ['types.ts', 'store.ts'];
const REQUIRED_DIRS = ['actions'];

// Forbidden domains - these should be handled by other domains
const FORBIDDEN_DOMAINS = {
  auth: 'Use state/user instead. Auth actions belong in state/user/actions/auth.ts',
};

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce state domain folder structure',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      forbiddenDomain: 'State domain "{{domain}}" is forbidden. {{reason}}',
      missingFile: 'State domain "{{domain}}" is missing required file: {{file}}',
      missingDir: 'State domain "{{domain}}" is missing required directory: {{dir}}',
      emptyActionsDir: 'State domain "{{domain}}" has empty actions directory - add at least one action file',
      missingTypesExport: 'State domain "{{domain}}" index.ts must re-export from ./types (add: export * from \'./types\')',
    },
    schema: [],
  },

  create(context) {
    const filename = context.filename || context.getFilename();

    // Normalize path separators
    const normalizedPath = filename.replace(/\\/g, '/');

    // Only check index.ts files in src/state/{domain}/
    const stateMatch = normalizedPath.match(/src\/state\/([^/]+)\/index\.ts$/);
    if (!stateMatch) return {};

    const domain = stateMatch[1];

    // Skip dotfiles
    if (domain.startsWith('.')) return {};

    // Check for forbidden domains
    if (FORBIDDEN_DOMAINS[domain]) {
      return {
        Program(node) {
          context.report({
            node,
            messageId: 'forbiddenDomain',
            data: { domain, reason: FORBIDDEN_DOMAINS[domain] },
          });
        },
      };
    }

    const domainPath = path.dirname(filename);
    let hasTypesExport = false;

    return {
      // Check for export * from './types' or export { ... } from './types'
      ExportAllDeclaration(node) {
        if (node.source && node.source.value === './types') {
          hasTypesExport = true;
        }
      },
      ExportNamedDeclaration(node) {
        if (node.source && node.source.value === './types') {
          hasTypesExport = true;
        }
      },

      'Program:exit'(node) {
        // Check required files
        for (const file of REQUIRED_FILES) {
          const filePath = path.join(domainPath, file);
          if (!fs.existsSync(filePath)) {
            context.report({
              node,
              messageId: 'missingFile',
              data: { domain, file },
            });
          }
        }

        // Check required directories
        for (const dir of REQUIRED_DIRS) {
          const dirPath = path.join(domainPath, dir);
          if (!fs.existsSync(dirPath)) {
            context.report({
              node,
              messageId: 'missingDir',
              data: { domain, dir },
            });
          } else {
            // Check if actions directory has at least one .ts file
            try {
              const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.ts'));
              if (files.length === 0) {
                context.report({
                  node,
                  messageId: 'emptyActionsDir',
                  data: { domain },
                });
              }
            } catch (e) {
              // Directory read failed, skip
            }
          }
        }

        // Check types.ts re-export
        if (!hasTypesExport) {
          context.report({
            node,
            messageId: 'missingTypesExport',
            data: { domain },
          });
        }
      },
    };
  },
};
