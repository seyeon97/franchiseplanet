/**
 * Custom ESLint rules for the project
 */

const stateStructure = require('./state-structure.cjs');
const apiStructure = require('./api-structure.cjs');
const appStructure = require('./app-structure.cjs');
const serverActions = require('./server-actions.cjs');
const pageUseClient = require('./page-use-client.cjs');
const noUseClientInApp = require('./no-use-client-in-app.cjs');
const noDirectZustandImport = require('./no-direct-zustand-import.cjs');
const clientComponentNoApiImport = require('./client-component-no-api-import.cjs');
const noNextImage = require('./no-next-image.cjs');
const kebabCaseFilename = require('./kebab-case-filename.cjs');
const noMultipleStateHookCalls = require('./no-multiple-state-hook-calls.cjs');
const indexOnlyImport = require('./index-only-import.cjs');
const apiOnlyServerAction = require('./api-only-server-action.cjs');
const noPageMockImport = require('./no-page-mock-import.cjs');
const noRootAppFolder = require('./no-root-app-folder.cjs');

module.exports = {
  rules: {
    'state-structure': stateStructure,
    'api-structure': apiStructure,
    'app-structure': appStructure,
    'server-actions': serverActions,
    'page-use-client': pageUseClient,
    'no-use-client-in-app': noUseClientInApp,
    'no-direct-zustand-import': noDirectZustandImport,
    'client-component-no-api-import': clientComponentNoApiImport,
    'no-next-image': noNextImage,
    'kebab-case-filename': kebabCaseFilename,
    'no-multiple-state-hook-calls': noMultipleStateHookCalls,
    'index-only-import': indexOnlyImport,
    'api-only-server-action': apiOnlyServerAction,
    'no-page-mock-import': noPageMockImport,
    'no-root-app-folder': noRootAppFolder,
  },
};
