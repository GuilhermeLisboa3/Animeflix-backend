require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DATABASE_URL
  },
  test: {
    url: process.env.DATABASE_TEST
  }
}
