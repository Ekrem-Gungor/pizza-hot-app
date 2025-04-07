export default function CartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const indexForAdd = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const updatedItemsForAdd = [...state.items];
      if (indexForAdd > -1) {
        const existingItem = state.items[indexForAdd];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItemsForAdd[indexForAdd] = updatedItem;
      } else {
        updatedItemsForAdd.push({ ...action.item, quantity: 1 });
      }
      return { ...state, items: updatedItemsForAdd };
    case "REMOVE_FROM_CART":
      const indexForRemove = state.items.findIndex(
        (item) => item.id === action.id
      );

      if (indexForRemove === -1) {
        return state; // Item bulunamadıysa, hiçbir şey yapma
      }

      const existingItemForRemove = state.items[indexForRemove];
      const updatedItemsForRemove = [...state.items];

      if (existingItemForRemove.quantity === 1) {
        updatedItemsForRemove.splice(indexForRemove, 1);
      } else {
        const updatedItem = {
          ...existingItemForRemove,
          quantity: existingItemForRemove.quantity - 1,
        };
        updatedItemsForRemove[indexForRemove] = updatedItem;
      }

      return { ...state, items: updatedItemsForRemove };
    case "UPDATE_CART":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}
