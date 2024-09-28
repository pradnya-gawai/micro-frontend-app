import { createStore, combineReducers } from 'redux';
import taskReducer from './taskReducer';
import leaveReducer from './leaveReducer';

// Combine both task and leave reducers
const rootReducer = combineReducers({
  task: taskReducer,
  leave: leaveReducer,
});

// Create Redux store
const store = createStore(rootReducer);

export default store;
