import { getShoppingBagItems } from '../../selectors/shoppingBag'
import {
  calculateTotalAmount,
  getItemById,
  getItemIndex,
  existsInShoppingBag,
} from '../../utils/shopping-bag'

export const showShoppingBag = (open) => {
  return {
    type: 'SHOW_SHOPPING_BAG',
    payload: open,
  }
}

export const addItemToShoppingBag = (item) => {
  return {
    type: 'ADD_ITEM_TO_SHOPPING_BAG',
    payload: item,
  }
}

export const increaseQuantity = (index) => {
  return { type: 'INCREASE_QUANTITY', payload: index }
}

export const updateTotalAmount = (amount) => {
  return { type: 'UPDATE_TOTAL_AMOUNT', payload: amount }
}

export const removeItemFromShoppingBag = (id) => {
  return {
    type: 'REMOVE_ITEM_FROM_SHOPPING_BAG',
    payload: id,
  }
}

export const decreaseQuantity = (index) => {
  return { type: 'DECREASE_QUANTITY', payload: index }
}

export const addToShoppingBag = (item, open = true) => (dispatch, getState) => {
  const inShoppingBag = existsInShoppingBag(
    getShoppingBagItems(getState()),
    item.id
  )
  const book = getItemById(getShoppingBagItems(getState()), item.id)
  const shouldIncreaseQuantity =
    inShoppingBag && book.quantity < item.stockAmount

  if (shouldIncreaseQuantity) {
    const index = getItemIndex(getShoppingBagItems(getState()), item.id)

    dispatch(increaseQuantity(index))
  } else if (!inShoppingBag) {
    dispatch(addItemToShoppingBag(item))
  }

  const amount = calculateTotalAmount(getShoppingBagItems(getState()))

  dispatch(updateTotalAmount(amount))
  dispatch(showShoppingBag(open))
}

export const removeFromShoppingBag = (item) => (dispatch, getState) => {
  const index = getItemIndex(getShoppingBagItems(getState()), item.id)
  const book = getItemById(getShoppingBagItems(getState()), item.id)

  if (book.quantity > 1) {
    dispatch(decreaseQuantity(index))
  } else {
    dispatch(removeItemFromShoppingBag(book.id))
  }

  const amount = calculateTotalAmount(getShoppingBagItems(getState()))

  dispatch(updateTotalAmount(amount))
}
