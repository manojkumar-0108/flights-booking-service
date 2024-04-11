

module.exports = {
    InternalServerError: require('./internalServer.error'),
    BadRequestError: require('./badRequest.error'),
    AppError: require('./app.error'),
    NotImplementedError: require('./notImplemented.error'),
    BaseError: require('./base.error')
}