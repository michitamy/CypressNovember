const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    //baseUrl: 'http://localhost:1234',
    //this is for allow to display js,jsx,ts,tsx files, without cy.*
    specPattern: 'cypress/e2e/**.{js,jsx,ts,tsx}'
    
  },
  component: {
  },
})
