const express = require("express");

const { ServerConfig } = require("./config");

const apiRoutes = require("./routes");
const errorHandler = require("./utils/error.handler");

const app = express();


app.use('/api', apiRoutes);

//last middleware for handling errors
app.use(errorHandler);

app.listen(ServerConfig.PORT, () => {
    console.log(`Started server at PORT: ${ServerConfig.PORT}`);
})