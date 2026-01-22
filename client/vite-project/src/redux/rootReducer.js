const initialState = {
  userDetails: { name: 'initial name', actionsLeft: 100 },
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
