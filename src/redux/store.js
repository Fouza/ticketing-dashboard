import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from "./reducers";
import sagas from "./saga";


const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer(),
    /* preloadedState, */
    composeEnhancers(applyMiddleware(...middlewares)),
)
sagaMiddleware.run(sagas)

export default store
