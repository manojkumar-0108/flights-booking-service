const express = require("express");

const { ServerConfig, Logger } = require("./config");
const { IdentityReset } = require("./utils/helpers/");
const { sequelize } = require('./models');
const apiRoutes = require("./routes");
const errorHandler = require("./utils/error.handler");
const CRON = require('./utils/helpers/cron.jobs');

const app = express();



/**
 * adding body parser middlewares
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use('/api', apiRoutes);

app.use('/bookingService/api', apiRoutes);

//last middleware for handling errors
app.use(errorHandler);

app.listen(ServerConfig.PORT, () => {
    console.log(`Started server at PORT: ${ServerConfig.PORT}`);

    //automatic cron jobs to cancel old bookings
    CRON();

    /**
 * Resetting Identity column
 */
    sequelize.authenticate()
        .then(() => {
            return IdentityReset();
        })
        .then(() => {
            console.log("Succes: Identity seed reset successfull");
        })
        .catch(error => {
            console.log('Identity seed reset -- failed -- for all models');
            console.error('Database is not connected:', error);
            Logger.error({ message: "Database is not Connected!!!", error: error });
        });
})