module.exports = {
  sonar: {
    projectKey: 'TFG',
    projectName: 'TFG Backend',
    sources: 'src',
    tests: 'tests',
    language: 'js',
    testInclusions: '**/*.test.js',
    javascript: {
      lcov: {
        reportPaths: 'coverage/lcov.info'
      }
    }
  }
};