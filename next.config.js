const withSourceMaps = require("@zeit/next-source-maps")
const withCSS = require("@zeit/next-css")

module.exports = withSourceMaps(
  withCSS({
    webpack(config, options) {
      return config
    },
  })
)
