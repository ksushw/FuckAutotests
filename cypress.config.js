const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 5000,
  viewportWidth: 1400,
  viewportHeight: 600,
  component: {
    viewportWidth: 500,
    viewportHeight: 500,
  },
  e2e: {
    defaultCommandTimeout: 10000,
  },
})