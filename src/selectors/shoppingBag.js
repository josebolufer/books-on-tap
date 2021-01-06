const rootState = (state) => state.shoppingBag || {}

export const getTotalAmount = (state) => rootState(state).totalAmount || 0

export const getShoppingBagItems = (state) => rootState(state).items || []

export const getShow = (state) => rootState(state).show || false

export const getShoppingBagTotalNumberOfItems = (state) =>
  getShoppingBagItems(state).reduce((acc, next) => {
    return acc + next.quantity
  }, 0)
