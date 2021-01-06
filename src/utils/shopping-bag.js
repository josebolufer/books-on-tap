export const calculateTotalAmount = (items) =>
  items.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)

export const getItemIndex = (items, id) =>
  items.findIndex((item) => item.id === id)

export const getItemById = (items, id) => items.find((item) => item.id === id)

export const existsInShoppingBag = (items, id) =>
  items.some((item) => item.id === id)
