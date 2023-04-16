const path = require("path")

const swaggerConfig = {
    definition: {
        openapi: "3.0.0",
        info: {
          title: "REIGEN",
          version: "1.0.0",
        },
        servers: [
          {
            url: "https://reigen-crxstxxp.vercel.app",
          },
        ],
      },
      apis: [`${path.join(__dirname, "./routes/*.js")}`],
}

module.exports = swaggerConfig