export const initialStateNav = true;
export const NavReducer = (state, action) => {
  if (action.type === "Nav") {
    return action.payload;
  }
  return state;
};
