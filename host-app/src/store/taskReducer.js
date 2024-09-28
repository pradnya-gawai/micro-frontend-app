// Initial state for task data
const initialState = {
    tasks: [],
  };
  
  // Task reducer function
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TASKS':
        return {
          ...state,
          tasks: action.payload,
        };
      default:
        return state;
    }
  };
  
  // Action to set tasks
  export const setTasks = (tasks) => ({
    type: 'SET_TASKS',
    payload: tasks,
  });
  
  export default taskReducer;
  