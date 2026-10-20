module.exports = {
  default: {
    requireModule: ['tsx/cjs'],
    require: [
      'steps/*.steps.ts',
      'support/**/*.ts'
    ],
    format: [
      'progress-bar',
      'html:test-results/cucumber-report.html'
    ]
  }
};
