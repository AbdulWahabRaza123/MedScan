export const initialStateNav = "simple";
export const NavReducer = (state, action) => {
  if (action.type === "Nav") {
    return action.payload;
  }
  return state;
};
