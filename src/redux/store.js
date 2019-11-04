import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import combinedReducer from './reducers';
import { watchPosts } from './sagas';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(combinedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchPosts)

export default store;