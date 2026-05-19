const getInitialState = () => {
  const savedUserName = sessionStorage.getItem('userName');
  const savedActionsLeft = sessionStorage.getItem('actionsLeft');

  return {
    userDetails: {
      name: savedUserName || 'initial name',
      actionsLeft: savedActionsLeft === null ? 100 : Number(savedActionsLeft),
    },
  };
};

const userDetailsReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'USER_NAME': {
      return {
        ...state,
        userDetails: { ...state.userDetails, name: action.payload },
      };
    }

    case 'ACTIONS': {
      if (state.userDetails.actionsLeft <= 0) {
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
      return getInitialState();
    }

    default:
      return state;
  }
};

export default userDetailsReducer;
