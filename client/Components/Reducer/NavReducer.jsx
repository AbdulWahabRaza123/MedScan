export const initialStateNav = false;
export const NavReducer = (state, action) => {
  if (action.type === "Nav") {
    return action.payload;
  }
  return state;
};
