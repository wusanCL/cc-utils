const common = require('./common')
const validate = require('./validate')
const AutomatedRouter = require('./AutomatedRouter')

module.exports = {
    ...common,
    ...validate,
    AutomatedRouter
}