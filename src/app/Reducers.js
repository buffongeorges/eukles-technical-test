const initialState = {
    selectedUser: null,
    selectedAlbum: null,
}

function Reducer(state = initialState, action) {
  switch (action.type) {
    case "EDIT_SELECTED_USER":
        return { ...state, selectedUser: action.newValue};
    case "EDIT_SELECTED_ALBUM":
        return { ...state, selectedAlbum: action.newValue};
    default:
      return state;
  }
}

export default Reducer;
