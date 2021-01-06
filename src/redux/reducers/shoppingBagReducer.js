const initialState = {
  show: false,
  items: [],
  totalAmount: 0,
}

const shoppingBag = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_SHOPPING_BAG':
      return { ...state, show: action.payload }

    case 'ADD_ITEM_TO_SHOPPING_BAG':
      return { ...state, items: [...state.items, action.payload] }

    case 'UPDATE_TOTAL_AMOUNT':
      return {
        ...state,
        totalAmount: action.payload,
      }

    case 'INCREASE_QUANTITY':
      let items = [...state.items]
      items[action.payload] = {
        ...items[action.payload],
        quantity: items[action.payload].quantity + 1,
      }
      return {
        ...state,
        items,
      }

    case 'DECREASE_QUANTITY':
      let itemsToDecrease = [...state.items]
      itemsToDecrease[action.payload] = {
        ...itemsToDecrease[action.payload],
        quantity: itemsToDecrease[action.payload].quantity - 1,
      }
      return {
        ...state,
        items: itemsToDecrease,
      }

    case 'REMOVE_ITEM_FROM_SHOPPING_BAG':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    default:
      return state
  }
}

export default shoppingBag
