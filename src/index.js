import "core-js/stable"
import "regenerator-runtime/runtime"

import common from './common'
import validate from './validate'
import AutomatedRouter from './AutomatedRouter'


export default {
    ...common,
    ...validate,
    AutomatedRouter
}
