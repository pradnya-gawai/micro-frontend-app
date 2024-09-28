// Initial state for leave data
const initialState = {
    leaves: [],
  };
  
  // Leave reducer function
  const leaveReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LEAVES':
        return {
          ...state,
          leaves: action.payload,
        };
      default:
        return state;
    }
  };
  
  // Action to set leaves
  export const setLeaves = (leaves) => ({
    type: 'SET_LEAVES',
    payload: leaves,
  });
  
  export default leaveReducer;
  