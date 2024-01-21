const initialState = {
     items: [],
     filter: "",
};

const itemReducer = (state = initialState, action) => {
     switch (action.type) {
          case "ADD_ITEM":
               return {
                    ...state,
                    items: [...state.items, action.payload],
               };

          case "UPDATE_ITEM":
               return {
                    ...state,
                    items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item)),
               };

          case "DELETE_ITEM":
               return {
                    ...state,
                    items: state.items.filter((item) => item.id !== action.payload),
               };

          case "FILTER_ITEMS":
               return {
                    ...state,
                    filter: action.payload,
               };

          default:
               return state;
     }
};

export default itemReducer;
