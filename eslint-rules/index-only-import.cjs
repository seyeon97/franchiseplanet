/**
 * ESLint rule to enforce importing through index.ts only
 *
 * External modules must import from @/api/{domain} or @/state/{domain}
 * Direct imports like @/api/{domain}/actions/*, @/api/{domain}/types, etc. are forbidden
 *
 * Exceptions:
 * - Within the same domain folder, relative imports are allowed
 * - Same layer imports are allowed (api↔api, state↔state)
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce importing through index.ts for api and state modules',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      noDirectImport:
        'Import from "{{module}}" directly is not allowed. Use "{{suggested}}" instead.',
    },
    schema: [],
  },

  create(context) {
    const filename = context.filename || context.getFilename();
    const normalizedPath = filename.replace(/\\/g, '/');

    // Extract current layer from file path (api, state, or other)
    const getCurrentLayer = (filePath) => {
      if (/src\/api\//.test(filePath)) return 'api';
      if (/src\/state\//.test(filePath)) return 'state';
      return null;
    };

    const currentLayer = getCurrentLayer(normalizedPath);

    // Check if import source is a deep import that should go through index
    const checkDeepImport = (source) => {
      // Patterns to detect deep imports
      // @/api/{domain}/actions/*, @/api/{domain}/types, @/api/{domain}/_mock
      // @/state/{domain}/store, @/state/{domain}/actions/*, @/state/{domain}/types

      const apiDeepPattern = /^@\/api\/([^/]+)\/(actions|types|_mock)/;
      const stateDeepPattern = /^@\/state\/([^/]+)\/(store|actions|types)/;

      let match = source.match(apiDeepPattern);
      if (match) {
        const importDomain = match[1];
        // Allow if same layer (api can import from api deep)
        if (currentLayer === 'api') {
          return null;
        }
        return {
          module: source,
          suggested: `@/api/${importDomain}`,
        };
      }

      match = source.match(stateDeepPattern);
      if (match) {
        const importDomain = match[1];
        // Allow if same layer (state can import from state deep)
        if (currentLayer === 'state') {
          return null;
        }
        return {
          module: source,
          suggested: `@/state/${importDomain}`,
        };
      }

      return null;
    };

    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        // Skip relative imports (allowed within same domain)
        if (source.startsWith('.')) return;

        const violation = checkDeepImport(source);
        if (violation) {
          context.report({
            node,
            messageId: 'noDirectImport',
            data: violation,
          });
        }
      },

      // Also check dynamic imports
      CallExpression(node) {
        if (
          node.callee.type === 'Import' &&
          node.arguments[0]?.type === 'Literal'
        ) {
          const source = node.arguments[0].value;
          if (source.startsWith('.')) return;

          const violation = checkDeepImport(source);
          if (violation) {
            context.report({
              node,
              messageId: 'noDirectImport',
              data: violation,
            });
          }
        }
      },
    };
  },
};
