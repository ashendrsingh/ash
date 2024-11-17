import { createStore, applyMiddleware, combineReducers,compose } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './reducers/authReducer';
import leadReducer from './reducers/leadReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  leads: leadReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
