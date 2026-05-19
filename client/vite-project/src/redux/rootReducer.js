// When we refresh the page, we want to keep the user name in the state, 
// so we check if there is a user name in sessionStorage and use it as the initial 
// state. If there is no user name in sessionStorage, we use 'initial name' 
// as the default value.
const savedUserName = sessionStorage.getItem('userName');

const initialState = {
  userDetails: { name: savedUserName || 'initial name', actionsLeft: 100 },
};

const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_NAME': {
      return {
        ...state,
        userDetails: { ...state.userDetails, name: action.payload },
      };
    }

    case 'ACTIONS': {
      if (state.userDetails.actionsLeft === 0) {
        alert("No more actions left!")
        return {
          ...state,
          userDetails: { ...state.userDetails, actionsLeft: 0 },
        };
      }
      return {
        ...state,
        userDetails: { ...state.userDetails, actionsLeft: state.userDetails.actionsLeft - 1 },
      };
    }

    case 'LOGOUT': {
      return initialState;
    }

    default:
      return state;
  }
};

export default userDetailsReducer;
