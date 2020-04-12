import * as ActionType from "./../constants/contants";

let initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return { ...state };
    case ActionType.SIGN_UP:
      return { ...state };
    default:
      return { ...state };
  }
};

export default userReducer;
