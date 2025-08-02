import { createStore, applyMiddleware, compose } from 'redux'
import { removeSessionStorage } from 'helpers/helper'
import { MOTOR_FORM, TRAVEL_FORM } from 'helpers/constants'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import createReducer from './rootReducer'
import _ from "lodash"

var escapeRoutes = [ 
  '/agent/quotes/list',
  '/agent/quotes/motor',
  '/agent/quotes/proposal',
  '/agent/quotes/summary',

  '/broker/quotes/list',
  '/broker/quotes/motor', 
  '/broker/quotes/proposal',
  '/broker/quotes/summary',

  '/customer/quotes/list',
  '/customer/quotes/motor',
  '/customer/quotes/proposal',
  '/customer/quotes/summary',

];

export default function configureStore (initialState = {}) {
  let composeEnhancers = compose
  const reduxSagaMonitorOptions = {}

  const localMiddleWare = store => next => action => {
    //console.log("Page", window.location.pathname)
    let localRemove = _.includes(escapeRoutes, window.location.pathname);
    if(localRemove){
      // Continue
    }
    else{
        removeSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
        removeSessionStorage(TRAVEL_FORM.QUOTE_NUMBER)
    }
    
    next(action);
  }

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) { composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) }
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
  const middlewares = [localMiddleWare, sagaMiddleware]
  const enhancers = [applyMiddleware(...middlewares)]
  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  )

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(createReducer(store.injectedReducers))
    })
  }

  sagaMiddleware.run(rootSaga)
  return store
}
