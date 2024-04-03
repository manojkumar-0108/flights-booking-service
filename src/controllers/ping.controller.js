const { StatusCodes } = require("http-status-codes");

function pingCheck(req, res) {

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Ping Check successfull",
        error: [],
        data: []
    });

}

module.exports = pingCheck;