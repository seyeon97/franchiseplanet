/**
 * ESLint rule to enforce API domain folder structure
 *
 * Required structure for src/api/{domain}/:
 *   ├── index.ts         # Must import from actions/ and re-export types
 *   ├── types.ts         # API method signatures
 *   └── actions/         # Server actions directory
 *       └── *.ts         # Action files
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = ['types.ts'];
const REQUIRED_DIRS = ['actions'];

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce API domain folder structure',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      missingFile: 'API domain "{{domain}}" is missing required file: {{file}}',
      missingDir: 'API domain "{{domain}}" is missing required directory: {{dir}}',
      emptyActionsDir: 'API domain "{{domain}}" has empty actions directory - add at least one action file',
      missingTypesExport: 'API domain "{{domain}}" index.ts must re-export from ./types (add: export type { ... } from \'./types\')',
      missingActionsImport: 'API domain "{{domain}}" index.ts must import from ./actions/ and export as object',
    },
    schema: [],
  },

  create(context) {
    const filename = context.filename || context.getFilename();

    // Normalize path separators
    const normalizedPath = filename.replace(/\\/g, '/');

    // Only check index.ts files in src/api/{domain}/
    const apiMatch = normalizedPath.match(/src\/api\/([^/]+)\/index\.ts$/);
    if (!apiMatch) return {};

    const domain = apiMatch[1];

    // Skip dotfiles and internal folders (starting with _)
    if (domain.startsWith('.') || domain.startsWith('_')) return {};

    const domainPath = path.dirname(filename);
    let hasTypesExport = false;
    let hasActionsImport = false;

    return {
      // Check for export from './types'
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

      // Check for import from './actions/*'
      ImportDeclaration(node) {
        if (node.source && node.source.value.startsWith('./actions')) {
          hasActionsImport = true;
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

        // Check actions import
        if (!hasActionsImport) {
          context.report({
            node,
            messageId: 'missingActionsImport',
            data: { domain },
          });
        }
      },
    };
  },
};
