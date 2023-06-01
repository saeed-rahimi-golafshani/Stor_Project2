const Application = require("./App/server")
const port = process.env.APPLICATION_PORT;
const mongodbUrl = process.env.MONGODB_URL;
new Application(port, mongodbUrl)