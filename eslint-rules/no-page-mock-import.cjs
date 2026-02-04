/**
 * ESLint rule to forbid direct mock API imports in page components
 *
 * Dependency Flow: page -> state -> api
 * Page components should never import from @/api/_mock directly
 * Mock data should be accessed through state layer
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid direct mock API imports in page components',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      noMockImportInPage:
        'Page components should not import from "@/api/_mock" directly. Use state layer from "@/state" instead. (Dependency Flow: page -> state -> api)',
    },
    schema: [],
  },

  create(context) {
    const filename = context.filename || context.getFilename();
    const normalizedPath = filename.replace(/\\/g, '/');

    // Only check files in src/page/
    const isPageComponent = /src\/page\/.*\.(tsx|ts)$/.test(normalizedPath);
    if (!isPageComponent) return {};

    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        // Check for @/api/_mock imports
        if (source.startsWith('@/api/_mock')) {
          context.report({
            node,
            messageId: 'noMockImportInPage',
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
          if (source.startsWith('@/api/_mock')) {
            context.report({
              node,
              messageId: 'noMockImportInPage',
            });
          }
        }
      },
    };
  },
};
