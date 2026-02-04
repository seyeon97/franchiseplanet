/**
 * ESLint rule to forbid direct Zustand imports
 *
 * Always use @/lib/state instead of importing from 'zustand' directly
 * This ensures consistent state management patterns across the codebase
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid direct Zustand imports',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      noDirectZustand:
        'Do not import from "zustand" directly. Use "createStateFactory" from "@/lib/state" instead.',
    },
    schema: [],
  },

  create(context) {
    const filename = context.filename || context.getFilename();

    // Normalize path separators
    const normalizedPath = filename.replace(/\\/g, '/');

    // Skip files in lib/state (they are allowed to use zustand)
    if (normalizedPath.includes('lib/state')) return {};

    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        // Check for zustand imports
        if (source === 'zustand' || source.startsWith('zustand/')) {
          context.report({
            node,
            messageId: 'noDirectZustand',
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
          if (source === 'zustand' || source.startsWith('zustand/')) {
            context.report({
              node,
              messageId: 'noDirectZustand',
            });
          }
        }
      },
    };
  },
};
