export function themeReducer(state, action) {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, theme: action.payload };
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
}
