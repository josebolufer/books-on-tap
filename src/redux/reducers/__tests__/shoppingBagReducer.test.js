import shoppingBag from '../shoppingBagReducer'

const initialState = {
  show: false,
  items: [],
  totalAmount: 0,
}

const mockedShoppingBagItem = {
  author: { firstName: 'Jose', lastName: 'Bolufer' },
  id: '1',
  description: 'The story about a boy that grew up in London',
  isbn: 'asdfghghghghg',
  price: 10,
  stockAmount: 5,
  thumbnail: 'Image 1',
  title: 'A live in London',
  quantity: 1,
}

describe('shoppingBagReducder', () => {
  it('should return the initial state', () => {
    expect(shoppingBag(undefined, {})).toEqual({
      items: [],
      show: false,
      totalAmount: 0,
    })
  })

  it('should handle `SHOW_SHOPPING_BAG`', () => {
    expect(
      shoppingBag(initialState, {
        type: 'SHOW_SHOPPING_BAG',
        payload: true,
      })
    ).toEqual({
      ...initialState,
      show: true,
    })
  })

  it('should handle `ADD_ITEM_TO_SHOPPING_BAG`', () => {
    expect(
      shoppingBag(
        initialState,

        {
          type: 'ADD_ITEM_TO_SHOPPING_BAG',
          payload: mockedShoppingBagItem,
        }
      )
    ).toEqual({ ...initialState, items: [mockedShoppingBagItem] })
  })

  it('should handle `UPDATE_TOTAL_AMOUNT`', () => {
    expect(
      shoppingBag(initialState, {
        type: 'UPDATE_TOTAL_AMOUNT',
        payload: 22,
      })
    ).toEqual({
      ...initialState,
      totalAmount: 22,
    })
  })

  it('should handle `INCREASE_QUANTITY`', () => {
    const currentState = {
      ...initialState,
      items: [
        {
          ...mockedShoppingBagItem,
          quantity: 3,
        },
      ],
    }

    expect(
      shoppingBag(currentState, {
        type: 'INCREASE_QUANTITY',
        payload: 0,
      })
    ).toEqual({
      ...initialState,
      items: [
        {
          ...mockedShoppingBagItem,
          quantity: 4,
        },
      ],
    })
  })
})
